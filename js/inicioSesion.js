document.addEventListener("DOMContentLoaded", function(){
    formLogin.addEventListener("submit", function(event){
        event.preventDefault();
        
        const correo = document.getElementById('correo');
        const contraseña = document.getElementById('contraseña'); 
        const errorMensaje = document.getElementById('mensaje-error');
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
            var correo = document.getElementById('correo').value;
            var contraseña = document.getElementById('contraseña').value; 
            var errorMensaje = document.getElementById('mensaje-error');

            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            else{
                if(correo === "test@example.com" && contraseña === "1234"){
                    window.location.href = "news.html";
                }else{
                    errorMensaje.classList.remove('d-none');
                }
            }
            form.classList.add('was-validated')
            }, false)
        })
    })()
});