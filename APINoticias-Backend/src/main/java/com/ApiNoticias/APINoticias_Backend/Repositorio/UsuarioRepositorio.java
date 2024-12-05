package com.ApiNoticias.APINoticias_Backend.Repositorio;

import com.ApiNoticias.APINoticias_Backend.Modelo.Usuario;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private static final Logger logger = LoggerFactory.getLogger(UsuarioRepositorio.class);

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private final SimpleJdbcInsert insertusuario;
    private final usuarioMap suario_Map = new usuarioMap();
    private final usuarioMapValidar usuarioValidar_Map = new usuarioMapValidar();

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

        logger.info("Repositorio Usuario inicializado.");
    }

    /**
     * Obtiene todos los usuarios de la tabla "usuario".
     *
     * @return una lista de usuarios existentes en la base de datos.
     */
    public List<Usuario> getAllUsuarios() {
        String sql = "select * from usuario;";
        logger.debug("Ejecutando consulta para obtener todos los usuarios: {}", sql);

        List<Usuario> resultado = namedParameterJdbcTemplate.query(sql, suario_Map);
        logger.info("Se obtuvieron {} usuarios.", resultado.size());

        return resultado;
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

        logger.debug("Verificando si el correo {} ya está registrado.", newUsuario.getCorreo());

        int existeCorreo = namedParameterJdbcTemplate.queryForObject(sqlVerificarCorreo, parametrosVerificacion, Integer.class);

        if (existeCorreo > 0) {
            logger.warn("El correo {} ya está registrado.", newUsuario.getCorreo());
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

        logger.debug("Insertando nuevo usuario: {}", newUsuario);

        long idGenerado = insertusuario.executeAndReturnKey(parametrosUsuario).longValue();
        logger.info("Usuario creado con éxito, ID generado: {}", idGenerado);

        return idGenerado;
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

        logger.debug("Actualizando usuario con ID {}: {}", usuarioModificado.getId(), usuarioModificado);

        int filasAfectadas = namedParameterJdbcTemplate.update(sql, parametrosUsuario);
        logger.info("Se actualizaron {} filas para el usuario con ID {}", filasAfectadas, usuarioModificado.getId());
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

        logger.debug("Validando usuario con correo: {}", correo);

        List<Usuario> usuarios = namedParameterJdbcTemplate.query(sql, parametros, usuarioValidar_Map);
        if (usuarios.isEmpty()) {
            logger.warn("No se encontraron usuarios con las credenciales proporcionadas.");
            return null; // No se encontraron usuarios con esas credenciales
        }

        logger.info("Usuario autenticado con éxito: {}", usuarios.get(0));
        return usuarios.get(0); // Retorna el primer usuario si existe
    }

    /**
     * Mapeador para convertir resultados de consultas SQL en objetos Usuario.
     */
    public static class usuarioMap implements RowMapper<Usuario> {
        @Override
        public Usuario mapRow(ResultSet rs, int rowNum) throws SQLException {
            Usuario usuario = new Usuario(
                    rs.getLong("idusuario"),
                    rs.getString("name"),
                    rs.getString("apellido_p"),
                    rs.getString("apellido_m"),
                    rs.getString("correo"),
                    rs.getString("telefono"),
                    rs.getString("metodo_pago"),
                    rs.getString("nro_cuenta"),
                    rs.getString("password")
            );

            logger.debug("Mapeando fila de resultado a Usuario: {}", usuario);
            return usuario;
        }
    }

    /**
     * Mapeador para convertir resultados de consultas SQL en objetos Usuario (para validación).
     */
    public static class usuarioMapValidar implements RowMapper<Usuario> {
        @Override
        public Usuario mapRow(ResultSet rs, int rowNum) throws SQLException {
            Usuario usuario = new Usuario(
                    rs.getLong("idusuario"),
                    rs.getString("name"),
                    rs.getString("apellido_p"),
                    rs.getString("apellido_m"),
                    rs.getString("correo"),
                    rs.getString("telefono"),
                    rs.getString("metodo_pago"),
                    rs.getString("nro_cuenta")
            );

            logger.debug("Mapeando fila de resultado a Usuario para validación: {}", usuario);
            return usuario;
        }
    }
}
