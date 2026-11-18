# Code Studio

IDE web independiente, con una experiencia híbrida inspirada en VS Code. No depende de LUIS OS.

## Funciones

- Editor Monaco con resaltado, autocompletado básico del lenguaje, minimapa, múltiples pestañas y atajos.
- Explorador de archivos, creación de carpetas, importación de archivos y carpetas.
- Búsqueda de texto en todos los archivos del proyecto.
- Vista previa HTML que integra el CSS y JavaScript hermanos del archivo HTML.
- Vista dividida para editar y previsualizar a la vez.
- Ejecución Python mediante Pyodide/WebAssembly en un Web Worker.
- Consola con comandos locales de gestión del proyecto.
- Plantillas web, Python, React por CDN y JSON.
- Importación de repositorios públicos de GitHub.
- Exportación del proyecto completo a ZIP.
- Guardado automático en el almacenamiento local del navegador.
- Tema claro/oscuro y paleta de comandos.

## Atajos

- Ctrl + S: guardar.
- Ctrl + Enter: ejecutar el archivo activo.
- Ctrl + Shift + P: abrir la paleta de comandos.

## Publicar en Cloudflare Pages

Repositorio estático: no necesita framework ni comando de build. Conecta este repositorio a Cloudflare Pages y usa la raíz del repositorio como directorio de salida.

## Límites técnicos

- Es una aplicación estática. La consola implementa comandos propios del IDE; **no es una terminal Linux** y no ejecuta comandos del sistema.
- Python se ejecuta con Pyodide en WebAssembly, no en CPython del sistema. Algunos paquetes con extensiones nativas no funcionan.
- La importación de GitHub está limitada a repositorios públicos y a los límites de la API de GitHub. No hace push ni commit remoto.
- El guardado local permanece en el navegador y perfil donde se creó el proyecto. Exporta ZIP para crear copias de seguridad.
- Monaco, JSZip y Pyodide se descargan de CDN; se necesita conexión a Internet.
- La vista previa usa un iframe aislado. Algunas funciones que requieren servidor, módulos ES servidos por HTTP o APIs restringidas no funcionarán desde srcdoc.
- No incluye un backend ni un depurador completo de procesos.
