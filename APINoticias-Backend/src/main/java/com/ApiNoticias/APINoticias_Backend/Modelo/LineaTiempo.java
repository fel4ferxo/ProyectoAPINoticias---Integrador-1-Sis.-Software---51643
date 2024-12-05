package com.ApiNoticias.APINoticias_Backend.Modelo;

public class LineaTiempo {
    // Atributos
    private int idLineaTiempo;
    private int idUsuario;
    private String nombre;
    private String fechaCreacion;

    // Constructor
    public LineaTiempo(int idLineaTiempo, int idUsuario, String nombre, String fechaCreacion) {
        this.idLineaTiempo = idLineaTiempo;
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.fechaCreacion = fechaCreacion;
    }

    // Getters y Setters
    public int getIdLineaTiempo() {
        return idLineaTiempo;
    }

    public void setIdLineaTiempo(int idLineaTiempo) {
        this.idLineaTiempo = idLineaTiempo;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(String fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    // Método toString
    @Override
    public String toString() {
        return "LineaTiempo{" +
                "idLineaTiempo=" + idLineaTiempo +
                ", idUsuario=" + idUsuario +
                ", nombre='" + nombre + '\'' +
                ", fechaCreacion='" + fechaCreacion + '\'' +
                '}';
    }
}
