# ProyectoAPINoticias---Integrador-1-Sis.-Software---51643
## Proyecto de vista de noticias: Chasky news.

![logoActualizado](https://github.com/user-attachments/assets/60d05b73-e3e8-428c-a0ae-54284103a116)

El siguiente proyecto pretende servir como una plataforma de noticias dirigida a personas que deseen seguir una historia completa. El proyecto está construido principalmente usando el framework **Angular 18** para el ___Front-End___ y **Spring boot** para el manejo del ___Back-End___. Asimismo, utiliza una API externa, NewsAPI, para la recolección de las noticias.

 De manera sencilla el proyecto, una vez terminado, se compondrá de los siguientes elementos:

1. Página de inicio de sesión.
2. Página de registro.
3. _Feed_ de noticias.
4. Ventana modal para la lectura de una noticia.
5. Página de creación y edición de una línea de tiempo.
6. Página _overview_ de todas las líneas de tiempo creadas por el usuario.

Los casos de uso del proyecto se indica en el siguiente diagrama, del cual en el 40% de los casos de uso se incluye:
* Registro de usuario.
* Inicio de sesión.
* Verificar usuario.
* Mostrar error.
* Mostrar noticias en forma de tarjetas.
* Agregar filtros.
* Leer noticia.


![CasoUsoRevisado](https://github.com/user-attachments/assets/361735ec-d6fd-40a8-918d-2a10ec2b1e6b)

Para leer la documentación específica del código lea el archivo "DocumentacionGeneral.md"




# Implementación del Sistema en Clever Cloud para Chasky News

## 1. Crear la Organización en Clever Cloud

1. Iniciar sesión en [Clever Cloud](https://www.clever-cloud.com/).
2. En el menú lateral, hacer clic en **Add an organization**.
3. Completar los campos requeridos:
   - **Nombre de la Organización**: `Chasky News`
   - **Descripción** (opcional): `Sistema de gestión de noticias para la organización Chasky News`
4. Confirmar la creación de la organización.

---

## 2. Crear y Configurar la Base de Datos

1. Desde el panel de Clever Cloud, seleccionar **Create an application**.
2. Elegir la opción **Database** en lugar de **Application**.
3. Seleccionar el tipo de base de datos (ejemplo: MySQL).
4. Configurar los detalles de la base de datos:
   - **Nombre de la Base de Datos**: `bfqbqkxgaslrjtwpr6wn`
   - **Versión**: Seleccionar la versión de MySQL deseada (8.0 en tu caso).
   - **Plan**: Seleccionar un plan adecuado para las necesidades del proyecto.
5. Crear la base de datos y tomar nota de los detalles de conexión (host, puerto, nombre de la base de datos, usuario y contraseña).

---

## 3. Configuración de los Accesos para Colaboradores

1. Navegar a la sección de **Members** de la organización **Chasky News**.
2. Invitar a los miembros del equipo:
   - Hacer clic en **Invite a member**.
   - Introducir el correo electrónico de cada colaborador.
   - Asignar roles según sea necesario:
     - **Admin**: Para usuarios que administrarán aplicaciones y bases de datos.
     - **Collaborator**: Para usuarios que solo necesitan acceso a la base de datos o aplicaciones específicas.
3. Confirmar la invitación; los colaboradores recibirán un correo electrónico para aceptar la invitación.

---

## 4. Conexión del Backend al ChaskyNewsDB

### Configuración en GitHub Codespace (Java Backend)

1. En el archivo de configuración de la aplicación (ejemplo: `application.properties` en Spring Boot):

   spring.datasource.url=jdbc:mysql://bfqbqkxgaslrjtwpr6wn-mysql.services.clever-cloud.com:3306/bfqbqkxgaslrjtwpr6wn
   spring.datasource.username=um7owh6xrefyzh8q
   spring.datasource.password=949KhdTBJHfFtEVrUND4
   spring.jpa.hibernate.ddl-auto=update
