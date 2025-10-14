import React from 'react';

export default function FormFields({ participant, onChange }) {
  const handleChange = (field, value) => {
    // Limitar caracteres - reducido para que quepa mejor en el carnet
    const limits = {
      name: 40,
      hobby: 50,
      proud: 50,
      favoriteWord: 30,
      message: 80
    };
    
    if (value.length > limits[field]) {
      return;
    }
    onChange(field, value);
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nombre <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={participant.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Tu nombre completo"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          {participant.name.length}/40 caracteres
        </p>
      </div>

      <div>
        <label
          htmlFor="hobby"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Hobby
        </label>
        <input
          id="hobby"
          type="text"
          value={participant.hobby}
          onChange={(e) => handleChange('hobby', e.target.value)}
          placeholder="¿Qué te gusta hacer?"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">
          {participant.hobby.length}/50 caracteres
        </p>
      </div>

      <div>
        <label
          htmlFor="proud"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Algo de lo que estés orgulloso
        </label>
        <input
          id="proud"
          type="text"
          value={participant.proud}
          onChange={(e) => handleChange('proud', e.target.value)}
          placeholder="Tu logro más importante 🙂"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">
          {participant.proud.length}/50 caracteres
        </p>
      </div>

      <div>
        <label
          htmlFor="favoriteWord"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Palabra o frase favorita
        </label>
        <input
          id="favoriteWord"
          type="text"
          value={participant.favoriteWord}
          onChange={(e) => handleChange('favoriteWord', e.target.value)}
          placeholder="Algo que te inspire o represente"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">
          {participant.favoriteWord.length}/30 caracteres
        </p>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Mensaje para el anfitrión
        </label>
        <textarea
          id="message"
          value={participant.message}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder="Escribe un mensaje especial... 🧐"
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">
          {participant.message.length}/80 caracteres
        </p>
      </div>
    </div>
  );
}
