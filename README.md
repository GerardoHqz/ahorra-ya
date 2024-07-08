# Ahorra Ya! - Backend
## Descripción

Este proyecto es una aplicación desarrollada con Spring Boot. Proporciona una API para el manejo de autorización, tiendas y ofertas de la aplicación Ahorra Ya!

## Requisitos

Antes de empezar, asegúrate de tener instalados los siguientes componentes:

- [SpringToolSuite4](https://spring.io/tools)
- [JDK 11+](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Gradle 6.8+](https://gradle.org/install/)

Opcional:
- [Insomnia](https://insomnia.rest/download)


## Instalación

Sigue los pasos a continuación para clonar y ejecutar el proyecto localmente.

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/GerardoHqz/ahorra-ya.git
   cd ahorra-ya

2. **Crear base de datos**

   Dentro de la carpeta "Backend" encontrarás el archivo "AhorraYa_DB.txt" que contiene el script de la base de datos, crea una base de datos PostgreSQL y ejecuta el script

3. **Configurar el archivo de propiedades**

     Accede al proyecto y en la carpeta resources dentro de main encontrarás el archivo "application.properties". Reemplaza los valores de conexión con las credenciales de tu base de datos
    
       spring.datasource.url=jdbc:postgresql://localhost:PUERTO/NOMBRE_BD
       spring.datasource.username=USUARIO
       spring.datasource.password=CONTRASEÑA

4. **Ejecutar el proyecto**
  
     Abre la aplicación de SpringToolSuite4 e importa el proyecto y ejecutalo como Spring Boot App. La aplicación se habilitará en localhost:8080

5. **Probar rutas (opcional)**

     Dentro de la carpeta "Backend" encontrarás el archivo "AhorraYa-API.json", importa la colección de rutas en Insomnia para ver y probar todas las rutas
