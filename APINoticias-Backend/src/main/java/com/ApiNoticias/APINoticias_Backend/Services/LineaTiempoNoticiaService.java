package com.ApiNoticias.APINoticias_Backend.Services;

import com.ApiNoticias.APINoticias_Backend.Modelo.LineaTiempoNoticia;
import com.ApiNoticias.APINoticias_Backend.Repositorio.LineaTiempoNoticiaRepositorio;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Servicio para gestionar las operaciones relacionadas con LineaTiempoNoticia.
 */
@Service
public class LineaTiempoNoticiaService {

    private final LineaTiempoNoticiaRepositorio repositorio;

    /**
     * Constructor que inicializa el servicio con el repositorio proporcionado.
     *
     * @param repositorio el repositorio de LineaTiempoNoticia.
     */
    public LineaTiempoNoticiaService(LineaTiempoNoticiaRepositorio repositorio) {
        this.repositorio = repositorio;
    }

    /**
     * Obtiene todas las relaciones entre línea de tiempo y noticias.
     *
     * @return una lista de todas las relaciones existentes.
     */
    public List<LineaTiempoNoticia> getAllLineaTiempoNoticias() {
        return repositorio.getAllLineaTiempoNoticia();
    }

    /**
     * Crea una nueva relación entre línea de tiempo y noticia.
     *
     * @param nuevaRelacion la nueva relación a crear.
     * @return el ID generado para la nueva relación.
     */
    public long createLineaTiempoNoticia(LineaTiempoNoticia nuevaRelacion) {
        return repositorio.createLineaTiempoNoticia(nuevaRelacion);
    }

    /**
     * Modifica una relación existente.
     *
     * @param relacionModificada la relación con los datos actualizados.
     */
    public void modificarLineaTiempoNoticia(LineaTiempoNoticia relacionModificada) {
        repositorio.modificarLineaTiempoNoticia(relacionModificada);
    }

    /**
     * Elimina una relación por su ID.
     *
     * @param id el ID de la relación a eliminar.
     */
    public void eliminarLineaTiempoNoticia(int id) {
        repositorio.eliminarLineaTiempoNoticia(id);
    }
}
