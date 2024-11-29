package com.ApiNoticias.APINoticias_Backend.Repositorio;

import com.ApiNoticias.APINoticias_Backend.Modelo.Noticia;
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
 * Repositorio para gestionar las operaciones relacionadas con las noticias en la base de datos.
 */
@Repository
public class NoticiaRepositorio {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private final SimpleJdbcInsert insertNoticia;
    private final NoticiaMap noticiaMap = new NoticiaMap();

    /**
     * Constructor que inicializa las herramientas de acceso a la base de datos.
     *
     * @param namedParameterJdbcTemplate herramienta para ejecutar consultas con parámetros nombrados.
     * @param dataSource                 fuente de datos para inicializar el inserto simple.
     */
    public NoticiaRepositorio(NamedParameterJdbcTemplate namedParameterJdbcTemplate, DataSource dataSource) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
        this.insertNoticia = new SimpleJdbcInsert(dataSource).withTableName("noticia")
                .usingGeneratedKeyColumns("id");
    }

    /**
     * Obtiene todas las noticias de la tabla "noticia".
     *
     * @return una lista de noticias existentes en la base de datos.
     */
    public List<Noticia> getAllNoticias() {
        String sql = "SELECT * FROM noticia;";
        return namedParameterJdbcTemplate.query(sql, noticiaMap);
    }

    /**
     * Inserta una nueva noticia en la base de datos.
     *
     * @param nuevaNoticia la noticia que se desea crear.
     * @return el ID generado para la nueva noticia.
     */
    public long createNoticia(Noticia nuevaNoticia) {
        // Verificar si ya existe una noticia con el mismo título
        String sqlVerificarTitulo = "SELECT COUNT(*) FROM noticia WHERE titular = :titular";
        MapSqlParameterSource parametrosVerificacion = new MapSqlParameterSource();
        parametrosVerificacion.addValue("titular", nuevaNoticia.getTitular());

        int existeTitulo = namedParameterJdbcTemplate.queryForObject(sqlVerificarTitulo, parametrosVerificacion, Integer.class);

        if (existeTitulo > 0) {
            throw new IllegalArgumentException("El título ya está registrado para otra noticia.");
        }

        // Si no existe, proceder a crear la noticia
        MapSqlParameterSource parametrosNoticia = new MapSqlParameterSource();
        parametrosNoticia.addValue("categoria", nuevaNoticia.getCategoria());
        parametrosNoticia.addValue("portal", nuevaNoticia.getPortal());
        parametrosNoticia.addValue("titular", nuevaNoticia.getTitular());
        parametrosNoticia.addValue("subtitulo", nuevaNoticia.getSubtitulo());
        parametrosNoticia.addValue("nombre_autor", nuevaNoticia.getNombreAutor());
        parametrosNoticia.addValue("fecha_publicacion", nuevaNoticia.getFechaPublicacion());
        parametrosNoticia.addValue("imagen", nuevaNoticia.getImagen());
        parametrosNoticia.addValue("contenido", nuevaNoticia.getContenido());
        parametrosNoticia.addValue("url_noticia", nuevaNoticia.getUrlNoticia());

        return insertNoticia.executeAndReturnKey(parametrosNoticia).longValue();
    }

    /**
     * Modifica una noticia existente en la base de datos.
     *
     * @param noticiaModificada la noticia con los datos actualizados.
     */
    public void modificarNoticia(Noticia noticiaModificada) {
        String sql = "UPDATE noticia SET categoria = :categoria, portal = :portal, "
                + "titular = :titular, subtitulo = :subtitulo, nombreAutor = :nombreAutor, "
                + "fechaPublicacion = :fechaPublicacion, imagen = :imagen, contenido = :contenido, "
                + "urlNoticia = :urlNoticia WHERE id = :id";

        MapSqlParameterSource parametrosNoticia = new MapSqlParameterSource();
        parametrosNoticia.addValue("id", noticiaModificada.getId());
        parametrosNoticia.addValue("categoria", noticiaModificada.getCategoria());
        parametrosNoticia.addValue("portal", noticiaModificada.getPortal());
        parametrosNoticia.addValue("titular", noticiaModificada.getTitular());
        parametrosNoticia.addValue("subtitulo", noticiaModificada.getSubtitulo());
        parametrosNoticia.addValue("nombreAutor", noticiaModificada.getNombreAutor());
        parametrosNoticia.addValue("fechaPublicacion", noticiaModificada.getFechaPublicacion());
        parametrosNoticia.addValue("imagen", noticiaModificada.getImagen());
        parametrosNoticia.addValue("contenido", noticiaModificada.getContenido());
        parametrosNoticia.addValue("urlNoticia", noticiaModificada.getUrlNoticia());

        namedParameterJdbcTemplate.update(sql, parametrosNoticia);
    }

    /**
     * Mapeador para convertir resultados de consultas SQL en objetos Noticia.
     */
    public static class NoticiaMap implements RowMapper<Noticia> {
        @Override
        public Noticia mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new Noticia(
                    rs.getInt("id"),
                    rs.getString("categoria"),
                    rs.getString("portal"),
                    rs.getString("titular"),
                    rs.getString("subtitulo"),
                    rs.getString("nombreAutor"),
                    rs.getString("fechaPublicacion"),
                    rs.getString("imagen"),
                    rs.getString("contenido"),
                    rs.getString("urlNoticia")
            );
        }
    }
}
