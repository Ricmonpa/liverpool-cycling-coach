# 🔧 Configuración de API Key en Cloudflare Pages

## Nueva API Key

```
AIzaSyCt-6SVeTRNu3SiGGEq_FgSvcBF036s9YI
```

## Pasos para configurar en Cloudflare Pages

### 1. Acceder a Cloudflare Pages

1. Ve a: https://dash.cloudflare.com
2. Inicia sesión
3. En el menú lateral, click en **"Pages"**
4. Selecciona tu proyecto: **liverpool-cycling-coach**

### 2. Configurar HTML Injection

1. Click en **"Settings"** (Configuración)
2. Scroll hasta la sección **"Builds & deployments"**
3. Busca **"HTML Injection"**
4. En el campo **"Head"**, pega este código:

```html
<script>
    window.GEMINI_API_KEY = 'AIzaSyCt-6SVeTRNu3SiGGEq_FgSvcBF036s9YI';
</script>
```

5. Click en **"Save"** (Guardar)

### 3. Verificar deployment

1. Ve a la pestaña **"Deployments"**
2. Deberías ver un nuevo deployment en progreso
3. Espera 1-2 minutos
4. El sitio se actualizará automáticamente

### 4. Probar el banner

1. Ve a tu sitio: `https://cycling-liverpool.pottential.site` (o tu URL de Pages)
2. Abre la consola del navegador (F12)
3. Verifica que no haya errores de `GEMINI_API_KEY`
4. Envía un mensaje en el chat
5. Verifica que el AI responda correctamente

## ✅ Checklist

- [x] API Key rotada en Google Cloud
- [x] Restricciones HTTP referrers agregadas
- [x] Nueva key obtenida
- [ ] Key configurada en Cloudflare Pages (HTML Injection)
- [ ] Deployment verificado
- [ ] Banner probado y funcionando

## 🔒 Seguridad

- ✅ La key NO está en el código fuente
- ✅ La key está configurada de forma segura en Cloudflare
- ✅ Solo funciona en los dominios configurados en Google Cloud

## Troubleshooting

### El banner no funciona

1. Verifica en la consola del navegador:
   - Debe aparecer: `window.GEMINI_API_KEY` definida
   - No debe aparecer: `⚠️ GEMINI_API_KEY no está configurada`

2. Verifica en Cloudflare:
   - HTML Injection está guardado
   - El deployment se completó exitosamente

3. Verifica en Google Cloud:
   - Las restricciones HTTP referrers están guardadas
   - La key está activa

### Error 403 en Gemini API

- Verifica que las restricciones HTTP referrers incluyan tu dominio
- Espera 5 minutos después de guardar las restricciones (pueden tardar en aplicarse)

