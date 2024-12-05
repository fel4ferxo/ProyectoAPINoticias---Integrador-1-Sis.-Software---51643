package com.ApiNoticias.APINoticias_Backend.Services;

import com.ApiNoticias.APINoticias_Backend.Modelo.LineaTiempo;
import com.ApiNoticias.APINoticias_Backend.Repositorio.LineaTiempoRepositorio;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceLineaTiempo {
    private final LineaTiempoRepositorio repositorio;

    public ServiceLineaTiempo(LineaTiempoRepositorio repositorio) {
        this.repositorio = repositorio;
    }

    /**
     * Obtiene todas las líneas de tiempo de la base de datos.
     *
     * @return una lista de todas las líneas de tiempo.
     */
    public List<LineaTiempo> getAllLineasTiempo() {
        return repositorio.getAllLineasTiempo();
    }

    /**
     * Crea una nueva línea de tiempo en la base de datos.
     *
     * @param nuevaLineaTiempo la línea de tiempo a insertar.
     * @return el ID generado para la nueva línea de tiempo.
     */
    public long setLineaTiempo(LineaTiempo nuevaLineaTiempo) {
        return repositorio.createLineaTiempo(nuevaLineaTiempo);
    }

    /**
     * Modifica una línea de tiempo existente en la base de datos.
     *
     * @param lineaTiempoModificada la línea de tiempo con los datos actualizados.
     */
    public void updateLineaTiempo(LineaTiempo lineaTiempoModificada) {
        repositorio.modificarLineaTiempo(lineaTiempoModificada);
    }
    public LineaTiempo getLineaTiempoById(int id) {
        return repositorio.getLineaTiempoById(id);
    }

    public void deleteLineaTiempo(int id) {
        repositorio.eliminarLineaTiempo(id);
    }

}
