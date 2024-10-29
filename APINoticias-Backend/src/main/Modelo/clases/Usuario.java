import com.mysql.cj.x.protobuf.MysqlxDatatypes.Scalar.String;

public class Usuario {
@id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private log id;
private String name;
private String ape_p;
private String ape_m;
private String correo;
private String passwor_usuario;
private String metodo_pago;
private String numero_pago;
//Geter and Seter
public log getId() {
    return id;
}
public void setId(log id) {
    this.id = id;
}
public String getName() {
    return name;
}
public void setName(String name) {
    this.name = name;
}
public String getApe_p() {
    return ape_p;
}
public void setApe_p(String ape_p) {
    this.ape_p = ape_p;
}
public String getApe_m() {
    return ape_m;
}
public void setApe_m(String ape_m) {
    this.ape_m = ape_m;
}
public String getCorreo() {
    return correo;
}
public void setCorreo(String correo) {
    this.correo = correo;
}
public String getPasswor_usuario() {
    return passwor_usuario;
}
public void setPasswor_usuario(String passwor_usuario) {
    this.passwor_usuario = passwor_usuario;
}
public String getMetodo_pago() {
    return metodo_pago;
}
public void setMetodo_pago(String metodo_pago) {
    this.metodo_pago = metodo_pago;
}
public String getNumero_pago() {
    return numero_pago;
}
public void setNumero_pago(String numero_pago) {
    this.numero_pago = numero_pago;
}


}
