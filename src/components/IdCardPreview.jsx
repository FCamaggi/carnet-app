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
        style={{ width: 400, height: 600 }}
        className={`relative bg-gradient-to-br ${gradientClass} rounded-2xl shadow-2xl p-5 text-white overflow-hidden`}
      >
        {/* Patrón de ondas sutiles en el fondo */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="waves"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 50 Q25 30, 50 50 T100 50"
                stroke="white"
                strokeWidth="2"
                fill="none"
                opacity="0.3"
              />
              <path
                d="M0 70 Q25 50, 50 70 T100 70"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
                opacity="0.2"
              />
              <path
                d="M0 30 Q25 10, 50 30 T100 30"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
                opacity="0.2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#waves)" />
        </svg>

        {/* Decoración circular adicional */}
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 transform -translate-x-12 translate-y-12"></div>

        {/* Contenido principal */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header con logo */}
          <div className="text-center mb-3">
            <div className="flex justify-center items-center gap-2 mb-1">
              <p className="text-xs font-semibold tracking-wider opacity-90">
                CAMAGGI GAMES
              </p>
            </div>
            <h2 className="text-lg font-bold">
              {teamEmoji} {teamName}
            </h2>
          </div>

          {/* Photo Section - MÁS GRANDE */}
          <div className="flex justify-center mb-3">
            <div className="w-40 h-40 rounded-full bg-white/20 backdrop-blur-sm overflow-hidden border-4 border-white shadow-xl relative">
              {photo ? (
                <img
                  src={photo.dataUrl}
                  alt={name || 'Participante'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl font-bold text-white/80 leading-none">
                    {getInitials()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Name */}
          <div className="text-center mb-3">
            <h3 className="text-xl font-bold drop-shadow-lg leading-tight">
              {name || 'Tu Nombre'}
            </h3>
            <p className="text-xs opacity-90 font-medium">Jugador</p>
          </div>

          {/* Info Cards - SIN SCROLL, espaciado compacto */}
          <div className="space-y-2 bg-white/10 backdrop-blur-sm rounded-xl p-3">
            {hobby && (
              <div className="flex items-start gap-2">
                <span className="text-base flex-shrink-0">🎯</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold opacity-80">HOBBY</p>
                  <p className="text-xs leading-snug break-words">{hobby}</p>
                </div>
              </div>
            )}

            {proud && (
              <div className="flex items-start gap-2">
                <span className="text-base flex-shrink-0">⭐</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold opacity-80">ORGULLO</p>
                  <p className="text-xs leading-snug break-words">{proud}</p>
                </div>
              </div>
            )}

            {favoriteWord && (
              <div className="flex items-start gap-2">
                <span className="text-base flex-shrink-0">💬</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold opacity-80">
                    PALABRA FAVORITA
                  </p>
                  <p className="text-xs leading-snug italic break-words">
                    "{favoriteWord}"
                  </p>
                </div>
              </div>
            )}

            {message && (
              <div className="flex items-start gap-2">
                <span className="text-base flex-shrink-0">✉️</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold opacity-80">MENSAJE</p>
                  <p className="text-xs leading-snug break-words">
                    {message}
                  </p>
                </div>
              </div>
            )}

            {!hobby && !proud && !favoriteWord && !message && (
              <p className="text-center text-xs opacity-60 py-2">
                Completa los campos para ver tu información aquí
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-3 text-center">
            <p className="text-xs opacity-70">
              ID: {Date.now().toString(36).toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
