package net.linkednest.common.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.entity.role.Authority;
import net.linkednest.www.service.security.CustomUserDetailService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.List;


@Slf4j
@Component
@RequiredArgsConstructor
public class JwtProvider {
    @Value("${jwt.secret.key}")
    private String salt;

    private Key secretKey;

    private final long expireDuration = 1000L * 60 * 60;
                        // 1000L * 60 * 60 * 2; // 2 hour

    private final String TOKEN_PREFIX = "Bearer ";

    private final CustomUserDetailService userDetailService;

    @PostConstruct
    protected void init() {
        secretKey = Keys.hmacShaKeyFor(salt.getBytes(StandardCharsets.UTF_8));
    }

    public String createToken(String userId, List<Authority> roles) {
        Claims claims = Jwts.claims().setSubject(userId);
        claims.put("roles", roles);
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + expireDuration))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }


    // 권한 정보 조회
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailService.loadUserByUsername(this.getUserId(token));
        return new UsernamePasswordAuthenticationToken(userDetails, StringUtils.EMPTY, userDetails.getAuthorities());
    }

    // Token 내에 담겨있는 UserId 추출
    public String getUserId(String token) {
        return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().getSubject();
    }

    // Authorization Header를 통해 인증
    public String resolveToken(HttpServletRequest request) {
        log.info("[{}.{}] resolveToken : {}", this.getClass().getName(), "validateToken", request.getHeader("Authorization"));
        return request.getHeader("Authorization");
    }

    // Token 검증
    public boolean validateToken(String token) {
        log.info("[{}.{}] token : {}, secretKey : {}", this.getClass().getName(), "validateToken", token, secretKey);
//        if (!token.substring(0, "Bearer ".length()).equalsIgnoreCase("Bearer ")) {
        if (StringUtils.isNotEmpty(token) && StringUtils.startsWith(token, TOKEN_PREFIX)) {
            token = token.split(" ")[1].trim();
            log.info("[{}.{}] bearer header is existed >> token : {}", this.getClass().getName(), "validateToken", token);
            boolean isNotExpired = false;
            try {
                Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
                isNotExpired = !claims.getBody().getExpiration().before(new Date());
                log.info("[{}.{}] isNotExpired : {}", this.getClass().getName(), "validateToken", isNotExpired);
            } catch (ExpiredJwtException eje) {
                log.error("[{}.{}] error Message : {}", this.getClass().getName(), "validateToken", eje.getMessage());
            } finally {
                return isNotExpired;
            }
        } else {
//            log.info("[{}.{}] bearer header is not existed : {}", this.getClass().getName(), "validateToken", (!token.substring(0, "Bearer ".length()).equalsIgnoreCase("Bearer ")));
            return false;
        }
    }
}
