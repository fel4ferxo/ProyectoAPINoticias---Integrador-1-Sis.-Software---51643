package com.ApiNoticias.APINoticias_Backend.Controlador;

import com.ApiNoticias.APINoticias_Backend.Modelo.Usuario;
import com.ApiNoticias.APINoticias_Backend.Services.serviceUsuario;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
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
    public long NuevoUsuario (@RequestBody Usuario newUsuario){
        return serUsuario.setUsuario(newUsuario);
    }
    @PutMapping("/Usuario")
    public void UsuaruiModificado(@RequestBody Usuario usuarioModificado){
        serUsuario.updateUsuarui(usuarioModificado);

    }
    @PostMapping("/validarUsuario")
    public boolean validarUsuario(@RequestBody Usuario validarUsuario) {
        return serUsuario.autenticarUsuario(validarUsuario);
    }
}
