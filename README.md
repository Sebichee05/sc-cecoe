# App Cecoe

Generador de mensajes de WhatsApp para la Central de Enlace y Comunicaciones Chuquicamata.
Funciona sin base de datos y sin servidor: es HTML + CSS + JavaScript, gratis en GitHub Pages.

## Módulos
- **Inicio de Turno**: fecha larga automática, turno A–D, horario, activaciones al 327327, médico, paramédico, enfermero (opcional), operador y G.S.S.O (aparece solo fin de semana, se puede forzar).
- **Incidente Operacional, Enfermedad Común, Activación de Brigada, Simulacro, Traslado por sus medios**: fecha automática (dd/mm/aaaa) y campos del formato.

El operador se elige arriba y sirve para todos los módulos. Con **Reemplazo…** se escribe el nombre y la firma agrega **(R)**.

## Publicar en GitHub Pages
1. Crea un repositorio nuevo (por ejemplo `cecoe-app`) en GitHub.
2. Sube todos los archivos de esta carpeta (botón *Add file → Upload files*).
3. Ve a *Settings → Pages*, en *Source* elige `Deploy from a branch`, rama `main`, carpeta `/ (root)` y guarda.
4. En 1–2 minutos queda en `https://TU-USUARIO.github.io/cecoe-app/`.
5. En el celular, abre la URL y usa *Agregar a pantalla de inicio* para usarla como app (funciona sin señal).

## Cómo modificar
Todo se configura al inicio de `app.js`, en el objeto `CONFIG`:
- `operadores`: agregar o quitar nombres.
- `emergencias`: agregar un módulo nuevo (id, título, ícono) con el mismo formato.
- `camposEmergencia`: agregar o reordenar campos del mensaje.

Al publicar cambios, sube el número de versión en `sw.js` (`cecoe-v1` → `cecoe-v2`) para que los celulares tomen la versión nueva.

Los datos de médico, paramédico, enfermero, GSSO, turno y operador se recuerdan en el navegador de cada celular (no se envían a ningún lado).
