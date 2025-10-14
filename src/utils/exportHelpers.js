import html2canvas from 'html2canvas';

export async function downloadAsPNG(elementId, filename = 'carnet') {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Forzar dimensiones fijas para la exportación
    const originalWidth = element.style.width;
    const originalHeight = element.style.height;
    const originalTransform = element.style.transform;
    
    element.style.width = '500px';
    element.style.height = '600px';
    element.style.transform = 'scale(1)';

    // Esperar un momento para que el navegador actualice el DOM
    await new Promise(resolve => setTimeout(resolve, 100));

    try {
        const canvas = await html2canvas(element, {
            backgroundColor: '#ffffff',
            scale: 3,
            useCORS: true,
            allowTaint: false,
            foreignObjectRendering: true,
            imageTimeout: 0,
            logging: false,
            width: 500,
            height: 600,
            windowWidth: 500,
            windowHeight: 600,
            x: 0,
            y: 0,
            scrollX: 0,
            scrollY: 0,
            // Mejoras para captura de estilos complejos
            onclone: (clonedDoc) => {
                const clonedElement = clonedDoc.getElementById(elementId);
                if (clonedElement) {
                    clonedElement.style.width = '500px';
                    clonedElement.style.height = '600px';
                    clonedElement.style.transform = 'scale(1)';
                    clonedElement.style.position = 'relative';
                }
            }
        });

        // Convertir canvas a blob
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png', 1.0));
        
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
    } finally {
        // Restaurar dimensiones originales
        element.style.width = originalWidth;
        element.style.height = originalHeight;
        element.style.transform = originalTransform;
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
