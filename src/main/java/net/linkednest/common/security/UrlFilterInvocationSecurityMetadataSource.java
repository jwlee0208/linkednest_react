package net.linkednest.common.security;

import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.entity.role.RoleAccessPath;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

import java.util.*;

@Slf4j
@Getter
@EnableCaching
public class UrlFilterInvocationSecurityMetadataSource implements FilterInvocationSecurityMetadataSource {
    private final Map<RequestMatcher, List<ConfigAttribute>> requestMap;
    private final RoleAccessProvider roleAccessProvider;

    public UrlFilterInvocationSecurityMetadataSource(RoleAccessProvider roleAccessProvider) {
        this.requestMap = new HashMap<>();
        this.roleAccessProvider = roleAccessProvider;
    }

    @Override
    public Collection<ConfigAttribute> getAttributes(Object object) {
        final HttpServletRequest request = ((FilterInvocation) object).getRequest();
        this.setReguestMap();
        if (ObjectUtils.isNotEmpty(requestMap)) {
            Set<Map.Entry<RequestMatcher, List<ConfigAttribute>>> entries = requestMap.entrySet();
            try {
                if (!entries.isEmpty()) {
                    Optional<Map.Entry<RequestMatcher, List<ConfigAttribute>>> entryOptional = entries.stream().filter(entry -> entry.getKey().matches(request)).findFirst();
                    if (entryOptional.isPresent()) {
                        log.info("[{}.{}] entries : {}, isEmpty : {}, size : {}", this.getClass().getName(), "getAttributes", entries, entries.isEmpty(), entries.size());
                        Map.Entry<RequestMatcher, List<ConfigAttribute>> entry = entryOptional.get();
                        return entry.getValue();
                    }
                }
            } catch (IllegalArgumentException iae) {
                log.error("[{}.{}] IAE error : {}", this.getClass().getName(), "getAttributes", iae.getMessage());
            } catch (Exception e) {
                log.error("[{}.{}] E error : {}", this.getClass().getName(), "getAttributes", e.getMessage());
            } finally {
                entries.clear();
            }
        }
        return null;
    }

    @Override
    public Collection<ConfigAttribute> getAllConfigAttributes() {
        this.setReguestMap();
        Set<ConfigAttribute> allAttributes = new HashSet<>();
        for(Map.Entry<RequestMatcher, List<ConfigAttribute>> entry : requestMap.entrySet()) {
            log.info("[{}.{}] key : {}, value : {}", this.getClass().getName(), "getAllConfigAttributes", entry.getKey(), entry.getValue());
            allAttributes.addAll(entry.getValue());
        }
        return allAttributes;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return FilterInvocation.class.isAssignableFrom(clazz);
    }


//    @Cacheable(cacheNames = {"ROLE_ACCESS_PATH_REQUEST_MAP"})
    private void setReguestMap() {
        List<RoleAccessPath> roleAccessPathList = this.roleAccessProvider.getRoleAccessPathList();

        log.info("[{}.{}] roleAccessPathList : {}", this.getClass().getName(), "CONSTRUCTOR", roleAccessPathList);

        roleAccessPathList.stream().distinct();
        roleAccessPathList.forEach(r -> {
            log.info("[{}.{}] url : {}, httpMethod : {}, type, {}, roleName : {}", this.getClass().getName(), "CONSTRUCTOR", r.getUrl(), r.getHttpMethod(), r.getType(), r.getRole().getRoleName());
            requestMap.put(new AntPathRequestMatcher(r.getHttpMethod(), r.getUrl()), Collections.singletonList(new SecurityConfig(r.getRole().getRoleName())));
        });

        if (ObjectUtils.isNotEmpty(requestMap)) {
            log.info("[{}.{}] requestMap : {}, ", this.getClass().getName(), "CONSTRUCTOR", requestMap);
        }
    }
}
