package com.ApiNoticias.APINoticias_Backend.Controlador;

import com.ApiNoticias.APINoticias_Backend.Modelo.Usuario;
import com.ApiNoticias.APINoticias_Backend.Services.serviceUsuario;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class UsuarioControler {
private final serviceUsuario serUsuario;
public UsuarioControler(serviceUsuario serUsuario){
    this.serUsuario = serUsuario;
}
    @GetMapping ("/Usuarios1")
    public List<Usuario> getallUsuarios(){
        return serUsuario.getallUsuario();
    }
    @PostMapping("/NuevoUsuario")
    public long NuevoUsuario (@RequestBody Usuario newUsuario){
        return serUsuario.setUsuario(newUsuario);
    }
}
