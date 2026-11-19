# Code Studio

IDE web independiente, con una experiencia híbrida inspirada en VS Code. No depende de LUIS OS.

## Funciones

- Editor Monaco con resaltado, autocompletado básico del lenguaje, minimapa, múltiples pestañas y atajos.
- Explorador de archivos, creación de carpetas, importación de archivos y carpetas.
- Búsqueda de texto en todos los archivos del proyecto, con reemplazo global y recuento de coincidencias.
- Carpetas plegables en el explorador.
- Vista previa HTML que integra el CSS y JavaScript hermanos del archivo HTML.
- Vista dividida para editar y previsualizar a la vez.
- Ejecución Python mediante Pyodide/WebAssembly en un Web Worker.
- Entrada interactiva de Python (`input()`) desde la consola del IDE mediante un canal seguro entre el navegador y el Worker.
- Consola con comandos locales de gestión del proyecto.
- Plantillas web, Python, React por CDN y JSON.
- Importación de repositorios públicos de GitHub.
- Exportación del proyecto completo a ZIP.
- Copias de seguridad JSON restaurables, además del ZIP.
- Guardado automático en el almacenamiento local del navegador.
- Tema claro/oscuro y paleta de comandos.

## Atajos

- Ctrl + S: guardar.
- Ctrl + Enter: ejecutar el archivo activo.
- Ctrl + Shift + P: abrir la paleta de comandos.
- Ctrl + Shift + F: buscar en todo el proyecto.
- Ctrl + H: abrir búsqueda y reemplazo.

## Publicar en Cloudflare Pages

Repositorio estático: no necesita framework ni comando de build. Conecta este repositorio a Cloudflare Pages y usa la raíz del repositorio como directorio de salida.

## Límites técnicos

- Es una aplicación estática. La consola implementa comandos propios del IDE; **no es una terminal Linux** y no ejecuta comandos del sistema.
- Python se ejecuta con Pyodide en WebAssembly, no en CPython del sistema. Algunos paquetes con extensiones nativas no funcionan.
- La entrada interactiva `input()` requiere aislamiento de origen. El archivo `_headers` activa COOP y COEP en Cloudflare Pages; si se usa otro alojamiento, debe configurarse `Cross-Origin-Opener-Policy: same-origin` y `Cross-Origin-Embedder-Policy: credentialless`.
- La importación de GitHub está limitada a repositorios públicos y a los límites de la API de GitHub. No hace push ni commit remoto.
- El guardado local permanece en el navegador y perfil donde se creó el proyecto. Exporta ZIP para crear copias de seguridad.
- Monaco, JSZip y Pyodide se descargan de CDN; se necesita conexión a Internet.
- La vista previa usa un iframe aislado. Algunas funciones que requieren servidor, módulos ES servidos por HTTP o APIs restringidas no funcionarán desde srcdoc.
- No incluye un backend ni un depurador completo de procesos.


## Gestión de archivos

- **Subir archivos** permite importar varios archivos sueltos.
- **Subir carpeta** importa una carpeta completa conservando su estructura relativa.
- También puedes arrastrar archivos y carpetas al área del editor.
- **Descargar** descarga el archivo activo.
- **Exportar ZIP** descarga el proyecto completo con su estructura de carpetas.
- En el explorador puedes crear carpetas, renombrar y eliminar el archivo activo.
- Los cambios se guardan localmente en el navegador. La exportación ZIP es la forma de llevar el proyecto a otro dispositivo.

Nota: esta aplicación web no tiene acceso ilimitado al disco del equipo ni sustituye una terminal del sistema operativo. La importación y exportación se realizan mediante las funciones del navegador.
