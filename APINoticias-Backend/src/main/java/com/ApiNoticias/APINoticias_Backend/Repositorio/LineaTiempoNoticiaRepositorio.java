package com.ApiNoticias.APINoticias_Backend.Repositorio;

import com.ApiNoticias.APINoticias_Backend.Modelo.LineaTiempoNoticia;
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
 * Repositorio para gestionar las operaciones relacionadas con la tabla linea_tiempo_noticia.
 */
@Repository
public class LineaTiempoNoticiaRepositorio {

    private static final Logger logger = LoggerFactory.getLogger(LineaTiempoNoticiaRepositorio.class);

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private final SimpleJdbcInsert insertLineaTiempoNoticia;
    private final LineaTiempoNoticiaMap lineaTiempoNoticiaMap = new LineaTiempoNoticiaMap();

    /**
     * Constructor que inicializa las herramientas de acceso a la base de datos.
     *
     * @param namedParameterJdbcTemplate herramienta para ejecutar consultas con parámetros nombrados.
     * @param dataSource                 fuente de datos para inicializar el inserto simple.
     */
    public LineaTiempoNoticiaRepositorio(NamedParameterJdbcTemplate namedParameterJdbcTemplate,
                                         DataSource dataSource) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
        this.insertLineaTiempoNoticia = new SimpleJdbcInsert(dataSource)
                .withTableName("linea_tiempo_noticia")
                .usingGeneratedKeyColumns("idlinea_tiempo_noticia");

        logger.info("Repositorio LineaTiempoNoticia inicializado.");
    }

    /**
     * Obtiene todas las relaciones de línea de tiempo y noticias de la base de datos.
     *
     * @return una lista de objetos LineaTiempoNoticia existentes en la base de datos.
     */
    public List<LineaTiempoNoticia> getAllLineaTiempoNoticia() {
        String sql = "SELECT * FROM linea_tiempo_noticia;";
        logger.debug("Ejecutando consulta para obtener todas las relaciones de línea de tiempo y noticias: {}", sql);

        List<LineaTiempoNoticia> resultado = namedParameterJdbcTemplate.query(sql, lineaTiempoNoticiaMap);
        logger.info("Se obtuvieron {} relaciones de la base de datos.", resultado.size());

        return resultado;
    }

    /**
     * Inserta una nueva relación de línea de tiempo y noticia en la base de datos.
     *
     * @param nuevaRelacion la relación a crear.
     * @return el ID generado para la nueva relación.
     */
    public long createLineaTiempoNoticia(LineaTiempoNoticia nuevaRelacion) {
        logger.debug("Insertando una nueva relación: {}", nuevaRelacion);

        MapSqlParameterSource parametros = new MapSqlParameterSource();
        parametros.addValue("idlinea_tiempo", nuevaRelacion.getIdLineaTiempo());
        parametros.addValue("idNoticias", nuevaRelacion.getIdNoticias());

        long idGenerado = insertLineaTiempoNoticia.executeAndReturnKey(parametros).longValue();
        logger.info("Relación creada con éxito, ID generado: {}", idGenerado);

        return idGenerado;
    }

    /**
     * Actualiza una relación existente en la base de datos.
     *
     * @param relacionModificada la relación con los datos actualizados.
     */
    public void modificarLineaTiempoNoticia(LineaTiempoNoticia relacionModificada) {
        String sql = "UPDATE linea_tiempo_noticia SET idlinea_tiempo = :idlinea_tiempo, "
                + "idNoticias = :idNoticias WHERE idlinea_tiempo_noticia = :idlinea_tiempo_noticia";

        logger.debug("Actualizando relación con ID {}: {}", relacionModificada.getIdLineaTiempoNoticia(), relacionModificada);

        MapSqlParameterSource parametros = new MapSqlParameterSource();
        parametros.addValue("idlinea_tiempo_noticia", relacionModificada.getIdLineaTiempoNoticia());
        parametros.addValue("idlinea_tiempo", relacionModificada.getIdLineaTiempo());
        parametros.addValue("idNoticias", relacionModificada.getIdNoticias());

        int filasAfectadas = namedParameterJdbcTemplate.update(sql, parametros);
        logger.info("Se actualizaron {} filas.", filasAfectadas);
    }

    /**
     * Elimina una relación de línea de tiempo y noticia por su ID.
     *
     * @param id el ID de la relación a eliminar.
     */
    public void eliminarLineaTiempoNoticia(int id) {
        String sql = "DELETE FROM linea_tiempo_noticia WHERE idlinea_tiempo_noticia = :idlinea_tiempo_noticia";

        logger.debug("Eliminando relación con ID: {}", id);

        MapSqlParameterSource parametros = new MapSqlParameterSource();
        parametros.addValue("idlinea_tiempo_noticia", id);

        int filasAfectadas = namedParameterJdbcTemplate.update(sql, parametros);
        logger.info("Se eliminaron {} filas para el ID {}.", filasAfectadas, id);
    }

    /**
     * Mapeador para convertir resultados de consultas SQL en objetos LineaTiempoNoticia.
     */
    public static class LineaTiempoNoticiaMap implements RowMapper<LineaTiempoNoticia> {
        /**
         * Convierte una fila del ResultSet en un objeto LineaTiempoNoticia.
         *
         * @param rs     el ResultSet que contiene los datos de la consulta.
         * @param rowNum el número de la fila actual.
         * @return un objeto LineaTiempoNoticia con los datos de la fila.
         * @throws SQLException si ocurre un error al leer los datos del ResultSet.
         */
        @Override
        public LineaTiempoNoticia mapRow(ResultSet rs, int rowNum) throws SQLException {
            LineaTiempoNoticia lineaTiempoNoticia = new LineaTiempoNoticia(
                    rs.getInt("idlinea_tiempo_noticia"),
                    rs.getInt("idlinea_tiempo"),
                    rs.getInt("idNoticias")
            );

            logger.debug("Mapeando fila: {}", lineaTiempoNoticia);
            return lineaTiempoNoticia;
        }
    }
}
