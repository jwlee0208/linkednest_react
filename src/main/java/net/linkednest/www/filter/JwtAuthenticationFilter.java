package net.linkednest.www.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.www.security.JwtProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

// Jwt 유효성 검증 filter
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    public JwtAuthenticationFilter(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = jwtProvider.resolveToken(request);

        log.info("[{}.{}] token : {}", this.getClass().getName(), "doFilterInternal", token);

        boolean isValidToken = (token != null && jwtProvider.validateToken(token));

        log.info("[{}.{}] isValidToken : {}", this.getClass().getName(), "doFilterInternal", isValidToken);
        if (isValidToken) {
            // accessToken 확인
            token = token.split(" ")[1].trim();
            log.info("[{}.{}] accessToken 확인 : {}", this.getClass().getName(), "doFilterInternal", token);
            Authentication authentication = jwtProvider.getAuthentication(token);
            log.info("[{}.{}] isAuthenticated : {}", this.getClass().getName(), "doFilterInternal", authentication.isAuthenticated());

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }
}
