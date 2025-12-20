# Guía de Deployment - Cloudflare Pages

## Pasos para conectar Git con Cloudflare Pages

### 1. Crear repositorio en GitHub/GitLab/Bitbucket

1. Ve a GitHub.com y crea un nuevo repositorio:
   - Nombre: `liverpool-cycling-coach` (o el que prefieras)
   - Visibilidad: Privado o Público (según necesites)
   - NO inicialices con README (ya tenemos uno)

2. Copia la URL del repositorio (ej: `https://github.com/tu-usuario/liverpool-cycling-coach.git`)

### 2. Conectar repositorio local con remoto

```bash
# Agregar remote (reemplaza con tu URL)
git remote add origin https://github.com/tu-usuario/liverpool-cycling-coach.git

# Cambiar a branch main (si estás en master)
git branch -M main

# Hacer commit inicial
git commit -m "Initial commit: Liverpool Cycling Coach AI Banner v1.0.0"

# Push al repositorio
git push -u origin main
```

### 3. Conectar con Cloudflare Pages

1. **Ve a Cloudflare Dashboard**:
   - https://dash.cloudflare.com
   - Selecciona tu cuenta

2. **Crear nuevo proyecto**:
   - Ve a "Pages" en el menú lateral
   - Click en "Create a project"
   - Selecciona "Connect to Git"

3. **Conectar repositorio**:
   - Autoriza Cloudflare Pages a acceder a tu GitHub/GitLab
   - Selecciona el repositorio `liverpool-cycling-coach`
   - Click en "Begin setup"

4. **Configuración del build**:
   - **Framework preset**: None (o "Static HTML")
   - **Build command**: (dejar vacío - no hay build)
   - **Build output directory**: `/` (raíz)
   - **Root directory**: `/` (raíz)

5. **Configurar dominio**:
   - En la configuración del proyecto, ve a "Custom domains"
   - Agrega: `cycling-liverpool.pottential.site`
   - Cloudflare configurará el DNS automáticamente

### 4. Configuración adicional (opcional)

#### Variables de entorno (si necesitas ocultar API Key)

En Cloudflare Pages → Settings → Environment variables:

```
GEMINI_API_KEY=tu_api_key_aqui
```

Luego actualiza el código para leer de `process.env.GEMINI_API_KEY` (requiere build step).

#### Headers personalizados

En Cloudflare Pages → Settings → Headers:

```
Cache-Control: public, max-age=3600
X-Frame-Options: SAMEORIGIN
```

### 5. Verificación

1. **Push un cambio de prueba**:
   ```bash
   # Hacer un pequeño cambio
   echo "<!-- Test deployment -->" >> index.html
   git add index.html
   git commit -m "Test: Verify auto-deployment"
   git push
   ```

2. **Verificar deployment**:
   - Ve a Cloudflare Pages → Tu proyecto
   - Deberías ver un nuevo deployment en progreso
   - Espera 1-2 minutos
   - El sitio se actualizará automáticamente

### 6. Workflow futuro

Cada vez que hagas cambios:

```bash
# 1. Hacer cambios en el código
# 2. Commit
git add .
git commit -m "Descripción del cambio"

# 3. Push
git push

# 4. Cloudflare Pages automáticamente:
#    - Detecta el push
#    - Hace deployment
#    - Actualiza el sitio en 1-2 minutos
```

## URLs importantes

- **Repositorio**: `https://github.com/tu-usuario/liverpool-cycling-coach`
- **Cloudflare Pages**: `https://dash.cloudflare.com/pages`
- **Sitio en vivo**: `https://cycling-liverpool.pottential.site`
- **Preview URL**: `https://tu-proyecto.pages.dev`

## Troubleshooting

### El sitio no se actualiza después de push

1. Verifica que el push se haya completado en GitHub
2. Revisa los logs de deployment en Cloudflare Pages
3. Verifica que no haya errores en el build (aunque no tengamos build step)

### Error 404 en el sitio

- Verifica que `index.html` esté en la raíz del repositorio
- Revisa la configuración de "Build output directory" (debe ser `/`)

### Imágenes no cargan

- Verifica que los archivos (`logo.svg`, `whats-chat.avif`, `1.png`) estén en el repositorio
- Verifica las rutas en el código (deben ser relativas: `./logo.svg`)

## Contacto

Si tienes problemas con el deployment, contacta al equipo de desarrollo.

