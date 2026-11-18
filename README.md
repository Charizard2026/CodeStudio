# Code Studio

IDE web independiente con una interfaz oscura inspirada en LUIS OS.

## Funciones
- Editor Monaco, el mismo proyecto de editor que utiliza VS Code.
- Archivos Python, HTML, CSS y JavaScript.
- Ejecución Python con Pyodide en un Web Worker.
- Vista previa HTML aislada en iframe.
- Pestañas, creación e importación de archivos, guardado local y exportación de archivos.

## Publicar en Cloudflare Pages
Este repositorio contiene Code Studio como sitio estático independiente, separado de LUIS OS.

1. Crea un proyecto Cloudflare Pages conectado al repositorio.
2. Deja **Root directory (advanced)** en `/` (raíz del repositorio).
3. No requiere comando de build ni carpeta de salida: es una web estática.
4. Asigna el subdominio que prefieras al nuevo proyecto.

## Limitaciones
- Monaco y Pyodide se cargan desde CDN, por lo que necesitan conexión.
- Python se ejecuta en Pyodide/WebAssembly, no en CPython del sistema.
- No hay terminal Linux real ni acceso directo e ilimitado al disco.
- Algunos paquetes nativos de Python no son compatibles con Pyodide.
