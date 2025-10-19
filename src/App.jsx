import { useState } from 'react';
import TeamSelector from './components/TeamSelector';
import PhotoUploader from './components/PhotoUploader';
import FormFields from './components/FormFields';
import IdCardPreview from './components/IdCardPreview';
import { downloadAsPNG, exportAsJSON } from './utils/exportHelpers';

function App() {
  const [participant, setParticipant] = useState({
    team: null,
    name: '',
    nickname: '',
    hobby: '',
    proud: '',
    favoriteWord: '',
    photo: null,
  });

  const [showToast, setShowToast] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleSelectTeam = (team) => {
    setParticipant({ ...participant, team });
  };

  const handleFieldChange = (field, value) => {
    setParticipant({ ...participant, [field]: value });
  };

  const handlePhotoChange = (photo) => {
    setParticipant({ ...participant, photo });
  };

  const handleReset = () => {
    if (
      confirm(
        '¿Estás seguro de que quieres reiniciar? Se perderán todos los datos.'
      )
    ) {
      setParticipant({
        team: null,
        name: '',
        nickname: '',
        hobby: '',
        proud: '',
        favoriteWord: '',
        photo: null,
      });
    }
  };

  const handleDownloadPNG = async () => {
    if (!participant.name.trim()) {
      alert('Por favor ingresa tu nombre antes de descargar');
      return;
    }

    await downloadAsPNG(
      'id-card',
      `carnet-${participant.name.replace(/\s+/g, '-')}`
    );
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleExportJSON = () => {
    if (!participant.name.trim()) {
      alert('Por favor ingresa tu nombre antes de exportar');
      return;
    }

    exportAsJSON(
      participant,
      `carnet-${participant.name.replace(/\s+/g, '-')}`
    );
  };

  // Calcular progreso
  const calculateProgress = () => {
    const fields = [
      participant.name,
      participant.nickname,
      participant.hobby,
      participant.proud,
      participant.favoriteWord,
      participant.photo,
    ];
    const completed = fields.filter(Boolean).length;
    return Math.round((completed / fields.length) * 100);
  };

  // Si no ha seleccionado equipo, mostrar selector
  if (!participant.team) {
    return <TeamSelector onSelectTeam={handleSelectTeam} />;
  }

  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          ✅ ¡Carnet descargado exitosamente!
        </div>
      )}

      <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">
            Crea tu Carnet - Camaggi Games
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs md:text-sm font-medium text-gray-700">
              Progreso
            </span>
            <span className="text-xs md:text-sm font-medium text-gray-700">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 md:h-3">
            <div
              className={`h-2 md:h-3 rounded-full transition-all duration-500 ${
                participant.team === 'blue' ? 'bg-blue-500' : 'bg-red-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
              Tus Datos
            </h2>

            <PhotoUploader
              photo={participant.photo}
              onPhotoChange={handlePhotoChange}
            />

            <FormFields
              participant={participant}
              onChange={handleFieldChange}
            />

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
              <button
                onClick={handleDownloadPNG}
                disabled={!participant.name.trim()}
                className={`w-full py-3 px-6 rounded-lg font-bold text-white shadow-lg transition-all duration-200 ${
                  participant.name.trim()
                    ? participant.team === 'blue'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500'
                      : 'bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
                  ? '📤 Compartir Carnet'
                  : '📥 Descargar PNG'}
              </button>

              <div className="flex gap-3">
                <button
                  onClick={handleExportJSON}
                  disabled={!participant.name.trim()}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium border-2 transition-all duration-200 ${
                    participant.name.trim()
                      ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      : 'border-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  💾 Exportar JSON
                </button>

                <button
                  onClick={handleReset}
                  className="flex-1 py-2 px-4 rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  🔄 Reiniciar
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 text-center">
              Vista Previa
            </h2>
            <IdCardPreview participant={participant} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>
            © 2025 Camaggi Games · Hecho con 
            <span 
              onClick={() => setShowEasterEgg(true)}
              className="cursor-pointer hover:text-red-400 transition-colors"
              title=""
            >
              ❤️
            </span>
          </p>
        </div>
      </div>

      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowEasterEgg(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-bounce"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              ¡Easter Egg Encontrado!
            </h2>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold py-3 px-6 rounded-lg mb-4">
              +3 PUNTOS
            </div>
            <p className="text-gray-600 mb-6">
              ¡Felicitaciones! Has encontrado el easter egg secreto.
              <br />
              Toma un screenshot de esta pantalla y envíalo para reclamar tus puntos.
            </p>
            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <p className="text-xs text-gray-500 mb-1">ID de Verificación</p>
              <code className="text-lg font-mono font-bold text-gray-800" id="easter-egg-code-2025">
                EGG-CAMAGGI-2025-X7K9
              </code>
            </div>
            <button
              onClick={() => setShowEasterEgg(false)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-8 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
