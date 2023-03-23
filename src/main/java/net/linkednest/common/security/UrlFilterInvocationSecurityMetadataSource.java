package net.linkednest.common.security;

import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.backoffice.repository.RoleAccessPathRepository;
import net.linkednest.common.entity.Role;
import net.linkednest.common.entity.RoleAccessPath;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
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


    private Map<RequestMatcher, List<ConfigAttribute>> requestMap;
    private RoleAccessProvider roleAccessProvider;

    public UrlFilterInvocationSecurityMetadataSource(RoleAccessProvider roleAccessProvider) {

        this.requestMap = new HashMap<>();
        this.roleAccessProvider = roleAccessProvider;

/*        requestMap.put(new AntPathRequestMatcher("/admin", HttpMethod.GET.name()), Collections.singletonList(new SecurityConfig("ROLE_ADMIN")));
        requestMap.put(new AntPathRequestMatcher("/admin/**", HttpMethod.GET.name()), Collections.singletonList(new SecurityConfig("ROLE_ADMIN")));*/
    }


    @Override
    public Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException {
        final HttpServletRequest request = ((FilterInvocation) object).getRequest();
        this.setReguestMap();
        if (requestMap != null) {
            Set<Map.Entry<RequestMatcher, List<ConfigAttribute>>> entries = requestMap.entrySet();
            for(Map.Entry<RequestMatcher, List<ConfigAttribute>> entry : entries) {
                if (entry.getKey().matches(request)) {
                    log.info("[{}.{}] key : {}, value : {}", this.getClass().getName(), "getAttributes", entry.getKey(), entry.getValue());
                    return entry.getValue();
                }
            }
        }
        return Collections.emptyList();
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


    @Cacheable
    private void setReguestMap() {
        List<RoleAccessPath> roleAccessPathList = this.roleAccessProvider.getRoleAccessPathList();

        log.info("[{}.{}] roleAccessPathList : {}", this.getClass().getName(), "CONSTRUCTOR", roleAccessPathList);

        roleAccessPathList.stream().forEach(r -> {
            log.info("[{}.{}] url : {}, roleName : {}", this.getClass().getName(), "CONSTRUCTOR", r.getUrl(), r.getRole().getRoleName());
            requestMap.put(new AntPathRequestMatcher(r.getUrl()), Collections.singletonList(new SecurityConfig(r.getRole().getRoleName())));
        });

        log.info("[{}.{}] requestMap : {}, ", this.getClass().getName(), "CONSTRUCTOR", requestMap);
    }
}
