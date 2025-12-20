# ⚡ INSTRUCCIONES RÁPIDAS - CORS RESUELTO

## Problema
Gemini API bloquea llamadas directas desde el navegador (CORS).

## Solución
Proxy backend creado. Sigue estos pasos:

### Paso 1: Iniciar Proxy Local

```bash
cd "/Users/ricardomoncadapalafox/Liverpool Coach"
node proxy-server.js
```

Deberías ver: `🚀 Proxy server running on http://localhost:3000`

### Paso 2: Verificar index.html

Asegúrate que tenga:
```javascript
const PROXY_URL = 'http://localhost:3000/api/chat';
```

### Paso 3: Probar

1. Abre `index.html` en el navegador
2. Escribe un mensaje en el chat
3. Debería funcionar sin errores CORS

## Para Producción

### Opción A: Vercel (Más fácil)
```bash
npm i -g vercel
vercel
```
Luego actualiza `PROXY_URL` con la URL de Vercel.

### Opción B: Netlify
1. Sube `proxy-server.js` a Netlify
2. Configura como serverless function
3. Actualiza `PROXY_URL`

### Opción C: Cloud Run
```bash
gcloud run deploy gemini-proxy --source .
```

## Estado Actual

✅ Proxy creado (`proxy-server.js`)
✅ Frontend actualizado para usar proxy
✅ CORS resuelto
⏳ Necesitas iniciar el proxy para probar

