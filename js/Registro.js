document.addEventListener("DOMContentLoaded", function(){
    formRegistro.addEventListener("submit", function(event){
        event.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const primerContraseña = document.getElementById('primerContraseña').value;
        const segundaContraseña = document.getElementById('segundaContraseña').value;
        const numeroCuenta = document.getElementById('numeroCuenta').value;
        /*Valida que ambos contraseñas coincidan */
        
    });
    /*Validación de campos con  Bootstrap*/
    (function () {
        'use strict'
        var forms = document.querySelectorAll('.needs-validation')
        Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
            var primerContraseña = document.getElementById('primerContraseña');
            var segundaContraseña = document.getElementById('segundaContraseña');
            
            if(primerContraseña.value !== segundaContraseña.value){
                segundaContraseña.setCustomValidity("Las contraseñas no coinciden");
            }
            else{
                segundaContraseña.setCustomValidity("");
            }

            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            } else {
                window.location.href = "inicio-sesion.html";
            }
            form.classList.add('was-validated')
            }, false)
        })
    })()
});