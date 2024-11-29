package com.ApiNoticias.APINoticias_Backend.Controlador;

import com.ApiNoticias.APINoticias_Backend.Modelo.Usuario;
import com.ApiNoticias.APINoticias_Backend.Services.serviceUsuario;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioControler {
private final serviceUsuario serUsuario;
public UsuarioControler(serviceUsuario serUsuario){
    this.serUsuario = serUsuario;
}
    @GetMapping ("/Usuario")
    public List<Usuario> getallUsuarios(){
        return serUsuario.getallUsuario();
    }
    @PostMapping("/Usuario")
    public ResponseEntity<?> NuevoUsuario(@RequestBody Usuario newUsuario) {
        try {
            long id = serUsuario.setUsuario(newUsuario);
            return ResponseEntity.ok(id); // Retorna el ID del usuario creado
        } catch (IllegalArgumentException e) {
            // Devuelve un código de error 400 con el mensaje de la excepción
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            // Manejo genérico de errores
            return ResponseEntity.status(500).body(Map.of("error", "Error interno del servidor."));
        }
    }
    @PutMapping("/Usuario")
    public void UsuaruiModificado(@RequestBody Usuario usuarioModificado){
        serUsuario.updateUsuarui(usuarioModificado);

    }
    @PostMapping("/validarUsuario")
    public Usuario validarUsuario(@RequestBody Usuario validarUsuario) {
        return serUsuario.autenticarUsuario(validarUsuario);
    }
}
