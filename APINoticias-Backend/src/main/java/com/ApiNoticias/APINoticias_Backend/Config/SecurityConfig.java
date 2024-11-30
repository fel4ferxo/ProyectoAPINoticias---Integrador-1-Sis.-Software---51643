package com.ApiNoticias.APINoticias_Backend.Config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors() // Habilitar CORS
                .and()
                .csrf().disable() // Opcional: Deshabilita CSRF si no usas tokens CSRF
                .authorizeHttpRequests()
                .anyRequest().permitAll(); // Permitir todas las solicitudes (ajusta según tus necesidades)
        return http.build();
    }
}

