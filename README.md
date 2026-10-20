# Tecnologías Web Avanzadas (TWA) - ISLA Gaia

Repositorio oficial de las prácticas y fichas de la asignatura **Tecnologías Web Avanzadas** del Grado en Ingeniería Informática.

## Estructura del Proyecto

* **`twa-ficha02/`**: Módulo de catálogo en Node.js (funciones puras, manejo de ficheros, interfaz CLI con `process.argv` y pruebas automáticas con `node:assert/strict`).
* **`twa-ficha03/`**: Aplicación web SPA basada en Vite (gestión de estado centralizado, carga asíncrona de datos con `fetch`, renderizado seguro con DOM y manejo de eventos interactivos).

## Declaración de Uso de IA Generativa

De acuerdo con la normativa de la asignatura para el trabajo en casa (*"at home it's allowed if declared in the README"*), se declara el uso de herramientas de IA generativa como apoyo para:
* Consultar la sintaxis de módulos ES y métodos de arrays nativos.
* Resolver dudas conceptuales sobre la reactividad basada en estado y el ciclo de vida de peticiones asíncronas (`async/await`).
* Estructuración inicial de plantillas .

Todo el código ha sido revisado, adaptado, integrado y probado de forma manual por el autor del repositorio.

## Reflexión y Preguntas Frecuentes

### 1. ¿Por qué utilizamos un objeto de estado centralizado (`state`) junto con una única función `render()` en lugar de modificar el DOM directamente en cada evento?
El uso de un estado centralizado garantiza que la interfaz de usuario sea siempre un reflejo predecible y consistente de los datos actuales ("UI as a function of state"). Evita errores de sincronización donde diferentes partes de la página muestran datos contradictorios y simplifica enormemente la depuración y el mantenimiento del código.

### 2. ¿Qué ventajas aporta mantener las funciones de lógica puras en `catalog.js` (como `search`, `byCategory`, `sortByPrice`)?
Las funciones puras no tienen efectos secundarios (*side effects*) ni modifican los arrays originales. Devuelven siempre el mismo resultado para los mismos argumentos, lo que facilita enormemente la realización de pruebas automáticas (como las de `check.js`), previene mutaciones accidentales de los datos y hace que el código sea mucho más reutilizable.

### 3. ¿Por qué es importante el manejo de errores y estados (`loading`, `error`, `ready`) al cargar recursos externos?
Una aplicación web robusta debe informar siempre al usuario de lo que está ocurriendo. Controlar los tres estados evita que la interfaz se quede colgada o en blanco ante un fallo de red o un error en el formato de los datos, mejorando notablemente la experiencia de usuario (*UX*).

---
* **Autor:** Enol González
* **Institución:** ISLA Gaia