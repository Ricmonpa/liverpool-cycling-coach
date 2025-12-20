# ⚡ INICIO RÁPIDO

## El proxy server debe estar corriendo

### Opción 1: Script Automático (Recomendado)

```bash
cd "/Users/ricardomoncadapalafox/Liverpool Coach"
./start-proxy.sh
```

### Opción 2: Manual

```bash
cd "/Users/ricardomoncadapalafox/Liverpool Coach"
node proxy-server.js
```

## ✅ Verificación

Deberías ver:
```
🚀 Proxy server running on http://localhost:3000
📡 Endpoint: http://localhost:3000/api/chat
```

## 🧪 Probar

1. **Mantén el proxy corriendo** (no cierres la terminal)
2. Abre `index.html` en tu navegador
3. Escribe un mensaje en el chat
4. Debería funcionar sin errores CORS

## ⚠️ IMPORTANTE

- El proxy debe estar corriendo **antes** de abrir el banner
- No cierres la terminal donde corre el proxy
- Si ves `ERR_CONNECTION_REFUSED`, el proxy no está corriendo

## 🚀 Para Producción

Una vez que funcione localmente, deploya el proxy en:
- Vercel (más fácil)
- Netlify
- Google Cloud Run

Luego actualiza `PROXY_URL` en `index.html` con la URL de producción.

