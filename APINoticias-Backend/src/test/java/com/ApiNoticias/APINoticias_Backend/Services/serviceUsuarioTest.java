package com.ApiNoticias.APINoticias_Backend.Services;


import com.ApiNoticias.APINoticias_Backend.Modelo.Usuario;
import com.ApiNoticias.APINoticias_Backend.Repositorio.UsuarioRepositorio;
import com.ApiNoticias.APINoticias_Backend.Services.serviceUsuario;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;


import java.util.Arrays;
import java.util.Collections;
import java.util.List;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class serviceUsuarioTest {


    @Mock
    private UsuarioRepositorio repositorio;


    @InjectMocks
    private serviceUsuario service;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    // Caso 1: Obtener todos los usuarios exitosamente
    @Test
    void testGetallUsuarioSuccessful() {
        Usuario usuario = new Usuario(1L, "Juan", "Pérez", "Gómez", "juan@example.com", "123456789", "Tarjeta", "123456789012","qwe");
        when(repositorio.getAllUsuarios()).thenReturn(Arrays.asList(usuario));


        List<Usuario> usuarios = service.getallUsuario();


        assertEquals(1, usuarios.size());
        assertEquals("Juan", usuarios.get(0).getName());
        verify(repositorio, times(1)).getAllUsuarios();
    }


    // Caso 2: Obtener usuarios cuando no hay datos
    @Test
    void testGetallUsuarioEmptyResult() {
        when(repositorio.getAllUsuarios()).thenReturn(Collections.emptyList());


        List<Usuario> usuarios = service.getallUsuario();


        assertTrue(usuarios.isEmpty());
        verify(repositorio, times(1)).getAllUsuarios();
    }


    // Caso 3: Crear un usuario exitosamente
    @Test
    void testSetUsuarioSuccessful() {
        Usuario newUsuario = new Usuario("Juan", "Pérez", "Gómez", "juan@example.com", "123456789", "Tarjeta", "123456789012","qwe");
        when(repositorio.createUsuario(newUsuario)).thenReturn(1L);


        long id = service.setUsuario(newUsuario);


        assertEquals(1L, id);
        verify(repositorio, times(1)).createUsuario(newUsuario);
    }


    // Caso 4: Crear usuario con valores nulos
    @Test
    void testSetUsuarioWithNullValues() {
        Usuario newUsuario = new Usuario( null, null, null, null, null, null, null,null);
        when(repositorio.createUsuario(newUsuario)).thenReturn(2L);


        long id = service.setUsuario(newUsuario);


        assertEquals(2L, id);
        verify(repositorio, times(1)).createUsuario(newUsuario);
    }


    // Caso 5: Modificar usuario exitosamente
    @Test
    void testUpdateUsuarioSuccessful() {
        Usuario usuarioModificado = new Usuario(1L, "Carlos", "Gómez", "López", "carlos@example.com", "987654321", "Paypal", "098765432109","qwe");


        assertDoesNotThrow(() -> service.updateUsuarui(usuarioModificado));
        verify(repositorio, times(1)).modificarUsuario(usuarioModificado);
    }


    // Caso 6: Modificar usuario con valores incompletos
    @Test
    void testUpdateUsuarioWithPartialValues() {
        Usuario usuarioModificado = new Usuario(1L, "Carlos", null, null, "carlos@example.com", null, null, null,"qwe");


        assertDoesNotThrow(() -> service.updateUsuarui(usuarioModificado));
        verify(repositorio, times(1)).modificarUsuario(usuarioModificado);
    }


    // Caso 7: Error al obtener usuarios
    @Test
    void testGetallUsuarioThrowsError() {
        when(repositorio.getAllUsuarios()).thenThrow(new RuntimeException("Database error"));


        Exception exception = assertThrows(RuntimeException.class, () -> service.getallUsuario());


        assertEquals("Database error", exception.getMessage());
        verify(repositorio, times(1)).getAllUsuarios();
    }


    // Caso 8: Error al crear usuario
    @Test
    void testSetUsuarioThrowsError() {
        Usuario newUsuario = new Usuario( "Error", "Test", null, null, null, null, null,null);
        when(repositorio.createUsuario(newUsuario)).thenThrow(new RuntimeException("Insert failed"));


        Exception exception = assertThrows(RuntimeException.class, () -> service.setUsuario(newUsuario));


        assertEquals("Insert failed", exception.getMessage());
        verify(repositorio, times(1)).createUsuario(newUsuario);
    }
}
