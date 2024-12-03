package com.ApiNoticias.APINoticias_Backend.Modelo;

/**
 * Clase que representa la relación entre una línea de tiempo y una noticia.
 */
public class LineaTiempoNoticia {

    private int idLineaTiempoNoticia;
    private int idLineaTiempo;
    private int idNoticias;

    /**
     * Constructor vacío.
     */
    public LineaTiempoNoticia() {
    }

    /**
     * Constructor con todos los parámetros.
     *
     * @param idLineaTiempoNoticia el ID de la relación línea de tiempo-noticia.
     * @param idLineaTiempo        el ID de la línea de tiempo asociada.
     * @param idNoticias           el ID de la noticia asociada.
     */
    public LineaTiempoNoticia(int idLineaTiempoNoticia, int idLineaTiempo, int idNoticias) {
        this.idLineaTiempoNoticia = idLineaTiempoNoticia;
        this.idLineaTiempo = idLineaTiempo;
        this.idNoticias = idNoticias;
    }

    /**
     * Obtiene el ID de la relación línea de tiempo-noticia.
     *
     * @return el ID de la relación.
     */
    public int getIdLineaTiempoNoticia() {
        return idLineaTiempoNoticia;
    }

    /**
     * Establece el ID de la relación línea de tiempo-noticia.
     *
     * @param idLineaTiempoNoticia el ID a establecer.
     */
    public void setIdLineaTiempoNoticia(int idLineaTiempoNoticia) {
        this.idLineaTiempoNoticia = idLineaTiempoNoticia;
    }

    /**
     * Obtiene el ID de la línea de tiempo asociada.
     *
     * @return el ID de la línea de tiempo.
     */
    public int getIdLineaTiempo() {
        return idLineaTiempo;
    }

    /**
     * Establece el ID de la línea de tiempo asociada.
     *
     * @param idLineaTiempo el ID de la línea de tiempo a establecer.
     */
    public void setIdLineaTiempo(int idLineaTiempo) {
        this.idLineaTiempo = idLineaTiempo;
    }

    /**
     * Obtiene el ID de la noticia asociada.
     *
     * @return el ID de la noticia.
     */
    public int getIdNoticias() {
        return idNoticias;
    }

    /**
     * Establece el ID de la noticia asociada.
     *
     * @param idNoticias el ID de la noticia a establecer.
     */
    public void setIdNoticias(int idNoticias) {
        this.idNoticias = idNoticias;
    }

    @Override
    public String toString() {
        return "LineaTiempoNoticia{" +
                "idLineaTiempoNoticia=" + idLineaTiempoNoticia +
                ", idLineaTiempo=" + idLineaTiempo +
                ", idNoticias=" + idNoticias +
                '}';
    }
}
