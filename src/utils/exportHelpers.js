import html2canvas from 'html2canvas';

export async function downloadAsPNG(elementId, filename = 'carnet') {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Forzar dimensiones fijas para la exportación
    const originalWidth = element.style.width;
    const originalHeight = element.style.height;
    element.style.width = '400px';
    element.style.height = '600px';

    try {
        const canvas = await html2canvas(element, {
            backgroundColor: null,
            scale: 3, // Mayor escala para mejor calidad (1200x1800px final)
            useCORS: true,
            width: 400,
            height: 600,
            logging: false,
            allowTaint: true,
            imageTimeout: 0,
            // Configuración para evitar compresión y mantener calidad
            windowWidth: 400,
            windowHeight: 600,
        });

        // Usar PNG sin compresión para máxima calidad
        const url = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = url;
        link.click();
    } catch (error) {
        console.error('Error al exportar:', error);
        alert('Error al descargar la imagen');
    } finally {
        // Restaurar dimensiones originales
        element.style.width = originalWidth;
        element.style.height = originalHeight;
    }
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
