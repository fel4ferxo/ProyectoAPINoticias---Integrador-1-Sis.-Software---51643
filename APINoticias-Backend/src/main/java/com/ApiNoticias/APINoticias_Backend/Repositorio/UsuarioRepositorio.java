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
/**
 * Repositorio para gestionar las operaciones relacionadas con los usuarios en la base de datos.
 * Proporciona métodos para realizar CRUD y autenticación.
 */
@Repository
public class UsuarioRepositorio {
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private final SimpleJdbcInsert insertusuario;
    private final usuarioMap suario_Map=new usuarioMap();
    private final usuarioMapValidar usuarioValidar_Map=new usuarioMapValidar();
    /**
     * Constructor que inicializa las herramientas de acceso a la base de datos.
     *
     * @param namedParameterJdbcTemplate herramienta para ejecutar consultas con parámetros nombrados.
     * @param dataSource                 fuente de datos para inicializar el inserto simple.
     */
    public UsuarioRepositorio(NamedParameterJdbcTemplate namedParameterJdbcTemplate,
                              DataSource dataSource) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
        this.insertusuario = new SimpleJdbcInsert(dataSource).withTableName("usuario")
                .usingGeneratedKeyColumns("idusuario");
    }
    /**
     * Obtiene todos los usuarios de la tabla "usuario".
     *
     * @return una lista de usuarios existentes en la base de datos.
     */
    public List<Usuario> getAllUsuarios(){
        String sql="select * from usuario;";
        return namedParameterJdbcTemplate.query(sql,suario_Map);
    }
    /**
     * Inserta un nuevo usuario en la base de datos.
     *
     * @param newUsuario el usuario que se desea crear.
     * @return el ID generado para el nuevo usuario.
     */
    public long createUsuario(Usuario newUsuario) {
        // Verificar si el correo ya existe en la base de datos
        String sqlVerificarCorreo = "SELECT COUNT(*) FROM usuario WHERE correo = :correo";
        MapSqlParameterSource parametrosVerificacion = new MapSqlParameterSource();
        parametrosVerificacion.addValue("correo", newUsuario.getCorreo());

        int existeCorreo = namedParameterJdbcTemplate.queryForObject(sqlVerificarCorreo, parametrosVerificacion, Integer.class);

        if (existeCorreo > 0) {
            throw new IllegalArgumentException("El correo ya está registrado.");
        }

        // Si no existe, proceder a crear el usuario
        MapSqlParameterSource parametrosUsuario = new MapSqlParameterSource();
        parametrosUsuario.addValue("name", newUsuario.getName());
        parametrosUsuario.addValue("apellido_p", newUsuario.getApelldio_p());
        parametrosUsuario.addValue("apellido_m", newUsuario.getApellido_m());
        parametrosUsuario.addValue("correo", newUsuario.getCorreo());
        parametrosUsuario.addValue("telefono", newUsuario.getTelefono());
        parametrosUsuario.addValue("metodo_pago", newUsuario.getMetodo_pago());
        parametrosUsuario.addValue("nro_cuenta", newUsuario.getNuemro_ccuenta());
        parametrosUsuario.addValue("password", newUsuario.getPassword());

        return insertusuario.executeAndReturnKey(parametrosUsuario).longValue();
    }

    /**
     * Modifica un usuario existente en la base de datos.
     *
     * @param usuarioModificado el usuario con los datos actualizados.
     */
    public void modificarUsuario(Usuario usuarioModificado) {
        String sql = "UPDATE usuario SET name = :name, apellido_p = :apellido_p, "
                + "apellido_m = :apellido_m, correo = :correo, telefono = :telefono, "
                + "metodo_pago = :metodo_pago, nro_cuenta = :nro_cuenta ,password = :password  WHERE idusuario = :id";

        MapSqlParameterSource parametrosUsuario = new MapSqlParameterSource();
        parametrosUsuario.addValue("id", usuarioModificado.getId()); // ID del usuario a modificar
        parametrosUsuario.addValue("name", usuarioModificado.getName());
        parametrosUsuario.addValue("apellido_p", usuarioModificado.getApelldio_p());
        parametrosUsuario.addValue("apellido_m", usuarioModificado.getApellido_m());
        parametrosUsuario.addValue("correo", usuarioModificado.getCorreo());
        parametrosUsuario.addValue("telefono", usuarioModificado.getTelefono());
        parametrosUsuario.addValue("metodo_pago", usuarioModificado.getMetodo_pago());
        parametrosUsuario.addValue("nro_cuenta", usuarioModificado.getNuemro_ccuenta());
        parametrosUsuario.addValue("password", usuarioModificado.getPassword());

        namedParameterJdbcTemplate.update(sql, parametrosUsuario);
    }
    /**
     * Valida las credenciales de un usuario (correo y contraseña).
     *
     * @param correo   el correo del usuario a validar.
     * @param password la contraseña del usuario a validar.
     * @return un objeto Usuario si las credenciales son válidas, o null si no lo son.
     */
    public Usuario validarUsuario(String correo, String password) {
        String sql = "SELECT * FROM usuario WHERE correo = :correo AND password = :password";
        MapSqlParameterSource parametros = new MapSqlParameterSource();
        parametros.addValue("correo", correo);
        parametros.addValue("password", password);

        List<Usuario> usuarios = namedParameterJdbcTemplate.query(sql, parametros, usuarioValidar_Map);
        return usuarios.isEmpty() ? null : usuarios.get(0); // Retorna el primer usuario si existe
    }
    /**
     * Mapeador para convertir resultados de consultas SQL en objetos Usuario.
     */
    public static class usuarioMap implements RowMapper<Usuario> {
        /**
         * Convierte una fila del ResultSet en un objeto Usuario.
         *
         * @param rs     el ResultSet que contiene los datos de la consulta.
         * @param rowNum el número de la fila actual.
         * @return un objeto Usuario con los datos de la fila.
         * @throws SQLException si ocurre un error al leer los datos del ResultSet.
         */
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
            String password=rs.getString("password");
            return new Usuario(id,name,apellidop,apellido_m,correo,telefono,metodo_pago,numero_cuenta,password);
        }
    }
    /**
     * Mapeador para convertir resultados de consultas SQL en objetos Usuario.
     */
    public static class usuarioMapValidar implements RowMapper<Usuario> {
        /**
         * Convierte una fila del ResultSet en un objeto Usuario.
         *
         * @param rs     el ResultSet que contiene los datos de la consulta.
         * @param rowNum el número de la fila actual.
         * @return un objeto Usuario con los datos de la fila.
         * @throws SQLException si ocurre un error al leer los datos del ResultSet.
         */
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
