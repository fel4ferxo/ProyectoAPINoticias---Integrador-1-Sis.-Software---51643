package com.ApiNoticias.APINoticias_Backend.Services;

import com.ApiNoticias.APINoticias_Backend.Modelo.Usuario;
import com.ApiNoticias.APINoticias_Backend.Repositorio.UsuarioRepositorio;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class serviceUsuario {
    private final UsuarioRepositorio repositorio;

    public serviceUsuario(UsuarioRepositorio repositorio) {
        this.repositorio = repositorio;
    }
    public List<Usuario> getallUsuario(){
        return repositorio.getAllUsuarios();
    }

    public long setUsuario(Usuario newUsuario) {
        return repositorio.createUsuario(newUsuario);
    }
    public void updateUsuarui(Usuario usuarioModificado){
     this.repositorio.modificarUsuario(usuarioModificado);
    }
    public boolean autenticarUsuario(Usuario validarUsuario) {
        Usuario usuario = repositorio.validarUsuario(validarUsuario.getCorreo(),validarUsuario.getPassword());
        return usuario != null; // Retorna true si existe
    }
}
