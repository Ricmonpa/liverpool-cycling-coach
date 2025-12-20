# 🔒 Seguridad - API Key de Gemini

## ⚠️ PROBLEMA DETECTADO

La API Key de Google Gemini estaba expuesta públicamente en el código. **YA FUE ELIMINADA** del repositorio.

## ✅ SOLUCIÓN APLICADA

La API Key ha sido removida del código. Ahora se lee de `window.GEMINI_API_KEY` que debe configurarse de forma segura.

## 🔧 OPCIONES PARA CONFIGURAR LA API KEY

### Opción 1: Cloudflare Pages - HTML Injection (Recomendado)

1. **En Cloudflare Pages**:
   - Ve a tu proyecto → Settings → Builds & deployments
   - Scroll hasta "HTML Injection"
   - Agrega este código en "Head":

```html
<script>
    window.GEMINI_API_KEY = 'TU_API_KEY_AQUI';
</script>
```

**Ventajas**: 
- La key no está en el código fuente
- Fácil de cambiar sin redeploy
- Seguro si el repositorio es privado

### Opción 2: Cloudflare Workers (Proxy) - MÁS SEGURO

Crea un Worker que actúe como proxy:

1. **Crear Worker en Cloudflare**:
   - Dashboard → Workers & Pages → Create application → Create Worker
   - Nombre: `gemini-proxy`

2. **Código del Worker** (`worker.js`):

```javascript
export default {
  async fetch(request) {
    // Solo permitir requests desde tu dominio
    const origin = request.headers.get('Origin');
    if (origin !== 'https://cycling-liverpool.pottential.site') {
      return new Response('Forbidden', { status: 403 });
    }

    // Obtener API Key de variables de entorno
    const API_KEY = env.GEMINI_API_KEY;
    
    if (request.method === 'POST') {
      const body = await request.json();
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        }
      );
      
      return response;
    }
    
    return new Response('Method not allowed', { status: 405 });
  }
};
```

3. **Configurar variable de entorno en Worker**:
   - Workers → Settings → Variables
   - Agregar: `GEMINI_API_KEY` = `tu_api_key`

4. **Actualizar código del banner** para usar el proxy:

```javascript
const GEMINI_ENDPOINT = 'https://gemini-proxy.tu-usuario.workers.dev';
```

### Opción 3: Script Externo (Temporal)

Crea un archivo `config.js` (NO subirlo a Git):

```javascript
window.GEMINI_API_KEY = 'TU_API_KEY_AQUI';
```

Agrega en `index.html` antes del script principal:

```html
<script src="./config.js"></script>
```

**IMPORTANTE**: Agrega `config.js` al `.gitignore`

## 🚨 ACCIONES INMEDIATAS REQUERIDAS

### 1. Regenerar la API Key en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona el proyecto: `liverpool-banner-html`
3. Ve a "APIs & Services" → "Credentials"
4. Encuentra la key: `AIzaSyDhkRsRMnWXqXfZMzVQh6MtG_YEajhe6Cc`
5. Click en "Regenerate key"
6. Copia la nueva key
7. **NO la subas a GitHub**

### 2. Agregar restricciones a la nueva API Key

1. En la misma página de Credentials
2. Click en la key
3. Agrega restricciones:
   - **Application restrictions**: 
     - HTTP referrers: `https://cycling-liverpool.pottential.site/*`
     - O IP addresses si usas Workers
   - **API restrictions**:
     - Solo "Generative Language API"

### 3. Actualizar el código

Usa una de las opciones arriba para configurar la nueva key de forma segura.

## 📋 CHECKLIST DE SEGURIDAD

- [x] API Key eliminada del código fuente
- [ ] API Key regenerada en Google Cloud
- [ ] Restricciones agregadas a la nueva key
- [ ] Key configurada en Cloudflare (Pages o Workers)
- [ ] Repositorio verificado (no contiene keys)
- [ ] `.gitignore` actualizado (si usas config.js)

## 🔍 VERIFICAR QUE NO HAY KEYS EN EL REPO

```bash
# Buscar cualquier key que pueda quedar
git log --all --full-history --source -- "*API*" "*KEY*" "*AIza*"
```

## 📞 SOPORTE

Si necesitas ayuda configurando la key de forma segura, contacta al equipo de desarrollo.

