# Validación de la fase de diseño — 10-10-2026

Esta validación comprueba la maqueta y la viabilidad del formato offline. **La dirección base fue aprobada por Sergi («me encanta»); se ha realizado la revisión GTA solicitada.** No equivale a validar una aplicación completa ni a confirmar su publicación.

## Resultados

- TypeScript estricto y build de Vite aprobados.
- Instalación con lockfile; npm informó cero vulnerabilidades al instalar.
- Auditoría: 43 originales, 41 imágenes + 2 vídeos; todas las imágenes abren y ambos vídeos se decodifican completos sin errores. SHA-256 de los 43 originales y de la nueva grabación fuente de música verificado tras los cambios, sin modificaciones. La grabación musical se registra aparte del inventario de aventuras.
- Navegación visual: apertura del expediente, todas las secciones conceptuales, fichas, visor de fotografía, cierre por Escape y botón; menú móvil y acceso al caso de Kili aprobados.
- Navegador Chromium aislado: 1440, 390 y 320 px, sin desbordamiento horizontal y con imágenes y fuente local cargadas.
- Axe: nueve comprobaciones —acceso, archivo y diálogo del novio en cada ancho— con **cero infracciones detectadas** para WCAG A/AA seleccionadas. Esto no sustituye una auditoría manual completa.
- ZIP de maqueta: descarga desde el botón real comprobada; CRC de todos sus miembros correcto.
- Offline: ZIP extraído a `/tmp/Los Cerdas - copia sin Internet/`, ruta cambiada y con espacios; `index.html` abierto mediante `file://` en contexto sin red y sin caché de la sesión online. JavaScript, fotos y fuente local funcionan; **cero peticiones HTTP/HTTPS** y ningún error JavaScript.
- Música: MP3 completo decodificado sin errores; reproducción local tras interacción, pausa/reanudación, volumen inicial 28 %, repetición, respeto al silencio elegido y degradación si falta el audio. Probado también sin red desde file://.
- 62 comprobaciones funcionales aprobadas en la revisión actual, además de las nueve revisiones axe.
- Capturas desktop/móvil inspeccionadas. Corregidos contraste del rojo en texto pequeño y altura de las fotos con dimensiones HTML en móvil.

Evidencia: `evidence/qa-report.json`, `gate-1440.png`, `gate-390.png`, `gate-320.png`, `archive-1440.png`, `archive-390.png`, `archive-320.png`, `offline.png`. Se recurrió a QA aislada porque el navegador integrado devolvió «No browser is available» y su lista estaba vacía. No se usó ninguna sesión personal del navegador.

## Alcance real de la entrega

`public/downloads/los-cerdas-maqueta-offline.zip` contiene siete fotografías de muestra, cuatro retratos, el MP3, la fuente con licencia, el HTML y los bundles. Pesa **4722653 bytes (4,72 MB)**. No contiene los 43 originales ni los dos vídeos; el paquete completo de recuerdos queda para la siguiente fase de implementación.

No hay cronología editorial definitiva, autenticación, vídeos convertidos, secretos funcionales ni publicación. La vista de cada sección presenta su propuesta de experiencia. Las fechas permanecen sin confirmar y las identidades solo proceden de instrucciones explícitas de Sergi.

## Pendientes antes de entregar el regalo

Relatos y fechas reales; selección online/privada; prueba de la aplicación y medios completos en el dispositivo del novio, Safari/Firefox y móviles físicos. También quedan por verificar el peso final y los límites/configuración del hosting gratuito elegido.
