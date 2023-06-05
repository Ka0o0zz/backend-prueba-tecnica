# News App API

La aplicación es un sistema de gestión de noticias que permite obtener y almacenar noticias de diferentes fuentes. Proporciona funcionalidades para buscar noticias por palabra clave, guardar noticias en favoritos y cambiar el estado de una noticia.

## Tabla de contenidos

- [Requisitos](#requisitos)
- [Configuración](#configuración)
- [Ejecución](#ejecución)

## Requisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- Node.js (v14.17.0 o superior)
- NPM (v6.14.0 o superior)
- PostgreSQL (v8.11.0 o superior)
- incluir un archivo .env con las siguientes propiedades y sus respectivas credenciales:

```

    PORT = Puerto donde correra el desarrollo
    SECRET_JWT_SEED= clave para el JWT
    DATABASE_URL = link de la base de datos postgreSQl

```

## Configuración

1. Clona este repositorio en tu máquina local: `git clone https://github.com/Ka0o0zz/moviesapp.git`
2. Navega al directorio del proyecto: `cd moviesapp`
3. Instala las dependencias del proyecto: `npm install`
4. Configura cualquier archivo de configuración necesario (por ejemplo, archivos de entorno, credenciales, etc.)
5. ¡Listo! La configuración inicial está completa.

## Ejecución

Para ejecutar la aplicación, sigue estos pasos:

1. Asegúrate de haber completado la configuración mencionada anteriormente.
2. Ejecuta el siguiente comando: `npm run dev` para desarrollo
3. La aplicación se iniciará y estará disponible en `http://localhost:8080` (o cualquier otro puerto especificado).
4. para ejecutar los tests ejecute el siguiente comando `npm run test`
