	package com.ApiNoticias.APINoticias_Backend;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//conexion
@SpringBootApplication
public class ApiNoticiasBackendApplication {
	private static final Logger logger=LoggerFactory.getLogger(ApiNoticiasBackendApplication.class);
	public static void main(String[] args) {
		SpringApplication.run(ApiNoticiasBackendApplication.class, args);
		logger.debug("error prueba");
	}

}
