package net.linkednest.common.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.filter.JwtAuthenticationFilter;
import net.linkednest.common.filter.JwtExceptionFilter;
import net.linkednest.common.security.CustomAccessDeniedHandler;
import net.linkednest.common.security.CustomAuthenticationEntryPoint;
import net.linkednest.common.security.JwtProvider;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Slf4j
@Configuration
@RequiredArgsConstructor
@Order(0)
public class SecurityConfig {
    private final JwtProvider jwtProvider;
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
                    .exceptionHandling()
                    .authenticationEntryPoint(new CustomAuthenticationEntryPoint())
                    .accessDeniedHandler(new CustomAccessDeniedHandler())
                .and()
                    .authorizeHttpRequests()
                        .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
                        .requestMatchers(
                                  new AntPathRequestMatcher("/style/**")
                                , PathRequest.toStaticResources().atCommonLocations()
                                , new AntPathRequestMatcher("/user")
                                , new AntPathRequestMatcher("/login")
                                , new AntPathRequestMatcher("/reIssueToken")
                                , new AntPathRequestMatcher("/api/logout")
                                , new AntPathRequestMatcher("/swagger-ui/**")
                                , new AntPathRequestMatcher("/v3/**")
                                , new AntPathRequestMatcher("/api/content/**")
                                , new AntPathRequestMatcher("/api/banner/list/**")
                                , new AntPathRequestMatcher("/api/board/**", HttpMethod.GET.name())
                        ).permitAll()   // 무조건 허용할 URL 선언
                .and()
                    .authorizeHttpRequests()
                        .requestMatchers("/user/**").authenticated()
                .and()
                    .authorizeHttpRequests()
                        .anyRequest().permitAll()
        ;
//        httpSecurity.logout().logoutUrl("/api/logout");
        return httpSecurity.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
