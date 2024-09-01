document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const errorMessage = document.getElementById('error-message');
    const registerErrorMessage = document.getElementById('register-error-message');
    const registerModal = document.getElementById('register-modal');
    const btnOpenModal = document.getElementById('btnOpenModal');
    const btnCloseModal = registerModal.querySelector('.btn-close');
    const backToLoginButton = document.getElementById('back-to-login-button');

    // Manejo del formulario de inicio de sesión
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const userType = document.getElementById('userType').value;
        
        if (!email || !password || !userType) {
            errorMessage.textContent = 'Por favor, complete todos los campos.';
            return;
        }
        
        // Ejemplo de verificación de credenciales
        if (email === 'test@example.com' && password === '1234') {
            localStorage.setItem('authenticated', 'true');

            // Redireccionar según el tipo de usuario
            if (userType === 'admin') {
                window.location.href = '/views/admin-dashboard.html'; // Redirige al panel de administración
            } else if (userType === 'user') {
                window.location.href = '/views/user-dashboard.html'; // Redirige al panel de usuario
            }
        } else {
            errorMessage.textContent = 'Correo electrónico o contraseña incorrectos.';
        }
    });

    // Manejo del formulario de registro
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const registerEmail = document.getElementById('register-email').value;
        const registerPassword = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (!registerEmail || !registerPassword || !confirmPassword) {
            registerErrorMessage.textContent = 'Por favor, complete todos los campos.';
            return;
        }
        
        if (registerPassword !== confirmPassword) {
            registerErrorMessage.textContent = 'Las contraseñas no coinciden.';
            return;
        }
        
        // Simulación de registro exitoso
        registerErrorMessage.textContent = 'Registro exitoso.';
        setTimeout(() => {
            // Cierra el modal después de registro exitoso
            closeModal();
        }, 1000);
    });

    // Manejo del botón Limpiar Campos en el formulario de inicio de sesión
    document.getElementById('clear-button').addEventListener('click', function() {
        loginForm.reset();
        errorMessage.textContent = '';
    });

    // Manejo del botón Limpiar Campos en el formulario de registro
    document.getElementById('register-clear-button').addEventListener('click', function() {
        registerForm.reset();
        registerErrorMessage.textContent = '';
    });

    // Abrir el modal
    btnOpenModal.addEventListener('click', function() {
        openModal();
    });

    // Cerrar el modal
    btnCloseModal.addEventListener('click', function() {
        closeModal();
    });

    backToLoginButton.addEventListener('click', function() {
        closeModal();
    });

    function openModal() {
        registerModal.style.display = 'block';
        registerModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeModal() {
        registerModal.style.display = 'none';
        registerModal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }
});
