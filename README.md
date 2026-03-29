# SCREEN & EAT


## Componentes del grupo

* Ricardo García Rodríguez
* Juan Daniel López Melainine
* Mencey Montesdeoca Álamo

## Mockups

El pdf que contiene los mockups del responsive, con las distinstas versiones de móvil, tablet y Computadora. Se llama Mockups y se encuentra en el archivo de la entrega (.zip)

En este enlace están el diseño de los Mockups de cada dispositivo:
[Mockups](https://drive.google.com/file/d/176hwYXNYrNueInqlnIjftwkC5gBGqzO2/view?usp=sharing)

## Paginas HTML Diseño dinámico

* index.html (Inicio)
    * Responsive
        * En móvil
            * Adaptar los datos que se ven en pantalla en forma columna por el reducido grosor, además hemos utilizado una distribución Flexbox de máximo 3.
        * En tablet
            * El diseño es muy parecido al original pero a la hora de adaptar la información que no cabe en pantalla ponerla debajo del resto con la herramienta column.
    * Carga JSON
        * Esta página no se realiza carga de contenido JSON.
    * Validaciones
        * Esta página no tiene validaciones.

* InfoFilm.html
    * Resposive
        * Móvil
            * Se ha hecho un diseño en donde se encuentran la información de las pelis en columna para poder ahorrar espacio.
        * Tablet
            * El diseño que hemos optado es tener la imagen a la izquierda y la información a la derecha para reducir el espacio.
    * Funciones
        * Mediante un script Js/datosPelicula.js se importa la información de cada película de forma instantánea.
    * Carga JSON
        * Hemos hecho un diseño en donde los datos de las pelis están en Json/datos.json.
    * Validaciones
        * Esta página no tiene validaciones.

* seleccion-pago.html
    * Responsive
        * Móvil
            * En está página como el diseño de los tres cuadrados principales se ocupaban todo el grosor, optamos por hacer cada opción como un rectángulo uno debajo de otro estilo column.
        * Tablet
            * Optamos por el mismo diseño realizado en móvil pero con un espacio en general más grande.
    * Carga JSON
        * Esta página no se realiza carga de contenido JSON.
    * Validaciones
        * Esta página no tiene validaciones.

## Paginas HTML Diseño general

* La siguientes páginas se ha implementado diseños adaptables:
    * Móvil
        * Mantienen la coherencia visual, priorizando el orden vertical.
    * Tablet
        * Los diseños son generalmente muy parecidos a los originales pero con la herramienta column a disposición si hay saturación de información en pantalla.

* login.html
    * Funciones
        * Hemos añadido gracias a la ayuda del fichero Json/users.json que puedas iniciar sesión correctamente si está la información de la cuenta en el fichero. Los usuarios con los que hicimos las pruebas son pepe@gmail.com y ana@gmail.com.
    * Carga JSON
        * Esta página coge información JSON para el correcto inicio de sesión.
    * Validaciones
        * Email: Atributo type="email", para validar formato correo y required para obligar al usuario a no dejarlo vacio.
        * Contraseña: Atributo required y minlength="8" para garantizar que la clave tenga al menos 8 carácteres.
        * Captcha: Uso de un input type="checkbox" con el atributo required, lo que impide enviar el formulario si no se marca la casilla.
        * Seguridad: Uso de type="password" para ocultar los caracteres introducidos.

* registro.html
    * Carga JSON
        * Esta página no se realiza carga de contenido JSON.
    * Validaciones
        * Nombre y Apellido: Atributo required para asegurar que el usuario se identifique.
        * Atributo type="email" para validar la estructura del correo y required para que no lo deje vacio.
          *Fecha de nacimiento: Uso de type="date" que despliega un calendario y asegura una fecha válida.
        * Contraseña: Atributos required y minlength="8" para que la contraseña tenga mínimo 8 carácteres y no esté vacia, además los atributos pattern para que tenga una mayúscula, una minúscula, un número y un carácter especial, y el atributo title mensaje que aparece si el usuario no cumple un patrón.

* eleccion_preferencias.html
    * Carga JSON
        * Esta página no se realiza carga de contenido JSON.
    * Validaciones
        * Selección Múltiple: Uso de etiquetas input type="checkbox" para permitir que el usuario elija varios géneros cinematográficos a la vez.
        * Sugerencias de Datos: Se ha implementado una etiqueta datalist vinculada al campo de texto de "Actores".

* resumen_preferencias.html
    * Funciones
        * En esta página hemos añadido una funcionalidad para que sea más dinámica y con el fichero Js/showPreferences.js si has iniciado sesión te saldrán tus géneros, actores favoritos y sino no saldrá ninguna información. Los usuarios con los que hicimos las pruebas son pepe@gmail.com y ana@gmail.com.
    * Carga JSON
        * Se cargan las preferencias de cada cliente desde las variables de Json/users.json.
    * Validaciones
        * Esta página no tiene validaciones.

* entradas.html
    * Carga JSON
        * Esta página no se realiza carga de contenido JSON.
    * Validaciones
        * Tipo de dato: Uso de type="number" en los selectores de cantidad para asegurar que solo se introduzcan cifras.
        * Rango: Atributo min="0" para evitar que el usuario introduzca cantidades negativas de entradas.
          Accesibilidad: Uso de aria-required="true" en el cuerpo de la tabla para indicar la importancia de la sección.

* historial_peliculas.html
    * Carga JSON
        * Esta página no se realiza carga de contenido JSON.
    * Validaciones
        * Esta página no tiene validaciones.

* pago_bizum.html
    * Carga JSON
        * Esta página no se realiza carga de contenido JSON.
    * Validaciones
        * Obligatoriedad: Atributo required en ambos campos de texto.
        * Semántica: Uso de type="tel" para el número de teléfono.

* pago_paypal.html
    * Carga JSON
        * Esta página no se realiza carga de contenido JSON.
    * Validaciones
        * Selección Predefinida: Uso de una etiqueta select con opciones cerradas, lo que limita la entrada de datos a valores válidos del sistema.

* pago_realizado_con_exito.html
    * Carga JSON
        * Se cargan la imagen de la película, fecha y butaca de la película elegida en el fichero Json/datos.json.
    * Validaciones
        * Esta página no tiene validaciones.

* PagoTarjeta.html
    * Carga JSON
        * Esta página no se realiza carga de contenido JSON.
    * Validaciones
        * Número de Tarjeta: required que es obligatorio.
        * Minlength="16" y maxlength="16" para forzar la longitud exacta.
        * Pattern="[0-9]{16}": Expresión regular que solo permite números y evita letras o espacios.
        * Inputmode="numeric": Fuerza el teclado numérico en móviles.
        * CVV: * pattern="[0-9]{3}" y maxlength="3" y minlength="3": Solo permite exactamente 3 dígitos numéricos.
          Ayuda al usuario: Uso del atributo title para mostrar mensajes de error personalizados si no se cumple el formato.

* perfil.html
    * Carga JSON
        * Se cargan el email y la contraseña de las variables del usuario en el fichero Json/users.json.
    * Validaciones
        * Esta página no tiene validaciones.

* resumen_registrado.html
    * Carga JSON
        * Se carga la foto de la película elegido desde el fichero Json/datos.json.
    * Validaciones
        * Esta página no tiene validaciones.

* Sala.html
    * Carga JSON
        * Esta página no se realiza carga de contenido JSON.
    * Validaciones
        * Esta página no tiene validaciones.

* snacks.html
    * Carga JSON
        * Esta página no se realiza carga de contenido JSON.
    * Validaciones
        * Esta página no tiene validaciones.

## Contenido JSON

* Nuestro JSON es tipo local, y la información se encuentra en un subdirectorio llamado Json y en él están los ficheros datos.json para la información de cada peli y users.json para la información de cada cliente.

## Aspectos a recalcar

* Al finalizar el resgistro con una cuenta no existente en el fichero Js/users.json esta información no se añade ya que JavaScript no permite añadir información al fichero .json, así que optamos por esperar a tener la herramienta Angular ya que ahí si se podrá tener una base de datos más dinámica.
