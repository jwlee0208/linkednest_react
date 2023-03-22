package net.linkednest.aop;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Enumeration;

@Slf4j
@Aspect
@Component
public class RequestParamAop {

    @Around("execution(* net.linkednest.www.controller..*(..)) || execution(* net.linkednest.backoffice.controller..*(..))")
    public Object execute(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        String joinPointStr = joinPoint.toString();
        try {
            Object result = joinPoint.proceed();
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

            String controllerName = joinPoint.getSignature().getDeclaringType().getSimpleName();
            String methodName = joinPoint.getSignature().getName();
            String requestURI = request.getRequestURI();
            String httpMethod = request.getMethod();

            JSONObject reqParameters = getParameters(request);
            if (reqParameters.has("password")) {
                reqParameters.put("password", "removed");
            }
            log.info("{} Controller : {}, Method : {}, RequestURI : {}, HttpMethod : {}, Request Parameters : {}", joinPointStr, controllerName, methodName, requestURI, httpMethod, reqParameters);

            return result;
        } finally {
            long finish = System.currentTimeMillis();
            long timeMs = finish - start;
            log.info("{} END : {} ms", joinPointStr, timeMs);
        }
    }

    private static JSONObject getParameters(HttpServletRequest request) throws JSONException {
        JSONObject jsonObj = new JSONObject();
        Enumeration<String> params = request.getParameterNames();
        while(params.hasMoreElements()) {
            String paramKey = (String)params.nextElement();
            String replaceParam = paramKey.replaceAll("\\.", "-");
            jsonObj.put(replaceParam, request.getParameter(paramKey));
        }
        return jsonObj;
    }
}
