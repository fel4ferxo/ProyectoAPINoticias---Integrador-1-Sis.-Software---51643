package com.ApiNoticias.APINoticias_Backend.Config;

import org.apache.catalina.filters.CorsFilter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


import javax.sql.DataSource;
import java.security.spec.NamedParameterSpec;
import java.util.Arrays;

@Configuration
public class DB_Config implements WebMvcConfigurer {
    @Bean
    @ConfigurationProperties(prefix="datasource.my-connection")
    public DataSource CruddataSouce(){
        return DataSourceBuilder.create().build();
    }

    @Bean
    public JdbcTemplate crudJdbcTemplate(DataSource cruDataSource){
        var jdbcTemplate= new JdbcTemplate(cruDataSource);
        return jdbcTemplate;
    }

    @Bean
    public NamedParameterJdbcTemplate crudnameJdbcTemplate(JdbcTemplate crudJdbcTemplate){
        return new NamedParameterJdbcTemplate(crudJdbcTemplate);
    }
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Permitir todas las rutas
                .allowedOrigins("http://localhost:4200") // Permitir solicitudes desde Angular
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true); // Si necesitas enviar cookies o credenciales
    }


}
