package com.ApiNoticias.APINoticias_Backend.Controlador;

import com.ApiNoticias.APINoticias_Backend.Modelo.Noticia;
import com.ApiNoticias.APINoticias_Backend.Services.ServiceNoticia;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class NoticiaControlador {

    private final ServiceNoticia servicioNoticia;

    /**
     * Constructor que inyecta el servicio de noticias.
     *
     * @param servicioNoticia el servicio para manejar la lógica de negocio de noticias.
     */
    public NoticiaControlador(ServiceNoticia servicioNoticia) {
        this.servicioNoticia = servicioNoticia;
    }

    /**
     * Obtiene todas las noticias.
     *
     * @return una lista de objetos Noticia.
     */
    @GetMapping("/Noticia")
    public List<Noticia> getAllNoticias() {
        return servicioNoticia.getAllNoticias();
    }

    /**
     * Crea una nueva noticia.
     *
     * @param nuevaNoticia el objeto Noticia a crear.
     * @return el ID generado para la nueva noticia.
     */
    @PostMapping("/Noticia")
    public ResponseEntity<?> nuevaNoticia(@RequestBody Noticia nuevaNoticia) {
        try {
            long id = servicioNoticia.setNoticia(nuevaNoticia);
            return ResponseEntity.ok(id); // Retorna el ID de la noticia creada
        } catch (IllegalArgumentException e) {
            // Manejo de error si el título ya existe
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            // Manejo genérico de errores
            return ResponseEntity.status(500).body(Map.of("error", "Error interno del servidor."));
        }
    }
    /**
     * Modifica una noticia existente.
     *
     * @param noticiaModificada el objeto Noticia con los datos actualizados.
     */
    @PutMapping("/Noticia")
    public void noticiaModificada(@RequestBody Noticia noticiaModificada) {
        servicioNoticia.updateNoticia(noticiaModificada);
    }
}
