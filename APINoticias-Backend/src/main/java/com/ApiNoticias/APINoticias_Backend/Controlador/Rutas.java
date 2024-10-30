package com.ApiNoticias.APINoticias_Backend.Controlador;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
public class Rutas {
    private final Logger logger= LoggerFactory.getLogger(Rutas.class);
    @GetMapping("/Api")
    String ruta(){
        return "primera ruta";
    }
    @GetMapping("/Noticia/{id}/{fuente}")
    String noticia(@PathVariable int id,@PathVariable String fuente){
        return "primera ruta "+id+" fuente :"+fuente;
    }
    @GetMapping("/Registro/{id}/{fuente}")
    String registrousuario(@PathVariable int id,@PathVariable String fuente){
        return "primera ruta "+id+" fuente :"+fuente;
    }
    @GetMapping("/RegistroValiracion/{id}/{fuente}")
    String registrousuariovaloraion(@PathVariable int id,@RequestParam String fuente){
        return "primera ruta "+id+" fuente :"+fuente;
    }

    @PostMapping("/revista")
    String guardarlibro(@RequestBody Map<String,Object> libro){
        libro.keySet().forEach(llave->{
            logger.debug("llave {} valor {}",llave,libro.get(llave));
        });
        return "se guardo";
    }
}
