package net.linkednest.www.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.www.filter.JwtAuthenticationFilter;
import net.linkednest.www.security.JwtProvider;
import org.apache.http.HttpStatus;
import org.apache.http.entity.ContentType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.io.IOException;
import java.util.List;

@Slf4j
@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    private final JwtProvider jwtProvider;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
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
                                    List.of("*")
                            );
                            corsConfiguration.setAllowedHeaders(List.of("authorization", "content-type"));
                            return corsConfiguration;
                        };
                        c.configurationSource(corsConfigurationSource);
                    })
                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                    .authorizeHttpRequests()
                        .requestMatchers("/login", "/user", "/logout").permitAll()  // 무조건 허용할 URL 선언
                        .requestMatchers("/swagger-ui/**", "/v3/**").permitAll()
                        .requestMatchers("/static/**", "/resources/**", "/style/**").permitAll()
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/user/**").authenticated()    // JWT 인증 체크해야할 URL 선언
                        .anyRequest().denyAll()
                .and()
                    .addFilterBefore(new JwtAuthenticationFilter(jwtProvider), UsernamePasswordAuthenticationFilter.class)
                    .exceptionHandling()
                    .accessDeniedHandler(new AccessDeniedHandler() {
                        @Override
                        public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
                            log.error("[{}.{}] accessDeniedException : {}", this.getClass().getName(), "filterChain", accessDeniedException.getMessage());
                            response.setStatus(HttpStatus.SC_FORBIDDEN);
                            response.setCharacterEncoding("UTF-8");
                            response.setContentType(ContentType.TEXT_HTML.toString());
                            response.getWriter().write("Unaccessable User");
                        }
                    })
                    .authenticationEntryPoint(new AuthenticationEntryPoint() {

                        @Override
                        public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
                            response.setStatus(HttpStatus.SC_UNAUTHORIZED);
                            response.setCharacterEncoding("utf-8");
                            response.setContentType(ContentType.TEXT_HTML.getMimeType());
                            response.getWriter().write("Unauthticated User");
                        }
                    });
        return httpSecurity.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
