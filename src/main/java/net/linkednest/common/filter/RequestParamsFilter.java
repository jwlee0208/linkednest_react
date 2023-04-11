package net.linkednest.common.filter;


import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.filter.wrapper.RequestParamsWrapper;

import java.io.IOException;

@Slf4j
@WebFilter(urlPatterns = "*")
public class RequestParamsFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) {
        RequestParamsWrapper wrapper = new RequestParamsWrapper((HttpServletRequest) request);
        try {
            chain.doFilter(wrapper, response);
        } catch(IOException ioe) {
            log.error("[{}.{}] IOE error : {}", this.getClass().getName(), "doFilter", ioe.getMessage());
        } catch(ServletException se) {
            log.error("[{}.{}] SE error : {}", this.getClass().getName(), "doFilter", se.getMessage());
        }
    }

    @Override
    public void destroy() {

    }
}
