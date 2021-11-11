Antes de empezar el proceso de uso de esta aplicacion debe tener intalado en su equipo nodejs y MySQL; herramientas necesarias en su equipo para el correcto funcionamiento de esta API.

Para el buen funcionammiento del servicio de MySql, el servicio debe ejecutarse por el puerto "3306", el usuario es "root@localhost" la contraseña es "3229" si desea modificar alguno de estos parametros debe dirigirse a "C:\Users\user\Desktop\DALILA-RESTAURANT\SRC\database.js" y modificar los parametros de conexion del nuevo servidor. Ya en funcionamiento el servicio SQL con los query ejecutados debe iniciar con el resto de la aplicacion.

En la ruta donde se ubica nuestro proyecto ..\DALILA-RESTAURANT debe hacer uso de una consola que le permita ejecutar Scripts de nodejs sobre esta ruta. Con la consola abierta en esta ruta debe escrbir el siguiente comando sin las comillas: 

        "npm run dev"

En este punto el servidor de esta API debe estar ejecutandose por el puerto 3000.

Para ingresar a las rutas de nuestra API se escribe la ruta principal del proyecto:

            "http://localhost:3000"

y hay en adelante puede hacer uso del archivo spec.yml para tener la informacion necesaria de las rutas y funcionalidades de nuestra API. Ademas en una carpeta llamada postman puede encontrar la collection que pueden abrir en su aplicacion de postman con ejemplos organizados.

Pd: Para tener una lectura más sencilla de las indicaciones de las funcionalidades de la rutas por medio del spec.yml te recomiendo copiar y pegar el spec.yml al siguiente editor de swagger; por medio de su interfaz puedes leer el documento mucho más facilmente

url de swagger: https://editor.swagger.io/

Aclaraciones:

Por defecto en la base de datos se carga un usuario con rol de administrador con este se puede ingresar a todas las rutas. Al ingresar correo y contraseña se respondera un token con este token se ingresa en lo headers con etiqueta x-access-token y hay les permitira hacer las funcionalidades correctas de cada ruta.

Por defecto al registrarse los usuario tendran el rol usuario que solo les permitira ver los pedidos y productos; para modificar, agregar y eliminar productos o pedidos debe tener el rol de moderador o administrador.

Las rutas del CRUD de los usuario solo pueden ser ingresadas con el rol de administrador por tanto la forma de agregar otro administrador debe ser por el CRUD.
