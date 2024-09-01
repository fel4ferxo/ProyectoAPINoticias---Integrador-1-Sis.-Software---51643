document.addEventListener("DOMContentLoaded", function() {
 

    if (window.location.pathname.includes('login.html')) {
        // Manejar el formulario de inicio de sesión
        const form = document.getElementById('login-form');
        const errorMessage = document.getElementById('error-message');
        
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Verifica las credenciales (esto es un ejemplo; en un entorno real, realiza una verificación más segura)
            if (username === '1234' && password === '1234') {
                // Guardar estado de autenticación (en un entorno real, podrías usar cookies o almacenamiento local)
                localStorage.setItem('authenticated', 'true');
                window.location.href = '/views/visualizador.html';
            } else {
                errorMessage.textContent = 'Nombre de usuario o contraseña incorrectos';
            }
        });
    }
});