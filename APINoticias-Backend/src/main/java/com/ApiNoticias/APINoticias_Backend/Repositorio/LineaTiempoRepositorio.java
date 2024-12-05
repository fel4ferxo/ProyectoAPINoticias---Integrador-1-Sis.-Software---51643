package com.ApiNoticias.APINoticias_Backend.Repositorio;

import com.ApiNoticias.APINoticias_Backend.Modelo.LineaTiempo;
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
 * Repositorio para gestionar las operaciones relacionadas con la línea de tiempo en la base de datos.
 */
@Repository
public class LineaTiempoRepositorio {

    private static final Logger logger = LoggerFactory.getLogger(LineaTiempoRepositorio.class);

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private final SimpleJdbcInsert insertLineaTiempo;
    private final LineaTiempoMap lineaTiempoMap = new LineaTiempoMap();

    /**
     * Constructor que inicializa las herramientas de acceso a la base de datos.
     *
     * @param namedParameterJdbcTemplate herramienta para ejecutar consultas con parámetros nombrados.
     * @param dataSource                 fuente de datos para inicializar el inserto simple.
     */
    public LineaTiempoRepositorio(NamedParameterJdbcTemplate namedParameterJdbcTemplate, DataSource dataSource) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
        this.insertLineaTiempo = new SimpleJdbcInsert(dataSource).withTableName("linea_tiempo")
                .usingGeneratedKeyColumns("id_linea_tiempo");

        logger.info("Repositorio LineaTiempo inicializado.");
    }

    /**
     * Obtiene todas las líneas de tiempo de la tabla "linea_tiempo".
     *
     * @return una lista de líneas de tiempo existentes en la base de datos.
     */
    public List<LineaTiempo> getAllLineasTiempo() {
        String sql = "SELECT * FROM linea_tiempo;";
        logger.debug("Ejecutando consulta para obtener todas las líneas de tiempo: {}", sql);

        List<LineaTiempo> resultado = namedParameterJdbcTemplate.query(sql, lineaTiempoMap);
        logger.info("Se obtuvieron {} líneas de tiempo.", resultado.size());

        return resultado;
    }

    /**
     * Inserta una nueva línea de tiempo en la base de datos.
     *
     * @param nuevaLineaTiempo la línea de tiempo que se desea crear.
     * @return el ID generado para la nueva línea de tiempo.
     */
    public long createLineaTiempo(LineaTiempo nuevaLineaTiempo) {
        logger.debug("Insertando nueva línea de tiempo: {}", nuevaLineaTiempo);

        MapSqlParameterSource parametros = new MapSqlParameterSource();
        parametros.addValue("id_usuario", nuevaLineaTiempo.getIdUsuario());
        parametros.addValue("nombre", nuevaLineaTiempo.getNombre());
        parametros.addValue("fecha_creacion", nuevaLineaTiempo.getFechaCreacion());

        long idGenerado = insertLineaTiempo.executeAndReturnKey(parametros).longValue();
        logger.info("Línea de tiempo creada con éxito, ID generado: {}", idGenerado);

        return idGenerado;
    }

    /**
     * Modifica una línea de tiempo existente en la base de datos.
     *
     * @param lineaTiempoModificada la línea de tiempo con los datos actualizados.
     */
    public void modificarLineaTiempo(LineaTiempo lineaTiempoModificada) {
        String sql = "UPDATE linea_tiempo SET id_usuario = :id_usuario, nombre = :nombre, "
                + "fecha_creacion = :fecha_creacion WHERE id_linea_tiempo = :id_linea_tiempo";

        logger.debug("Actualizando línea de tiempo con ID {}: {}", lineaTiempoModificada.getIdLineaTiempo(), lineaTiempoModificada);

        MapSqlParameterSource parametros = new MapSqlParameterSource();
        parametros.addValue("id_linea_tiempo", lineaTiempoModificada.getIdLineaTiempo());
        parametros.addValue("id_usuario", lineaTiempoModificada.getIdUsuario());
        parametros.addValue("nombre", lineaTiempoModificada.getNombre());
        parametros.addValue("fecha_creacion", lineaTiempoModificada.getFechaCreacion());

        int filasAfectadas = namedParameterJdbcTemplate.update(sql, parametros);
        logger.info("Se actualizaron {} filas.", filasAfectadas);
    }

    /**
     * Obtiene una línea de tiempo específica por su ID desde la base de datos.
     *
     * @param id el ID de la línea de tiempo que se desea buscar.
     * @return el objeto LineaTiempo correspondiente al ID proporcionado.
     * @throws org.springframework.dao.EmptyResultDataAccessException si no se encuentra una línea de tiempo con el ID proporcionado.
     */
    public LineaTiempo getLineaTiempoById(int id) {
        String sql = "SELECT * FROM linea_tiempo WHERE id_linea_tiempo = :id_linea_tiempo";
        MapSqlParameterSource parametros = new MapSqlParameterSource();
        parametros.addValue("id_linea_tiempo", id);

        logger.debug("Obteniendo línea de tiempo con ID: {}", id);

        LineaTiempo lineaTiempo = namedParameterJdbcTemplate.queryForObject(sql, parametros, lineaTiempoMap);
        logger.info("Línea de tiempo obtenida: {}", lineaTiempo);

        return lineaTiempo;
    }

    /**
     * Elimina una línea de tiempo de la base de datos basada en su ID.
     *
     * @param id el ID de la línea de tiempo que se desea eliminar.
     * @throws org.springframework.dao.DataAccessException si ocurre un error al intentar eliminar la línea de tiempo.
     */
    public void eliminarLineaTiempo(int id) {
        String sql = "DELETE FROM linea_tiempo WHERE id_linea_tiempo = :id_linea_tiempo";
        MapSqlParameterSource parametros = new MapSqlParameterSource();
        parametros.addValue("id_linea_tiempo", id);

        logger.debug("Eliminando línea de tiempo con ID: {}", id);

        int filasAfectadas = namedParameterJdbcTemplate.update(sql, parametros);
        logger.info("Se eliminaron {} filas para el ID {}.", filasAfectadas, id);
    }

    /**
     * Mapeador para convertir resultados de consultas SQL en objetos LineaTiempo.
     */
    public static class LineaTiempoMap implements RowMapper<LineaTiempo> {
        @Override
        public LineaTiempo mapRow(ResultSet rs, int rowNum) throws SQLException {
            LineaTiempo lineaTiempo = new LineaTiempo(
                    rs.getInt("id_linea_tiempo"),
                    rs.getInt("id_usuario"),
                    rs.getString("nombre"),
                    rs.getString("fecha_creacion")
            );

            logger.debug("Mapeando fila de resultado: {}", lineaTiempo);
            return lineaTiempo;
        }
    }
}
