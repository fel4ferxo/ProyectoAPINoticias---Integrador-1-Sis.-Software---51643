package com.ApiNoticias.APINoticias_Backend.Modelo;

public class Noticia {
    private int id;
    private String categoria;
    private String portal;
    private String titular;
    private String subtitulo;
    private String nombreAutor;
    private String fechaPublicacion;
    private String imagen;
    private String contenido;
    private String urlNoticia;
    // Constructor
    public Noticia(int id, String categoria, String portal, String titular, String subtitulo,
                   String nombreAutor, String fechaPublicacion, String imagen, String contenido, String urlNoticia) {
        this.id = id;
        this.categoria = categoria;
        this.portal = portal;
        this.titular = titular;
        this.subtitulo = subtitulo;
        this.nombreAutor = nombreAutor;
        this.fechaPublicacion = fechaPublicacion;
        this.imagen = imagen;
        this.contenido = contenido;
        this.urlNoticia = urlNoticia;
    }

    // Getters y Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getPortal() {
        return portal;
    }

    public void setPortal(String portal) {
        this.portal = portal;
    }

    public String getTitular() {
        return titular;
    }

    public void setTitular(String titular) {
        this.titular = titular;
    }

    public String getSubtitulo() {
        return subtitulo;
    }

    public void setSubtitulo(String subtitulo) {
        this.subtitulo = subtitulo;
    }

    public String getNombreAutor() {
        return nombreAutor;
    }

    public void setNombreAutor(String nombreAutor) {
        this.nombreAutor = nombreAutor;
    }

    public String getFechaPublicacion() {
        return fechaPublicacion;
    }

    public void setFechaPublicacion(String fechaPublicacion) {
        this.fechaPublicacion = fechaPublicacion;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public String getUrlNoticia() {
        return urlNoticia;
    }

    public void setUrlNoticia(String urlNoticia) {
        this.urlNoticia = urlNoticia;
    }

    @Override
    public String toString() {
        return "Noticia{" +
                "id=" + id +
                ", categoria='" + categoria + '\'' +
                ", portal='" + portal + '\'' +
                ", titular='" + titular + '\'' +
                ", subtitulo='" + subtitulo + '\'' +
                ", nombreAutor='" + nombreAutor + '\'' +
                ", fechaPublicacion='" + fechaPublicacion + '\'' +
                ", imagen='" + imagen + '\'' +
                ", contenido='" + contenido + '\'' +
                ", urlNoticia='" + urlNoticia + '\'' +
                '}';
    }
}
