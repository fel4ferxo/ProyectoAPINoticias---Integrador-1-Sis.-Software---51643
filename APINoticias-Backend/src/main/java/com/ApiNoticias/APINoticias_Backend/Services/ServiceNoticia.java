package com.ApiNoticias.APINoticias_Backend.Services;

import com.ApiNoticias.APINoticias_Backend.Modelo.Noticia;
import com.ApiNoticias.APINoticias_Backend.Repositorio.NoticiaRepositorio;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceNoticia {
    private final NoticiaRepositorio repositorio;

    /**
     * Constructor que inicializa el repositorio de noticias.
     *
     * @param repositorio repositorio de acceso a datos de noticias.
     */
    public ServiceNoticia(NoticiaRepositorio repositorio) {
        this.repositorio = repositorio;
    }

    /**
     * Obtiene todas las noticias existentes en la base de datos.
     *
     * @return una lista de objetos Noticia.
     */
    public List<Noticia> getAllNoticias() {
        return repositorio.getAllNoticias();
    }

    /**
     * Crea una nueva noticia en la base de datos.
     *
     * @param nuevaNoticia el objeto Noticia que se desea guardar.
     * @return el ID generado para la nueva noticia.
     */
    public long setNoticia(Noticia nuevaNoticia) {
        return repositorio.createNoticia(nuevaNoticia);
    }

    /**
     * Actualiza una noticia existente en la base de datos.
     *
     * @param noticiaModificada el objeto Noticia con los datos actualizados.
     */
    public void updateNoticia(Noticia noticiaModificada) {
        repositorio.modificarNoticia(noticiaModificada);
    }
}
