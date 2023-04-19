package net.linkednest.common.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.filter.JwtAuthenticationFilter;
import net.linkednest.common.filter.JwtExceptionFilter;
import net.linkednest.common.security.*;
import net.linkednest.www.service.security.CustomUserDetailService;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.vote.AffirmativeBased;
import org.springframework.security.access.vote.RoleVoter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;
import java.util.List;

@Slf4j
@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@Order(1)
public class AdminSecurityConfig {
    private final JwtProvider jwtProvider;
    private final RoleAccessProvider roleAccessProvider;
    private final CustomUserDetailService userDetailsService;
    private final JwtExceptionFilter jwtExceptionFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        log.info("[{}.{}] START >>>", this.getClass().getName(), "filterChain");
        httpSecurity
                .httpBasic().disable()
                .csrf().disable()
                .cors(c -> {
                    CorsConfigurationSource corsConfigurationSource = request -> {
                        CorsConfiguration corsConfiguration = new CorsConfiguration();
                        corsConfiguration.setAllowedOrigins(
                                List.of("*")
                        );
                        corsConfiguration.setAllowedMethods(
                                List.of(
                                          HttpMethod.GET.name()
                                        , HttpMethod.POST.name()
                                        , HttpMethod.DELETE.name()
                                        , HttpMethod.PATCH.name()
                                        , HttpMethod.PUT.name()
                                )
                        );
                        corsConfiguration.setAllowedHeaders(
                                List.of(
                                          HttpHeaders.AUTHORIZATION
                                        , HttpHeaders.CONTENT_TYPE
                                )
                        );
                        corsConfiguration.addExposedHeader("REFRESH_TOKEN");    // response 헤더에 REFRESH_TOKEN 헤더 허용
                        return corsConfiguration;
                    };
                    c.configurationSource(corsConfigurationSource);
                })
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                    .addFilterBefore(new JwtAuthenticationFilter(jwtProvider), UsernamePasswordAuthenticationFilter.class)
                    .addFilterBefore(jwtExceptionFilter, JwtAuthenticationFilter.class)
                    .addFilterBefore(urlFilterSecurityInterceptor(roleAccessProvider), FilterSecurityInterceptor.class)
                    .exceptionHandling()
                    .authenticationEntryPoint(new CustomAuthenticationEntryPoint())
                    .accessDeniedHandler(new CustomAccessDeniedHandler())
                .and()
                    .authorizeHttpRequests()
                        .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
                        .requestMatchers("/style/**").permitAll()
                        .requestMatchers("/admin/**").authenticated()
                        .anyRequest().authenticated()

        ;
        return httpSecurity.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public FilterSecurityInterceptor urlFilterSecurityInterceptor(RoleAccessProvider roleAccessProvider) throws Exception {
        FilterSecurityInterceptor filterSecurityInterceptor = new FilterSecurityInterceptor();
        filterSecurityInterceptor.setSecurityMetadataSource(urlFilterInvocationSecurityMetadataSource(roleAccessProvider));
        filterSecurityInterceptor.setAccessDecisionManager(affirmativeBased());
        filterSecurityInterceptor.setAuthenticationManager(authenticationManager(userDetailsService));
        return filterSecurityInterceptor;
    }

    @Bean
    public UrlFilterInvocationSecurityMetadataSource urlFilterInvocationSecurityMetadataSource(RoleAccessProvider roleAccessProvider) {
        return new UrlFilterInvocationSecurityMetadataSource(roleAccessProvider);
    }

    private AccessDecisionManager affirmativeBased() {
        return new AffirmativeBased(Collections.singletonList(new RoleVoter()));
    }

    @Bean
    public AuthenticationManager authenticationManager(CustomUserDetailService customUserDetailService) throws Exception {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(customUserDetailService);
        authProvider.setPasswordEncoder(passwordEncoder());

        List<AuthenticationProvider> providers = List.of(authProvider);
        return new ProviderManager(providers);
    }
}
