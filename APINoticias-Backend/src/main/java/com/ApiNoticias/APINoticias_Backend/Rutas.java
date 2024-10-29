package com.ApiNoticias.APINoticias_Backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class Rutas {
    @GetMapping("/Api")
    String ruta(){
        return "primera ruta";
    }
    @GetMapping("/Noticia/{id}/{fuente}")
    String noticia(@PathVariable int id,@PathVariable String fuente){
        return "primera ruta "+id+" fuente :"+fuente;
    }
}
