# Proyecto Chasky NEWS - Documentación del código
## Inicio de sesión
El componente de inicio de sesión toma dos _inputs_: 
- Correo electrónico.
- Contraseña.

Usando la validación de Bootstrap 5.3, busca los _inputs_ dentro del _Local Storage_, usando una solicitud JSON el cual procede a convertir en un String. De no encontrar los datos es marcado como inválido y no se puede proceder más en el sistema, de ser válido se redirige al usuario al feed de noticias.

La validación de los datos se da utilizando la función __isEmailValid__, 
__isCredentialValid__ y la función __Validators__ de Angular 18.

__isEmailValid__ verifica que el correo electrónico ingresado no esté ya registrado.
__isCredentialValid__ verifica, de existir el correo electrónico, la contraseña ingresada sea igual a la registrada.

Ambas funciones utilizan __Validators__, el cual permite manejar procesos de validación, en caso de que alguno de los campos sea determinado inválido o esté vacio, se manda la señal al HTML para que muestre el tag _div_ cuya clase es __invalid-feedback__, esta es la clase predetermina de Bootrap que hace referencia a un campo inválido de formulario. 
De no ser este el caso, automáticamente se manda la señal para que se muestre el tag _div_ cuya clase es __valid-feedback__, que representa un campo válido.

La seguridad del sistema resguardado por el inicio de sesión es manejada por los servicios authService y authGuard proveídos nativamente por Angular 18.

AuthGuard se encarga de no permitir el enrutamiento a otras páginas que no sean la página de registro y la página de inicio de sesión en caso de que el usuario no esté _logeado_. AuthService entonces permite determinar si el usuario está o no _logeado_ en primer lugar.

Una vez el usuario haya iniciado sesión, el estado booleando __isLoggedInStatus__, el cual determina si el usuario está _logeado_, cambia a __true__ y el usuario es redigirido al feed de noticias.

El uso de _Local Storage_ es meramente temporal, se utiliza para simular correctamente el funcionamiento del panel, pronto se terminará la conexión completa con Spring Boot y la API de nuestra base de datos.

## Registro
El componente de registro toma los siguientes _inputs_:
* Nombre de usuario.
* Correo electrónico.
* Contraseña.
* Contraseña de confirmación.
* Método de pago.
* Numero de cuenta de 20 dígitos.

Usando la validación de Bootstrao 5.3, se busca el correo electrónico dentro del _Local Storage_, de encontrarse se marca como inválido y no se procede con el sistema. Esto también ocurre en caso de que las contraseñas no coincidan. En caso de que los datos sean validados, el usuario es redirigido a la página de inicio de sesión.

El proceso de validación es idéntico al de inicio de sesión, solo que en este caso no solo se verifica que los campos estén llenos, sino que se utilizan las funciones: __exactLengthValidator__, __passwordsMatchValidator__ y __Validators__

__exactLengthValidator__ se encarga de verificar que el número de cuenta sea de 20 dígitos.
__passwordsMatchValidator__ se encarga de verificar que la contraseña que se desea registrar sea igual a la contraseña de confirmación

En el proceso de registro en sí, se guardan los siguientes datos:
* Nombre de usuario.
* Correo electrónico.
* Contraseña.
* Número de cuenta.
* Monto: S/5.
* Tipo de suscripción: Estándar.

Los últimos dos datos son agregados estáticamente por el sistema.

## _Feed_ de noticias

Dentro del feed de noticias, se tiene los siguiente elementos principales
* Barra de navegación: Barra superior que contiene accesos a otras páginas, en el futuro contendrá un enlace al overview de las líneas de tiempo y a la creación en sí de las mismas.
* Contenedor de noticias en forma de tarjeta: Es un campo donde las noticias, que toman las formas de tarjetas, son presentadas.
* Barra de búsqueda: Filtra las noticias según el titular ingresado.
* Filtros específicos: 
    - Categoría: Categoría de las noticias, específicamente: Tecnología, salud, finanzas, deportes y cultura.
    - Región América del Norte, América del Sur, Europa, Asia y África.
    - Autor: Nombre del autor.
    - Fecha inicial: Año que supone el límite en que tan antiguas pueden ser la noticias. Por ejemplo, si se ingresase el año 2014 solo se mostrarían las noticias publicadas a partir de ese año.
    - Fecha final: Similar al anterior, solo que esta muestra solo muestra las noticias publicadas anteriormente al año ingresado.

De estos filtros, actualmente funcionan todos menos el filtro de región. Esto se debe a que nuestro equipo está considerando si mantener este filtro o no, pues nuestra API externa no contiene esta información y su correcta clasificación sería muy complicada de hacer manualmente.

Para profundizar en como el proceso de filtrado funciona, en primer lugar se procesa la totalidad de las noticias en un arreglo llamado __newsData__ que implementa la interfaz __News__ el cual describe los datos que una noticia debe tener y su tipo de dato:

  * id: number;
  * categoria: string;
  * portal: string;
  * titular: string;
  * subtitulo: string;
  * nombreAutor: string;
  * fechaPublicacion: string;
  * imagen: string; (es un string pues es la URL de la imagen)
  * contenido: string;

Luego, se copian los datos de __newsData__ en un nuevo arreglo llamada __noticiasFiltradas__ el cual solo contiene las noticias que coincidan con los criterios de filtrado. Este arreglo es de gran variación, osea, que cambia constantemente.

__noticiasFiltradas__ es el arreglo cuyos elementos, cuyas noticias, son mostradas en el feed

Las opciones de filtros en  de categoría y regiones en sí son añadidos desde el Typescript, utilizando __ngModel__ y __*ngFor__. 


Dentro del feed en sí de las noticias, estas aparecen en forma de tarjeta, y muestran el titular de la noticia y una imagen relacionada. Una vez que se clica una noticia, es cuando la ventana modal del artículo completo aparece.

## Ventana modal del artículo

Intimamente relacionado con el componente anterior, forma parte del _feed_ dentro del código. Este, junto a las tarjetas, cargan datos usando Typescript y los presentan en un artículo completo. Los elementos que se ven involucrados son los siguientes y aparecen en el siguiente orden:

* Categoría de la noticia.
* Portal redactor de la noticia.
* Titular.
* Subtítulo.
* Imagen relacionada.
* Nombre del autor.
* Fecha de publicación (DD/MM/AA).
* Cuerpo del artículo

Actualmente los datos que toman las tarjetas y el artículo son estáticos, a futuro los datos se recibirán desde un archivo JSON guardado en nuestra base de datos.
