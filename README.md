# SCREEN & EAT


## Componentes del grupo 

* Ricardo García Rodríguez
* Juan Daniel López Melainine
* Mencey Montesdeoca Álamo


## Descripción del proyecto 

En nuestro proyecto hemos creado una web sobre una franquicia de Cine llamada Screen & Eat. La web muestra la cartelera del cine como también los horarios de las distintas sesiones, además realiza el proceso para la reserva de los asientos y el pago de los mismos.


## Requisitos funcionales

* El sistema debe permitir el registro de nuevos usuarios solicitando: nombre, fecha de nacimiento y credenciales.

* El sistema al realizar el registro preguntará al usuario sus preferencias cinematográficas. 

* El sistema debe almacenar y mostrar un listado de las películas para las que el usuario ha comprado entradas.

* El sistema debe mostrar todas las películas disponibles. 

* Al seleccionar una película, el sistema debe mostrar una ficha técnica que incluya: Sinopsis, Duración, Actores, Clasificación, Género y Horas disponibles.

* La página de inicio debe incluir una barra de búsqueda.

* El sistema debe permitir filtrar la cartelera por: Ubicación del cine, Horario, Idioma, Día, Tipo de proyección.

* El sistema debe bloquear las butacas seleccionadas durante 10 minutos. Si el tiempo expira sin pago, las butacas deben liberarse automáticamente.

* Al final de la compra el sistema debe generar y mostrar un código QR válido como entrada. 

* El sistema debe mostrar un resumen de compra (película, hora, butacas, precio total) antes de confirmar.

Puedes ver la documentación completa en este [enlace](https://drive.google.com/file/d/15NyIk01zzonv1j1IL81EHqUIeuaejotJ/view?usp=sharing).


## Mockups y Storyboard

El pdf que contiene los mockups se llama Mockups y se encuentra en el archivo de la entrega (.zip)
El storyboard lo hemos presentado en forma de video.
Igualmente puede acceder al archivo pdf con los mockups y el enlace al video del storyboard mediante
el siguiente enlace [enlace](https://drive.google.com/file/d/1se5YMII0Yf-qZgSR9aOf1EN-gk-hvfb7/view?usp=sharing)


## Paginas HTML 

* eleccion_preferencias.html (Elegir Preferencias)
* entradas.html (Compra2)
* historial_peliculas.html (Historial peliculas)
* index.html (Home)
* InfoFilm.html (InfoMovie)
* login.html (Log in)
* pago_bizum.html (Compra5 Bizum)
* pago_paypal.html (Compra5 Paypal)
* pago_realizado_con_exito.html (Pago Realizado)
* pago_tarjeta.html (Compra5 Tarjeta)
* perfil.html (Perfil)
* registro.html (Register)
* resumen_preferencias.html (Preferencias)
* resumen_registrado.html (Compra3 Registrado)
* Sala.html (Compra1)
* seleccion-pago.html (Compra4)
* snacks.html (Compra2 registrado)

## Templates (y el archivo en el que se cargan )

Estos son los Templates identificados


* El template footer.html es cargado en las páginas:

    * Sala.html
    * resumen_preferencias.html
    * perfil.html
    * registro.html
    * login.html
    * historial_peliculas.html
    * index.html
    * InfoFilm.html
    * eleccion_preferencias.html

* El template carrusel.html es cargado en las páginas:

    * index.html
    * eleccion_preferencias.html
    * registro.html
    * login.html
    * historial_peliculas.html
    * perfil.html
    * resumen_preferencias.html

* El template Pasos.html es cargado en las páginas:

    * entradas.html
    * pago_bizum.html
    * pago_paypal.html
    * pago_tarjeta.html
    * resumen_registrado.html
    * Sala.html
    * seleccion-pago.html
    * snacks.html

* El template header.html es cargado en todas las páginas de la web.

* El template contador.html es cargado en las páginas:

    * sala.html
    * entradas.html
    * snacks.html
    * resumen_registrado.html
    * canjear_puntos.html
    * seleccion-pago.html
    * pago_paypal.html
    * pago_bizum.html
    * pago_tarjeta.html
