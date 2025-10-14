import React from 'react';

export default function TeamSelector({ onSelectTeam }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
          Crea tu Carnet
        </h1>
        <p className="text-center text-gray-600 mb-2 text-lg">
          Camaggi Games
        </p>
        <p className="text-center text-gray-500 mb-8">
          Selecciona tu equipo y completa los campos. Podrás descargar tu carnet cuando termines.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => onSelectTeam('blue')}
            className="flex-1 py-6 px-8 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white font-bold text-xl shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            🔵 Equipo Azul
          </button>

          <button
            onClick={() => onSelectTeam('red')}
            className="flex-1 py-6 px-8 rounded-2xl bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white font-bold text-xl shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            🔴 Equipo Rojo
          </button>
        </div>
      </div>
    </div>
  );
}
