import React from 'react';

export default function IdCardPreview({ participant }) {
  const { team, name, nickname, hobby, proud, favoriteWord, photo } =
    participant;

  const isBlue = team === 'blue';
  const gradientClass = isBlue
    ? 'from-team-blue-start to-team-blue-end'
    : 'from-team-red-start to-team-red-end';

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
        style={{ width: 500, height: 600 }}
        className={`relative bg-gradient-to-br ${gradientClass} rounded-2xl shadow-2xl p-6 text-white overflow-hidden`}
      >
        {/* Patrón geométrico moderno en el fondo */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Patrón de hexágonos */}
            <pattern
              id="hexagons"
              x="0"
              y="0"
              width="60"
              height="52"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M15 0 L45 0 L60 26 L45 52 L15 52 L0 26 Z"
                stroke="white"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
              />
            </pattern>
            {/* Patrón de círculos concéntricos */}
            <pattern
              id="circles"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="40"
                cy="40"
                r="15"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
                opacity="0.2"
              />
              <circle
                cx="40"
                cy="40"
                r="25"
                stroke="white"
                strokeWidth="1"
                fill="none"
                opacity="0.15"
              />
              <circle
                cx="40"
                cy="40"
                r="35"
                stroke="white"
                strokeWidth="0.5"
                fill="none"
                opacity="0.1"
              />
            </pattern>
            {/* Gradiente radial para efecto de profundidad */}
            <radialGradient id="spotlight" cx="50%" cy="20%">
              <stop offset="0%" stopColor="white" stopOpacity="0.15" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
          <rect width="100%" height="100%" fill="url(#circles)" />
          <rect width="100%" height="100%" fill="url(#spotlight)" />
        </svg>

        {/* Decoración con formas geométricas modernas */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/10 transform translate-x-20 -translate-y-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white/10 transform -translate-x-16 translate-y-16 blur-2xl"></div>

        {/* Puntos decorativos distribuidos por toda la tarjeta */}
        {/* Esquina superior derecha */}
        <div className="absolute top-8 right-12 w-3 h-3 rounded-full bg-white/35"></div>
        <div className="absolute top-16 right-8 w-2 h-2 rounded-full bg-white/30"></div>
        <div className="absolute top-12 right-20 w-2.5 h-2.5 rounded-full bg-white/25"></div>
        <div className="absolute top-20 right-16 w-1.5 h-1.5 rounded-full bg-white/40"></div>

        {/* Esquina superior izquierda */}
        <div className="absolute top-10 left-10 w-2.5 h-2.5 rounded-full bg-white/30"></div>
        <div className="absolute top-16 left-16 w-2 h-2 rounded-full bg-white/35"></div>
        <div className="absolute top-24 left-12 w-1.5 h-1.5 rounded-full bg-white/25"></div>

        {/* Lado derecho medio */}
        <div className="absolute top-1/3 right-8 w-3 h-3 rounded-full bg-white/40"></div>
        <div className="absolute top-1/2 right-12 w-2 h-2 rounded-full bg-white/35"></div>
        <div className="absolute top-2/3 right-10 w-2.5 h-2.5 rounded-full bg-white/30"></div>
        <div className="absolute" style={{ top: '45%', right: '20px' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-white/25"></div>
        </div>

        {/* Lado izquierdo medio */}
        <div className="absolute top-1/3 left-12 w-2 h-2 rounded-full bg-white/35"></div>
        <div className="absolute top-1/2 left-8 w-2.5 h-2.5 rounded-full bg-white/30"></div>
        <div className="absolute top-2/3 left-14 w-2 h-2 rounded-full bg-white/40"></div>
        <div className="absolute" style={{ top: '55%', left: '24px' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-white/25"></div>
        </div>

        {/* Esquina inferior derecha */}
        <div className="absolute bottom-12 right-10 w-2.5 h-2.5 rounded-full bg-white/35"></div>
        <div className="absolute bottom-16 right-14 w-2 h-2 rounded-full bg-white/30"></div>
        <div className="absolute bottom-20 right-8 w-3 h-3 rounded-full bg-white/40"></div>
        <div className="absolute bottom-24 right-16 w-1.5 h-1.5 rounded-full bg-white/25"></div>

        {/* Esquina inferior izquierda */}
        <div className="absolute bottom-10 left-10 w-2.5 h-2.5 rounded-full bg-white/30"></div>
        <div className="absolute bottom-16 left-14 w-2 h-2 rounded-full bg-white/35"></div>
        <div className="absolute bottom-20 left-8 w-2 h-2 rounded-full bg-white/25"></div>

        {/* Puntos centrales dispersos */}
        <div className="absolute" style={{ top: '30%', left: '45%' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
        </div>
        <div className="absolute" style={{ top: '60%', left: '75%' }}>
          <div className="w-2 h-2 rounded-full bg-white/25"></div>
        </div>
        <div className="absolute" style={{ top: '40%', left: '20%' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
        </div>
        <div className="absolute" style={{ top: '70%', left: '30%' }}>
          <div className="w-2 h-2 rounded-full bg-white/25"></div>
        </div>

        {/* Contenido principal */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header con logo */}
          <div className="text-center mb-4"></div>

          {/* Photo Section - MÁS GRANDE */}
          <div className="flex justify-center mb-5">
            <div className="w-44 h-44 rounded-full bg-white/20 backdrop-blur-sm overflow-hidden border-4 border-white shadow-xl relative">
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
          <div className="text-center mb-5">
            <h3 className="text-2xl font-bold drop-shadow-lg leading-tight">
              {name || 'Tu Nombre'}
            </h3>
          </div>

          {/* Info Cards - Mejor espaciado */}
          <div className="space-y-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
            {nickname && (
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0">😎</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold opacity-80 mb-1">APODO</p>
                  <p className="text-sm leading-relaxed break-words">
                    {nickname}
                  </p>
                </div>
              </div>
            )}

            {hobby && (
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0">🎯</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold opacity-80 mb-1">HOBBY</p>
                  <p className="text-sm leading-relaxed break-words">{hobby}</p>
                </div>
              </div>
            )}

            {proud && (
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0">⭐</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold opacity-80 mb-1">
                    ORGULLO
                  </p>
                  <p className="text-sm leading-relaxed break-words">{proud}</p>
                </div>
              </div>
            )}

            {favoriteWord && (
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0">💬</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold opacity-80 mb-1">
                    PALABRA O FRASE FAVORITA
                  </p>
                  <p className="text-sm leading-relaxed italic break-words">
                    "{favoriteWord}"
                  </p>
                </div>
              </div>
            )}

            {!nickname && !hobby && !proud && !favoriteWord && (
              <p className="text-center text-xs opacity-60 py-2">
                Completa los campos para ver tu información aquí
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-4 text-center">
            <p className="text-sm opacity-70">
              ID: {Date.now().toString(36).toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
