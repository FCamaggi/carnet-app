import React from 'react';

export default function IdCardPreview({ participant }) {
  const { team, name, hobby, proud, favoriteWord, message, photo } =
    participant;

  const isBlue = team === 'blue';
  const gradientClass = isBlue
    ? 'from-team-blue-start to-team-blue-end'
    : 'from-team-red-start to-team-red-end';

  const teamName = isBlue ? 'EQUIPO AZUL' : 'EQUIPO ROJO';
  const teamEmoji = isBlue ? '🔵' : '🔴';

  // Obtener iniciales del nombre
  const getInitials = () => {
    if (!name) return '?';
    const names = name.trim().split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div
        id="id-card"
        className={`w-full max-w-md bg-gradient-to-br ${gradientClass} rounded-2xl shadow-2xl p-6 text-white`}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <p className="text-xs font-semibold tracking-wider opacity-90">
            CAMAGGI GAMES
          </p>
          <h2 className="text-xl font-bold mt-1">
            {teamEmoji} {teamName}
          </h2>
        </div>

        {/* Photo Section */}
        <div className="flex justify-center mb-4">
          <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden border-4 border-white/30">
            {photo ? (
              <img
                src={photo.dataUrl}
                alt={name || 'Participante'}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-5xl font-bold text-white/80">
                {getInitials()}
              </span>
            )}
          </div>
        </div>

        {/* Name */}
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold">{name || 'Tu Nombre'}</h3>
          <p className="text-sm opacity-80">Jugador</p>
        </div>

        {/* Info Cards */}
        <div className="space-y-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
          {hobby && (
            <div className="flex items-start gap-2">
              <span className="text-lg">🎯</span>
              <div className="flex-1">
                <p className="text-xs font-semibold opacity-80">HOBBY</p>
                <p className="text-sm">{hobby}</p>
              </div>
            </div>
          )}

          {proud && (
            <div className="flex items-start gap-2">
              <span className="text-lg">⭐</span>
              <div className="flex-1">
                <p className="text-xs font-semibold opacity-80">ORGULLO</p>
                <p className="text-sm">{proud}</p>
              </div>
            </div>
          )}

          {favoriteWord && (
            <div className="flex items-start gap-2">
              <span className="text-lg">💬</span>
              <div className="flex-1">
                <p className="text-xs font-semibold opacity-80">
                  PALABRA FAVORITA
                </p>
                <p className="text-sm italic">"{favoriteWord}"</p>
              </div>
            </div>
          )}

          {message && (
            <div className="flex items-start gap-2">
              <span className="text-lg">💌</span>
              <div className="flex-1">
                <p className="text-xs font-semibold opacity-80">MENSAJE</p>
                <p className="text-sm">{message}</p>
              </div>
            </div>
          )}

          {!hobby && !proud && !favoriteWord && !message && (
            <p className="text-center text-sm opacity-60 py-2">
              Completa los campos para ver tu información aquí
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-xs opacity-70">
            ID: {Date.now().toString(36).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
