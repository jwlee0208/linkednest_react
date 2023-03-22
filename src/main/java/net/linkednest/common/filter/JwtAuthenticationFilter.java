package net.linkednest.common.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.security.JwtProvider;
import org.springframework.http.HttpMethod;
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
        log.info("[{}.{}] request uri : {}", this.getClass().getName(), "doFilterInternal", request.getRequestURI());
        boolean isNotNeedJwt = (request.getMethod().equals(HttpMethod.OPTIONS.name()) || request.getRequestURI().contains("/images") || request.getRequestURI().contains("/images") || request.getRequestURI().contains("/style"));
        if (isNotNeedJwt) {
            // Http Method : OPTION은 PASS
            log.info("[{}.{}] HTTP METHOD OPTION REQUEST >> ", this.getClass().getName(), "doFilterInternal");
        } else {
            String token = jwtProvider.resolveToken(request);
            boolean isValidToken = (token != null && jwtProvider.validateToken(token));
            log.info("[{}.{}] isValidToken : {}", this.getClass().getName(), "doFilterInternal", isValidToken);
            if (isValidToken) {
                log.info("[{}.{}] token : {}", this.getClass().getName(), "doFilterInternal", token);

                // accessToken 확인
                token = token.split(" ")[1].trim();
                log.info("[{}.{}] accessToken 확인 : {}", this.getClass().getName(), "doFilterInternal", token);
                Authentication authentication = jwtProvider.getAuthentication(token);
                log.info("[{}.{}] isAuthenticated : {}", this.getClass().getName(), "doFilterInternal", authentication.isAuthenticated());

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            log.info("[{}.{}] response header : {}", this.getClass().getName(), "doFilterInternal", response.getHeader("REFRESH_TOKEN"));

            filterChain.doFilter(request, response);
        }
    }
}
