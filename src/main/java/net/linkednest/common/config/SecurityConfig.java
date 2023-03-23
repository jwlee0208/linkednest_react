package net.linkednest.common.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.backoffice.repository.RoleAccessPathRepository;
import net.linkednest.common.filter.JwtAuthenticationFilter;
import net.linkednest.common.security.JwtProvider;
import net.linkednest.common.security.RoleAccessProvider;
import net.linkednest.common.security.UrlFilterInvocationSecurityMetadataSource;
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

    private final RoleAccessPathRepository roleAccessPathRepository;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        log.info("[{}.{}] START >>>", this.getClass().getName(), "filterChain");
        httpSecurity
                    .httpBasic()
                        .disable()
                    .csrf()
                        .disable()
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
                        // .requestMatchers("/user/**").authenticated()    // JWT 인증 체크해야할 URL 선언
                        .requestMatchers("/login", "/user", "/logout", "/reIssueToken").permitAll()  // 무조건 허용할 URL 선언
//                        .requestMatchers("/swagger-ui/**", "/v3/**").permitAll()
//                        .requestMatchers("/static/**", "/style/**", "/images/**").permitAll()
                        .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
                        .requestMatchers("/user/**").authenticated()
                        .requestMatchers("/admin").authenticated()
//                        .requestMatchers("/admin").hasRole("ADMIN")
                        .anyRequest().permitAll()
                .and()
                    .addFilterBefore(urlFilterSecurityInterceptor(roleAccessProvider), FilterSecurityInterceptor.class)
                    .addFilterBefore(new JwtAuthenticationFilter(jwtProvider), UsernamePasswordAuthenticationFilter.class)
                    .exceptionHandling()
                    .accessDeniedHandler(new AccessDeniedHandler() {
                        @Override
                        public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
                            log.error("[{}.{}] accessDeniedException : {}", this.getClass().getName(), "filterChain", accessDeniedException.getMessage());
                            response.setStatus(HttpStatus.SC_FORBIDDEN);
                            response.setCharacterEncoding(StandardCharsets.UTF_8.name());
                            response.setContentType(ContentType.TEXT_HTML.toString());
                            response.getWriter().write("UNACCESSABLE USER");
                        }
                    })
                    .authenticationEntryPoint(new AuthenticationEntryPoint() {

                        @Override
                        public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
                            response.setStatus(HttpStatus.SC_UNAUTHORIZED);
                            response.setCharacterEncoding(StandardCharsets.UTF_8.name());
                            response.setContentType(ContentType.TEXT_HTML.getMimeType());
                            response.getWriter().write("UNAUTHENTICATED USER");
                        }
                    })
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