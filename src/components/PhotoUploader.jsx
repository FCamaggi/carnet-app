import React, { useState } from 'react';
import PhotoEditor from './PhotoEditor';

export default function PhotoUploader({ photo, onPhotoChange }) {
  const [showEditor, setShowEditor] = useState(false);
  const [tempPhoto, setTempPhoto] = useState(null);

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
      // Guardar la imagen original y mostrar el editor
      setTempPhoto({
        dataUrl: reader.result,
        originalDataUrl: reader.result,
        filename: file.name,
      });
      setShowEditor(true);
    };
    reader.readAsDataURL(file);
  };

  const handleEditClick = () => {
    if (photo) {
      setTempPhoto(photo);
      setShowEditor(true);
    }
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
        <div className="flex flex-col gap-2">
          <label className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-center">
            <span className="text-sm text-gray-700">
              {photo ? '📷 Cambiar foto' : '📷 Subir foto'}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {photo && (
            <button
              onClick={handleEditClick}
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition text-sm font-medium"
            >
              ✏️ Editar posición
            </button>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">JPEG o PNG, máximo 5MB</p>

      {showEditor && tempPhoto && (
        <PhotoEditor
          photo={tempPhoto}
          onPhotoChange={(editedPhoto) => {
            onPhotoChange(editedPhoto);
            setShowEditor(false);
          }}
          onClose={() => setShowEditor(false)}
        />
      )}
    </div>
  );
}
