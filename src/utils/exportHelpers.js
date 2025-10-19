import { domToPng } from 'modern-screenshot';

export async function downloadAsPNG(elementId, filename = 'carnet') {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        // Obtener las dimensiones reales del elemento
        const rect = element.getBoundingClientRect();

        // Configuración optimizada para modern-screenshot
        const dataUrl = await domToPng(element, {
            quality: 1.0,
            scale: 3, // Alta resolución: 1500x1500px
            width: rect.width, // Usar el ancho real del elemento
            height: rect.height, // Usar el alto real del elemento
            // Opciones adicionales para mejor calidad
            debug: false,
            features: {
                // Deshabilitar clonación de iframes
                removeControlCharacter: true,
            }
        });

        // Convertir dataUrl a blob
        const response = await fetch(dataUrl);
        const blob = await response.blob();

        // Crear el archivo
        const file = new File([blob], `${filename}.png`, {
            type: 'image/png',
            lastModified: Date.now()
        });

        // Intentar compartir si el navegador lo soporta
        if (navigator.share) {
            try {
                // Intentar compartir directamente
                await navigator.share({
                    files: [file],
                    title: 'Mi Carnet - Camaggi Games',
                    text: 'Mi carnet para Camaggi Games'
                });
                return; // Éxito, salir
            } catch (shareError) {
                // Si el usuario cancela, salir sin hacer nada
                if (shareError.name === 'AbortError') {
                    return;
                }
                // Si hay error de tipo NotSupportedError o TypeError, intentar sin archivos
                if (shareError.name === 'NotSupportedError' || shareError.name === 'TypeError') {
                    try {
                        // Algunos navegadores no soportan compartir archivos, intentar con URL
                        const url = URL.createObjectURL(blob);
                        await navigator.share({
                            title: 'Mi Carnet - Camaggi Games',
                            text: 'Descarga mi carnet para Camaggi Games',
                            url: url
                        });
                        URL.revokeObjectURL(url);
                        return;
                    } catch (urlShareError) {
                        if (urlShareError.name === 'AbortError') {
                            return;
                        }
                        console.log('Share con URL también falló:', urlShareError);
                    }
                }
                console.log('Error al compartir:', shareError.name, shareError.message);
            }
        }

        // Fallback: descarga tradicional
        console.log('Usando descarga tradicional');
        fallbackDownload(blob, filename);
    } catch (error) {
        console.error('Error al exportar:', error);
        alert('Error al descargar la imagen');
    }
}

// Función auxiliar para descarga tradicional
function fallbackDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
}

export function exportAsJSON(data, filename = 'carnet') {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${filename}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
}
