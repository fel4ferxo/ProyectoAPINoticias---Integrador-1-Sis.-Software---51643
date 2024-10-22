document.addEventListener("DOMContentLoaded", function(){
    formLogin.addEventListener("submit", function(event){
        event.preventDefault();
        
        const correo = document.getElementById('correo');
        const contraseña = document.getElementById('contraseña'); 
        //Se mantiene temporalmente el ejemplo de verificación de inicio de sesión
        if (correo === 'test@example.com' && contraseña === '1234') {
            localStorage.setItem('authenticated', 'true');
        }
    });

    //Validador de campos de bootstrap
    (function () {
        'use strict'        
        var forms = document.querySelectorAll('.needs-validation')
        Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')
            }, false)
        })
    })()
});