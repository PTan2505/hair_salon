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
import java.util.Optional;

@Component
public class Filter extends OncePerRequestFilter {

    @Autowired
    TokenService tokenService;

    @Autowired
    @Qualifier("handlerExceptionResolver")
    HandlerExceptionResolver handlerExceptionResolver;

    private final List<String> AUTH_PERMISSION = List.of(
            "/swagger-ui/**",
            "/v3/api-docs/**",
            "/swagger-resources/**",
            "/api/login",
            "/api/register",
            "/api/oauth2/redirect/google/**",
            "/api/forgot-password",
            "/api/reset-password");

    public boolean checkIsPublicAPI(String uri) {
        AntPathMatcher matcher = new AntPathMatcher();
        return AUTH_PERMISSION.stream().anyMatch(pattern -> matcher.match(pattern, uri));
    }

    private static final String TOKEN_PREFIX = "Bearer ";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        boolean isPublicAPI = checkIsPublicAPI(request.getRequestURI());
        if (isPublicAPI) {
            filterChain.doFilter(request, response);
        } else {
            String token = getTokenFromRequest(request);
            if (token == null) {
                handleAuthenticationException(request, response, "Token is missing");
                return;
            }

            Optional<Account> optionalAccount;
            try {
                optionalAccount = tokenService.getAccountByToken(token);
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

            if (optionalAccount.isEmpty()) {
                handleAuthenticationException(request, response, "User not found");
                return;
            }

            Account account = optionalAccount.get();

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    account, token, account.getAuthorities());
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            filterChain.doFilter(request, response);
        }
    }

    private void handleAuthenticationException(HttpServletRequest request, HttpServletResponse response,
            String message) {
        handlerExceptionResolver.resolveException(request, response, null,
                new AuthenException(message));
    }

    public String getTokenFromRequest(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith(TOKEN_PREFIX)) {
            return authHeader.substring(TOKEN_PREFIX.length());
        }
        return null;
    }

}
