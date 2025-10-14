import html2canvas from 'html2canvas';

export async function downloadAsPNG(elementId, filename = 'carnet') {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Forzar dimensiones fijas para la exportación
    const originalWidth = element.style.width;
    const originalHeight = element.style.height;
    element.style.width = '500px';
    element.style.height = '600px';

    try {
        const canvas = await html2canvas(element, {
            backgroundColor: null,
            scale: 3, // Mayor escala para mejor calidad (1500x1800px final)
            useCORS: true,
            width: 500,
            height: 600,
            logging: false,
            allowTaint: true,
            imageTimeout: 0,
            // Configuración para evitar compresión y mantener calidad
            windowWidth: 500,
            windowHeight: 600,
        });

        // Convertir canvas a blob
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png', 1.0));
        
        // Detectar si es móvil y si soporta Web Share API
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const canShare = navigator.canShare && navigator.canShare({ files: [new File([blob], 'test.png', { type: 'image/png' })] });
        
        if (isMobile && canShare) {
            // En móviles: usar Web Share API para compartir/guardar
            const file = new File([blob], `${filename}.png`, { type: 'image/png' });
            try {
                await navigator.share({
                    files: [file],
                    title: 'Mi Carnet',
                    text: 'Carnet de Camaggi Games'
                });
            } catch (shareError) {
                // Si el usuario cancela el share, hacer download tradicional
                if (shareError.name !== 'AbortError') {
                    fallbackDownload(blob, filename);
                }
            }
        } else {
            // En desktop o si no soporta share: descarga tradicional
            fallbackDownload(blob, filename);
        }
    } catch (error) {
        console.error('Error al exportar:', error);
        alert('Error al descargar la imagen');
    } finally {
        // Restaurar dimensiones originales
        element.style.width = originalWidth;
        element.style.height = originalHeight;
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
