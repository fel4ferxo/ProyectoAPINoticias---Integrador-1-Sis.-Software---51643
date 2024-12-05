package com.ApiNoticias.APINoticias_Backend.Controlador;

import com.ApiNoticias.APINoticias_Backend.Modelo.LineaTiempoNoticia;
import com.ApiNoticias.APINoticias_Backend.Services.LineaTiempoNoticiaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Controlador para gestionar las operaciones relacionadas con LineaTiempoNoticia.
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/linea-tiempo-noticia")
public class LineaTiempoNoticiaControlador {

    private final LineaTiempoNoticiaService service;

    /**
     * Constructor para inyectar el servicio de LineaTiempoNoticia.
     *
     * @param service el servicio de LineaTiempoNoticia.
     */
    public LineaTiempoNoticiaControlador(LineaTiempoNoticiaService service) {
        this.service = service;
    }

    /**
     * Obtiene todas las relaciones entre líneas de tiempo y noticias.
     *
     * @return una lista de relaciones existentes.
     */
    @GetMapping
    public List<LineaTiempoNoticia> getAllLineaTiempoNoticias() {
        return service.getAllLineaTiempoNoticias();
    }

    /**
     * Crea una nueva relación entre línea de tiempo y noticia.
     *
     * @param nuevaRelacion los datos de la nueva relación.
     * @return el ID generado para la nueva relación.
     */
    @PostMapping
    public ResponseEntity<?> createLineaTiempoNoticia(@RequestBody LineaTiempoNoticia nuevaRelacion) {
        try {
            long id = service.createLineaTiempoNoticia(nuevaRelacion);
            return ResponseEntity.ok(Map.of("id", id)); // Retorna el ID generado
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Error interno del servidor."));
        }
    }

    /**
     * Modifica una relación existente.
     *
     * @param relacionModificada los datos actualizados de la relación.
     */
    @PutMapping
    public ResponseEntity<?> modificarLineaTiempoNoticia(@RequestBody LineaTiempoNoticia relacionModificada) {
        try {
            service.modificarLineaTiempoNoticia(relacionModificada);
            return ResponseEntity.ok(Map.of("message", "Relación actualizada exitosamente."));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Error interno del servidor."));
        }
    }

    /**
     * Elimina una relación por su ID.
     *
     * @param id el ID de la relación a eliminar.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarLineaTiempoNoticia(@PathVariable int id) {
        try {
            service.eliminarLineaTiempoNoticia(id);
            return ResponseEntity.ok(Map.of("message", "Relación eliminada exitosamente."));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Error interno del servidor."));
        }
    }
}
