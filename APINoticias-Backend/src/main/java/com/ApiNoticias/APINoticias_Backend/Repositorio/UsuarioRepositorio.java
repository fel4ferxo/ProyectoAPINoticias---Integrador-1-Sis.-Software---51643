package com.ApiNoticias.APINoticias_Backend.Repositorio;

import com.ApiNoticias.APINoticias_Backend.Modelo.Usuario;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class UsuarioRepositorio {
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private final SimpleJdbcInsert insertusuario;
    private final usuarioMap suario_Map=new usuarioMap();

    public UsuarioRepositorio(NamedParameterJdbcTemplate namedParameterJdbcTemplate,
                              DataSource dataSource) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
        this.insertusuario = new SimpleJdbcInsert(dataSource).withTableName("usuario")
                .usingGeneratedKeyColumns("idusuario");
    }
    public List<Usuario> getAllUsuarios(){
        String sql="select * from usuario;";
        return namedParameterJdbcTemplate.query(sql,suario_Map);
    }
    public long createUsuario(Usuario newUsuario){
        MapSqlParameterSource parametrosUsuario=new MapSqlParameterSource();
        parametrosUsuario.addValue("name",newUsuario.getName());
        parametrosUsuario.addValue("apellido_p",newUsuario.getApelldio_p());
        parametrosUsuario.addValue("apellido_m",newUsuario.getApellido_m());
        parametrosUsuario.addValue("correo",newUsuario.getCorreo());
        parametrosUsuario.addValue("telefono",newUsuario.getTelefono());
        parametrosUsuario.addValue("metodo_pago",newUsuario.getMetodo_pago());
        parametrosUsuario.addValue("nro_cuenta",newUsuario.getNuemro_ccuenta());
        return insertusuario.executeAndReturnKey(parametrosUsuario).longValue();
    }
    public void modificarUsuario(Usuario usuarioModificado) {
        String sql = "UPDATE usuario SET name = :name, apellido_p = :apellido_p, "
                + "apellido_m = :apellido_m, correo = :correo, telefono = :telefono, "
                + "metodo_pago = :metodo_pago, nro_cuenta = :nro_cuenta WHERE idusuario = :id";

        MapSqlParameterSource parametrosUsuario = new MapSqlParameterSource();
        parametrosUsuario.addValue("id", usuarioModificado.getId()); // ID del usuario a modificar
        parametrosUsuario.addValue("name", usuarioModificado.getName());
        parametrosUsuario.addValue("apellido_p", usuarioModificado.getApelldio_p());
        parametrosUsuario.addValue("apellido_m", usuarioModificado.getApellido_m());
        parametrosUsuario.addValue("correo", usuarioModificado.getCorreo());
        parametrosUsuario.addValue("telefono", usuarioModificado.getTelefono());
        parametrosUsuario.addValue("metodo_pago", usuarioModificado.getMetodo_pago());
        parametrosUsuario.addValue("nro_cuenta", usuarioModificado.getNuemro_ccuenta());

        namedParameterJdbcTemplate.update(sql, parametrosUsuario);
    }
    public static class usuarioMap implements RowMapper<Usuario> {

        @Override
        public Usuario mapRow(ResultSet rs, int rowNum) throws SQLException {
            long id=rs.getLong("idusuario");
            String name=rs.getString("name");
            String apellidop=rs.getString("apellido_p");
            String apellido_m=rs.getString("apellido_m");
            String correo=rs.getString("correo");
            String telefono=rs.getString("telefono");
            String metodo_pago=rs.getString("metodo_pago");
            String numero_cuenta=rs.getString("nro_cuenta");
            return new Usuario(id,name,apellidop,apellido_m,correo,telefono,metodo_pago,numero_cuenta);
        }
    }
}
