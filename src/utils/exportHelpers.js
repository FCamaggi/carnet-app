import html2canvas from 'html2canvas';

export async function downloadAsPNG(elementId, filename = 'carnet') {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
    });

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = url;
    link.click();
  } catch (error) {
    console.error('Error al exportar:', error);
    alert('Error al descargar la imagen');
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
