package net.linkednest.common.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpStatus;
import org.apache.http.entity.ContentType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Slf4j
@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        log.info("[{}.{}] commence exceptionClass : {}", this.getClass().getName(), "authenticationEntryPoint", request.getAttribute("exceptionClassName"));
        response.setStatus(HttpStatus.SC_UNAUTHORIZED);
        response.setCharacterEncoding(StandardCharsets.UTF_8.name());
        response.setContentType(ContentType.TEXT_HTML.getMimeType());
        response.getWriter().write("UNAUTHENTICATED USER");
        response.sendError(HttpStatus.SC_UNAUTHORIZED);
    }
}
