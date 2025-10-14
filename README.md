# Carnet de Identidad - Camaggi Games 🎮# React + Vite

Aplicación web para crear carnets digitales personalizados para los equipos Azul y Rojo de Camaggi Games.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## 🚀 CaracterísticasCurrently, two official plugins are available:

- ✨ Selección de equipo (Azul/Rojo)- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

- 📸 Upload de foto personal- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- 📝 Formulario completo: nombre, hobby, logro, palabra favorita, mensaje

- 👁️ Vista previa en tiempo real## React Compiler

- 📥 Descarga como PNG

- 💾 Exportación a JSONThe React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

- 📱 100% Responsive

- 🎨 Diseño moderno con gradientes## Expanding the ESLint configuration

## 🛠️ Stack TécnicoIf you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

- **Framework:** React 18
- **Build Tool:** Vite
- **Estilos:** Tailwind CSS
- **Export:** html2canvas
- **Deploy:** Netlify

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🌐 Deploy en Netlify

### Opción 1: Netlify CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login en Netlify
netlify login

# Deploy
netlify deploy --prod
```

### Opción 2: Netlify Web UI

1. Haz push de tu código a GitHub
2. Ve a [Netlify](https://app.netlify.com)
3. Click en "Add new site" > "Import an existing project"
4. Conecta tu repositorio de GitHub
5. Configura:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click en "Deploy site"

### Opción 3: Drag & Drop

```bash
# Crear build
npm run build

# Arrastra la carpeta 'dist' a Netlify Drop
```

## 📁 Estructura del Proyecto

```
carnet-app/
├── src/
│   ├── components/
│   │   ├── TeamSelector.jsx      # Selector de equipo
│   │   ├── IdCardPreview.jsx     # Vista previa del carnet
│   │   ├── FormFields.jsx        # Campos del formulario
│   │   └── PhotoUploader.jsx     # Subida de foto
│   ├── utils/
│   │   └── exportHelpers.js      # Funciones de exportación
│   ├── App.jsx                   # Componente principal
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Estilos globales
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── netlify.toml
```

## 🎨 Personalización

### Colores de Equipo

Edita `tailwind.config.js`:

```js
colors: {
  'team-blue-start': '#0f62fe',
  'team-blue-end': '#2aa4ff',
  'team-red-start': '#ff4d4f',
  'team-red-end': '#ff9a8b',
}
```

## 📝 Uso

1. **Selecciona tu equipo** (Azul o Rojo)
2. **Sube una foto** (opcional, máx. 5MB)
3. **Completa tus datos:**
   - Nombre (obligatorio)
   - Hobby
   - Algo de lo que estés orgulloso
   - Palabra favorita
   - Mensaje para el anfitrión
4. **Vista previa en tiempo real** del carnet
5. **Descarga** tu carnet como PNG o JSON

## 🔒 Privacidad

- 100% procesamiento en el navegador
- No se envían datos a servidores
- Sin cookies ni tracking
- Todos los datos permanecen locales

## 🤝 Contribuir

Este proyecto es para un evento privado, pero si quieres sugerir mejoras:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit tus cambios (`git commit -am 'Añade nueva característica'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abre un Pull Request

## 📄 Licencia

Proyecto privado para Camaggi Games © 2025

---

Hecho con ❤️ para Camaggi Games
