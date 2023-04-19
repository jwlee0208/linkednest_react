package net.linkednest.common.security;

import com.nimbusds.oauth2.sdk.util.CollectionUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.entity.role.RoleAccessPath;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;

@Slf4j
@Getter
//@EnableCaching
public class UrlFilterInvocationSecurityMetadataSource implements FilterInvocationSecurityMetadataSource {
    private final Map<RequestMatcher, List<ConfigAttribute>> requestMap;
    private final RoleAccessProvider roleAccessProvider;

    public UrlFilterInvocationSecurityMetadataSource(RoleAccessProvider roleAccessProvider) {
        this.requestMap = new HashMap<>();
        this.roleAccessProvider = roleAccessProvider;
    }

    @Override
    public Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException, ConcurrentModificationException {
        final HttpServletRequest request = ((FilterInvocation) object).getRequest();
        this.setReguestMap();
        if (ObjectUtils.isNotEmpty(requestMap)) {
            Set<Map.Entry<RequestMatcher, List<ConfigAttribute>>> entries = requestMap.entrySet();
            if (CollectionUtils.isNotEmpty(entries)) {
                List<Map.Entry<RequestMatcher, List<ConfigAttribute>>> entryList = new ArrayList<>(entries);
                Map.Entry<RequestMatcher, List<ConfigAttribute>> entry = null;
                for(Map.Entry<RequestMatcher, List<ConfigAttribute>> entryObj : entryList) {
                    if (entryObj.getKey().matches(request)) {
                        entry = entryObj;
                        break;
                    }
                }
                if (ObjectUtils.isNotEmpty(entry)) {
                    return entry.getValue();
                }
            }
            entries.clear();
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
        List<ConfigAttribute> securityConfigs = null;
        roleAccessPathList.stream().distinct();
        for (RoleAccessPath r : roleAccessPathList) {
            log.info("[{}.{}] url : {}, httpMethod : {}, type, {}, roleName : {}", this.getClass().getName(), "CONSTRUCTOR", r.getUrl(), r.getHttpMethod(), r.getType(), r.getRole().getRoleName());
            AntPathRequestMatcher aprm = new AntPathRequestMatcher(r.getUrl(), r.getHttpMethod());
            if (requestMap.containsKey(aprm)) {
                securityConfigs = requestMap.get(aprm);
            } else {
                securityConfigs = new ArrayList<>();
            }
            SecurityConfig sc = new SecurityConfig(r.getRole().getRoleName());
            if (ObjectUtils.isNotEmpty(securityConfigs) && !securityConfigs.contains(sc)) {
                securityConfigs.add(sc);
            }
            requestMap.put(aprm, securityConfigs);
        }

//        if (ObjectUtils.isNotEmpty(requestMap)) {
//            log.info("[{}.{}] requestMap : {}, ", this.getClass().getName(), "CONSTRUCTOR", requestMap);
//        }
    }
}
