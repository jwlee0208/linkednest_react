package net.linkednest.common.config;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.filter.JwtAuthenticationFilter;
import net.linkednest.common.security.*;
import org.apache.http.HttpStatus;
import org.apache.http.entity.ContentType;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.vote.AffirmativeBased;
import org.springframework.security.access.vote.RoleVoter;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;

@Slf4j
@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    private final JwtProvider jwtProvider;
    private final RoleAccessProvider roleAccessProvider;

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
                    .authorizeHttpRequests()
                        .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
                        .requestMatchers("/login", "/user", "/logout", "/reIssueToken").permitAll()  // 무조건 허용할 URL 선언
                        .requestMatchers("/swagger-ui/**", "/v3/**").permitAll()
                        .requestMatchers("/user/**").authenticated()
                        .requestMatchers("/admin/**").authenticated()
                        .requestMatchers("/api/content/**").permitAll()
//                        .requestMatchers("/admin/**").hasAnyRole("ROLE_ADMIN")
                        .anyRequest().authenticated()
                .and()
                    .addFilterBefore(new JwtAuthenticationFilter(jwtProvider), UsernamePasswordAuthenticationFilter.class)
                    .addFilterBefore(urlFilterSecurityInterceptor(roleAccessProvider), FilterSecurityInterceptor.class)
                    .exceptionHandling()
                    .authenticationEntryPoint(new CustomAuthenticationEntryPoint())
                    .accessDeniedHandler(new CustomAccessDeniedHandler())
                ;
        return httpSecurity.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public FilterSecurityInterceptor urlFilterSecurityInterceptor(RoleAccessProvider roleAccessProvider) {
        FilterSecurityInterceptor filterSecurityInterceptor = new FilterSecurityInterceptor();
        filterSecurityInterceptor.setSecurityMetadataSource(urlFilterInvocationSecurityMetadataSource(roleAccessProvider));
        filterSecurityInterceptor.setAccessDecisionManager(affirmativeBased());
        return filterSecurityInterceptor;
    }

    @Bean
    public UrlFilterInvocationSecurityMetadataSource urlFilterInvocationSecurityMetadataSource(RoleAccessProvider roleAccessProvider) {
        return new UrlFilterInvocationSecurityMetadataSource(roleAccessProvider);
    }

    private AccessDecisionManager affirmativeBased() {
        return new AffirmativeBased(Collections.singletonList(new RoleVoter()));
    }
}
