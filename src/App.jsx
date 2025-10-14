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
    hobby: '',
    proud: '',
    favoriteWord: '',
    message: '',
    photo: null,
  });

  const [showToast, setShowToast] = useState(false);

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
    if (confirm('¿Estás seguro de que quieres reiniciar? Se perderán todos los datos.')) {
      setParticipant({
        team: null,
        name: '',
        hobby: '',
        proud: '',
        favoriteWord: '',
        message: '',
        photo: null,
      });
    }
  };

  const handleDownloadPNG = async () => {
    if (!participant.name.trim()) {
      alert('Por favor ingresa tu nombre antes de descargar');
      return;
    }

    await downloadAsPNG('id-card', `carnet-${participant.name.replace(/\s+/g, '-')}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleExportJSON = () => {
    if (!participant.name.trim()) {
      alert('Por favor ingresa tu nombre antes de exportar');
      return;
    }

    exportAsJSON(participant, `carnet-${participant.name.replace(/\s+/g, '-')}`);
  };

  // Calcular progreso
  const calculateProgress = () => {
    const fields = [
      participant.name,
      participant.hobby,
      participant.proud,
      participant.favoriteWord,
      participant.message,
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

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Crea tu Carnet - Camaggi Games
          </h1>
          <p className="text-gray-600">
            {participant.team === 'blue' ? '🔵 Equipo Azul' : '🔴 Equipo Rojo'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progreso</span>
            <span className="text-sm font-medium text-gray-700">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                participant.team === 'blue' ? 'bg-blue-500' : 'bg-red-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
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
                📥 Descargar PNG
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
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Vista Previa
            </h2>
            <IdCardPreview participant={participant} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>© 2025 Camaggi Games · Hecho con ❤️</p>
        </div>
      </div>
    </div>
  );
}

export default App;
