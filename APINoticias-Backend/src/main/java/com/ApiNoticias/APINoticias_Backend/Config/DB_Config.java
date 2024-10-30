package com.ApiNoticias.APINoticias_Backend.Config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class DB_Config {
    @Bean
    @ConfigurationProperties(prefix="datasource.my-connection")
    public DataSource CruddataSouce(){
        return DataSourceBuilder.create().build();
    }
    @Bean
    public jdbcTemplate crudJdbcTemplate(){

    }
}
