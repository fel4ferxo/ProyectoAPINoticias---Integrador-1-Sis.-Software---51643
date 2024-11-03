package com.ApiNoticias.APINoticias_Backend.Config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import javax.sql.DataSource;
import java.security.spec.NamedParameterSpec;

@Configuration
public class DB_Config {
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
}
