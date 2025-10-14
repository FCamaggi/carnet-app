#!/bin/bash

echo "🔍 Verificando configuración de Tailwind CSS..."
echo ""

# Verificar que Tailwind está instalado
if npm list tailwindcss > /dev/null 2>&1; then
    echo "✅ Tailwind CSS instalado"
else
    echo "❌ Tailwind CSS NO instalado"
    exit 1
fi

# Verificar archivos de configuración
if [ -f "tailwind.config.js" ]; then
    echo "✅ tailwind.config.js existe"
else
    echo "❌ tailwind.config.js NO existe"
fi

if [ -f "postcss.config.js" ]; then
    echo "✅ postcss.config.js existe"
else
    echo "❌ postcss.config.js NO existe"
fi

# Verificar directivas en CSS
if grep -q "@tailwind" src/index.css; then
    echo "✅ Directivas @tailwind encontradas en src/index.css"
else
    echo "❌ Directivas @tailwind NO encontradas"
fi

echo ""
echo "🎨 Configuración verificada. Los estilos deberían funcionar correctamente."
echo "📍 Abre http://localhost:5173/ en tu navegador"
