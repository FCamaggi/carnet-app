import React from 'react';

export default function PhotoUploader({ photo, onPhotoChange }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen válida');
      return;
    }

    // Validar tamaño (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no debe superar los 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onPhotoChange({
        dataUrl: reader.result,
        filename: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Foto (opcional)
      </label>
      <div className="flex items-center gap-4">
        {photo && (
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300">
            <img
              src={photo.dataUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <label className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
          <span className="text-sm text-gray-700">
            {photo ? 'Cambiar foto' : '📷 Subir foto'}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        JPEG o PNG, máximo 5MB
      </p>
    </div>
  );
}
