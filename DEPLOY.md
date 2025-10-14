# 🚀 Guía Rápida de Deploy en Netlify

## Opción 1: Deploy Directo (Más Rápido) 🎯

### Paso 1: Crear el build
```bash
cd /home/fabrizio/code/cumpleaños/actividades/Identificacion/carnet-app
npm run build
```

### Paso 2: Deploy con Netlify Drop
1. Ve a [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Arrastra la carpeta `dist` al área de drop
3. ¡Listo! Tu sitio estará publicado en segundos

---

## Opción 2: Netlify CLI 💻

### Instalación
```bash
# Instalar Netlify CLI globalmente
npm install -g netlify-cli

# Iniciar sesión
netlify login
```

### Deploy
```bash
# Desde la carpeta del proyecto
cd /home/fabrizio/code/cumpleaños/actividades/Identificacion/carnet-app

# Deploy de prueba
netlify deploy

# Deploy a producción
netlify deploy --prod
```

Cuando te pregunte:
- **Publish directory:** escribe `dist` y presiona Enter

---

## Opción 3: GitHub + Netlify (Recomendado para actualizaciones) 🔄

### Paso 1: Subir a GitHub
```bash
cd /home/fabrizio/code/cumpleaños/actividades/Identificacion/carnet-app

# Inicializar git (si no está inicializado)
git init

# Agregar archivos
git add .
git commit -m "Initial commit - Carnet App"

# Crear repositorio en GitHub y conectar
git remote add origin https://github.com/TU_USUARIO/carnet-app.git
git branch -M main
git push -u origin main
```

### Paso 2: Conectar con Netlify
1. Ve a [https://app.netlify.com](https://app.netlify.com)
2. Click en "Add new site" > "Import an existing project"
3. Selecciona "GitHub"
4. Busca y selecciona tu repositorio `carnet-app`
5. Configura:
   - **Branch to deploy:** `main`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click en "Deploy site"

### Ventajas
- ✅ Auto-deploy en cada push
- ✅ Preview de Pull Requests
- ✅ Rollback fácil
- ✅ SSL automático

---

## 🎉 ¡Tu Sitio Está Listo!

Netlify te dará una URL como: `https://random-name-123.netlify.app`

### Personalizar el Nombre
1. Ve a "Site settings" en el dashboard de Netlify
2. Click en "Change site name"
3. Elige un nombre único: `camaggi-games-carnet.netlify.app`

---

## 🔧 Solución de Problemas

### Error: "Command not found: npm"
```bash
# Asegúrate de tener Node.js instalado
node --version
npm --version
```

### Error en el build
```bash
# Limpia node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
npm run build
```

### La app no carga imágenes
- Asegúrate de que las imágenes estén en la carpeta `public/`
- Usa rutas relativas en el código

---

## 📱 Compartir la App

Una vez deployada, comparte el link con los participantes:
```
https://tu-sitio.netlify.app
```

¡Todos pueden acceder desde su celular o computadora!

---

**Nota:** La versión gratuita de Netlify es perfecta para este proyecto.
No necesitas configuración adicional. 🎊
