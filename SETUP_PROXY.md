# 🚀 SETUP PROXY BACKEND

## Problema CORS Resuelto

Gemini API no permite llamadas directas desde el navegador. Se requiere un proxy backend.

## Opciones de Deploy

### Opción 1: Desarrollo Local (Rápido)

```bash
# Instalar dependencias (solo Node.js necesario)
node proxy-server.js
```

El servidor correrá en `http://localhost:3000`

**Actualizar en index.html:**
```javascript
const PROXY_URL = 'http://localhost:3000/api/chat';
```

### Opción 2: Vercel (Recomendado - Gratis)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Actualizar en index.html:**
```javascript
const PROXY_URL = 'https://tu-proyecto.vercel.app/api/chat';
```

### Opción 3: Netlify Functions

1. Crear carpeta `netlify/functions/`
2. Mover `proxy-server.js` ahí
3. Deploy en Netlify

### Opción 4: Google Cloud Run

```bash
gcloud run deploy gemini-proxy \
  --source . \
  --platform managed \
  --allow-unauthenticated
```

## Configuración en index.html

Cambiar esta línea según tu deploy:

```javascript
// Desarrollo local
const PROXY_URL = 'http://localhost:3000/api/chat';

// Producción (ejemplo Vercel)
const PROXY_URL = 'https://liverpool-cycling-proxy.vercel.app/api/chat';
```

## Testing

1. Inicia el proxy: `node proxy-server.js`
2. Abre `index.html` en el navegador
3. Prueba el chat

## Seguridad (Producción)

Para producción, considera:
- Mover API key a variables de entorno
- Agregar rate limiting
- Implementar autenticación básica

