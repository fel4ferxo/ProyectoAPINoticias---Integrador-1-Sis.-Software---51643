package com.ApiNoticias.APINoticias_Backend.Modelo;

public class Usuario {
    private long id;
    private String name;
    private String apelldio_p;
    private String apellido_m;
    private String correo;
    private String telefono;
    private String metodo_pago;
    private String nuemro_ccuenta;
    private String password;

    public Usuario(long id, String name, String apelldio_p, String apellido_m, String correo, String telefono, String metodo_pago, String nuemro_ccuenta, String password) {
        this.id = id;
        this.name = name;
        this.apelldio_p = apelldio_p;
        this.apellido_m = apellido_m;
        this.correo = correo;
        this.telefono = telefono;
        this.metodo_pago = metodo_pago;
        this.nuemro_ccuenta = nuemro_ccuenta;
        this.password=password;
    }

    public Usuario( String name, String apelldio_p, String apellido_m, String correo, String telefono, String metodo_pago, String nuemro_ccuenta, String password) {
        this.id = id;
        this.name = name;
        this.apelldio_p = apelldio_p;
        this.apellido_m = apellido_m;
        this.correo = correo;
        this.telefono = telefono;
        this.metodo_pago = metodo_pago;
        this.nuemro_ccuenta = nuemro_ccuenta;
        this.password=password;
    }

    public Usuario() {
        }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getApelldio_p() {
        return apelldio_p;
    }

    public void setApelldio_p(String apelldio_p) {
        this.apelldio_p = apelldio_p;
    }

    public String getApellido_m() {
        return apellido_m;
    }

    public void setApellido_m(String apellido_m) {
        this.apellido_m = apellido_m;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getMetodo_pago() {
        return metodo_pago;
    }

    public void setMetodo_pago(String metodo_pago) {
        this.metodo_pago = metodo_pago;
    }

    public String getNuemro_ccuenta() {
        return nuemro_ccuenta;
    }

    public void setNuemro_ccuenta(String nuemro_ccuenta) {
        this.nuemro_ccuenta = nuemro_ccuenta;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String pasword) {
        this.password = pasword;
    }
}
