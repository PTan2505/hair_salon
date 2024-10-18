package com.example.Hair_Salon_Project.Config;

import com.example.Hair_Salon_Project.Entity.Account;
import com.example.Hair_Salon_Project.Exception.AuthenException;
import com.example.Hair_Salon_Project.Service.TokenService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;
import java.util.List;

@Component // publish to be a library for using Autowired
public class Filter extends OncePerRequestFilter { // Filer run once each request approach

    private static final Logger logger = LoggerFactory.getLogger(Filter.class);


    @Autowired
    TokenService tokenService;

    @Autowired
    @Qualifier("handlerExceptionResolver")
    HandlerExceptionResolver handlerExceptionResolver;

    private final List<String> AUTH_PERMISSION = List.of( //những api mà ai cũng truy cập đc
            "/swagger-ui/**",
            "/v3/api-docs/**",
            "/swagger-resources/**",
            "/api/login",
            "/api/register",
            "/api/oauth2/redirect/google/**",
            "/api/forgot-password",
            "/api/reset-password",
           "/api/admin/approve-customer/{accountId}"
    );

    public boolean checkIsPublicAPI(String uri) {
        //Nếu gặp những API như list trên -> cho phép truy cập luôn
        //ngược lại , phân quyền ( authorization) , check token
        AntPathMatcher matcher = new AntPathMatcher();// check pattern vs uri người dùng truy
        return AUTH_PERMISSION.stream().anyMatch(pattern ->  matcher.match(pattern, uri));// nếu match -> true ; else -> false

    }

    private static final String TOKEN_PREFIX = "Bearer ";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //check xem api user that user request allow who can access ( có phải là 1 public api hay ko , ai cũng dùng đc )
        boolean isPublicAPI = checkIsPublicAPI(request.getRequestURI());
        if(isPublicAPI) {
            filterChain.doFilter(request, response); // cho phep truy cap luon
        }else {
            //nếu ko phải public api -> kiểm tra token
            String token = getTokenFromRequest(request);
            if(token == null){
                // ko dc phep truy cap
                handlerExceptionResolver.resolveException(request,response,null,new AuthenException("Token is missing"));
                return;
            }
            // => co' token
            // check xem token co' đúng hay ko -> lấy thông tin account từ token
            Account account;
            try{
                account = tokenService.getAccountByToken(token);
            } catch (ExpiredJwtException e) {
                handleAuthenticationException(request, response, "Expired token");
                return;
            } catch (MalformedJwtException e) {
                handleAuthenticationException(request, response, "Invalid token format");
                return;
            } catch (Exception e) {
                handleAuthenticationException(request, response, "Authentication failed");
                return;
            }
            //=> token chuẩn -> cho phép truy cập , lưu lại thông tin của account này trong mot phien lam viec do , khi response về thì
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    account
                    , token
                    , account.getAuthorities());
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken); // Lưu thông tin user vào SecurityContext để biết chính xác đâu là thằng
            //token ok , cho truy cap
           filterChain.doFilter(request,response);
        }

    }

    private void handleAuthenticationException(HttpServletRequest request, HttpServletResponse response, String message) {
        handlerExceptionResolver.resolveException(request, response, null, new AuthenException(message));
    }

    public String getTokenFromRequest(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith(TOKEN_PREFIX)) {
            return authHeader.substring(TOKEN_PREFIX.length());
        }
        return null;
    }


}
