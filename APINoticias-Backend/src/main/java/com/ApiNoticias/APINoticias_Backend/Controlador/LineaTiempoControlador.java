package com.ApiNoticias.APINoticias_Backend.Controlador;

import com.ApiNoticias.APINoticias_Backend.Modelo.LineaTiempo;
import com.ApiNoticias.APINoticias_Backend.Services.ServiceLineaTiempo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class LineaTiempoControlador {

    private final ServiceLineaTiempo serviceLineaTiempo;

    public LineaTiempoControlador(ServiceLineaTiempo serviceLineaTiempo) {
        this.serviceLineaTiempo = serviceLineaTiempo;
    }

    /**
     * Endpoint para obtener todas las líneas de tiempo.
     *
     * @return una lista con todas las líneas de tiempo.
     */
    @GetMapping("/LineaTiempo")
    public List<LineaTiempo> getAllLineasTiempo() {
        return serviceLineaTiempo.getAllLineasTiempo();
    }

    /**
     * Endpoint para crear una nueva línea de tiempo.
     *
     * @param nuevaLineaTiempo objeto de tipo LineaTiempo con los datos a insertar.
     * @return el ID de la línea de tiempo creada o un error si falla.
     */
    @PostMapping("/LineaTiempo")
    public ResponseEntity<?> nuevaLineaTiempo(@RequestBody LineaTiempo nuevaLineaTiempo) {
        try {
            long id = serviceLineaTiempo.setLineaTiempo(nuevaLineaTiempo);
            return ResponseEntity.ok(id); // Retorna el ID de la línea de tiempo creada
        } catch (IllegalArgumentException e) {
            // Devuelve un código de error 400 con el mensaje de la excepción
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            // Manejo genérico de errores
            return ResponseEntity.status(500).body(Map.of("error", "Error interno del servidor."));
        }
    }

    /**
     * Endpoint para actualizar una línea de tiempo existente.
     *
     * @param lineaTiempoModificada objeto de tipo LineaTiempo con los datos actualizados.
     */
    @PutMapping("/LineaTiempo")
    public void actualizarLineaTiempo(@RequestBody LineaTiempo lineaTiempoModificada) {
        serviceLineaTiempo.updateLineaTiempo(lineaTiempoModificada);
    }
    /**
     * Endpoint para obtener una línea de tiempo específica por su ID.
     *
     * @param id el ID de la línea de tiempo a buscar.
     * @return la línea de tiempo encontrada o un error si no existe.
     */
    @GetMapping("/LineaTiempo/{id}")
    public ResponseEntity<?> getLineaTiempoById(@PathVariable int id) {
        try {
            LineaTiempo lineaTiempo = serviceLineaTiempo.getLineaTiempoById(id);
            return ResponseEntity.ok(lineaTiempo);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(Map.of("error", "Línea de tiempo no encontrada."));
        }
    }

    /**
     * Endpoint para eliminar una línea de tiempo por su ID.
     *
     * @param id el ID de la línea de tiempo a eliminar.
     */
    @DeleteMapping("/LineaTiempo/{id}")
    public ResponseEntity<?> deleteLineaTiempo(@PathVariable int id) {
        try {
            serviceLineaTiempo.deleteLineaTiempo(id);
            return ResponseEntity.ok(Map.of("message", "Línea de tiempo eliminada exitosamente."));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(Map.of("error", "Error al intentar eliminar la línea de tiempo."));
        }
    }

}
