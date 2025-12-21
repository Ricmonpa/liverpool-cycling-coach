# Liverpool Cycling Coach AI Banner

Banner interactivo con IA conversacional para Liverpool México - Cycling Fest AI.

## Características

- **Coach de ciclismo con IA** (Gemini 2.5 Flash)
- **Recomendaciones personalizadas** de productos Liverpool
- **Carrusel dinámico** de productos con imágenes HD
- **Deeplinks inteligentes** a app/web de Liverpool
- **Responsive mobile** (430x932 - iPhone 14 Pro Max)
- **Tracking de eventos** para analytics

## Stack Tecnológico

- **Frontend**: HTML5, Tailwind CSS (CDN), Vanilla JavaScript
- **IA**: Google Gemini 2.5 Flash API
- **Imágenes**: Unsplash (HD, optimizadas)
- **Tracking**: Google Analytics / Tag Manager, Floodlight (CM360)

## Deployment

- **Plataforma**: Cloudflare Pages
- **Dominio**: coach-liverpool.potenttial.site
- **Versión**: 1.0.0
- **Peso**: 54 KB (optimizado para DV360)
- **Git**: Conectado para auto-deployment

### Quick Start Deployment

1. **Crear repositorio en GitHub** (ver `DEPLOYMENT.md`)
2. **Push inicial**:
   ```bash
   git remote add origin https://github.com/tu-usuario/liverpool-cycling-coach.git
   git commit -m "Initial commit: Liverpool Cycling Coach v1.0.0"
   git push -u origin main
   ```
3. **Conectar en Cloudflare Pages**:
   - Dashboard → Pages → Create project
   - Conectar repositorio
   - Build settings: Framework "None", Output "/"
   - Deploy automático en cada push

## Configuración DV360/CM360

- **Dimensiones**: 430x932 (Mobile Portrait)
- **Formato**: HTML5 Rich Media
- **Peso**: ~180KB
- **API**: Gemini 2.5 Flash
- **Costo estimado**: $50-150/mes (10K conversaciones)

### Meta Tags para Programática

```html
<meta name="ad.size" content="width=430,height=932">
<meta name="viewport" content="width=430, height=932, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="format-detection" content="telephone=no">
```

## Tracking Events

El banner envía los siguientes eventos para analytics:

### `ai_conversation`
Disparado cuando el usuario envía un mensaje al AI.

```javascript
{
    message_length: 45,
    timestamp: "2024-01-15T10:30:00.000Z"
}
```

### `product_click`
Disparado cuando el usuario hace click en "VER PRODUCTO".

```javascript
{
    product_name: "Botella CamelBak Podium 620ml",
    product_sku: "1162181609",
    timestamp: "2024-01-15T10:30:00.000Z"
}
```

## Estructura de Archivos

```
/Liverpool-Cycling-Coach/
├── index.html          # Banner principal (todo-en-uno)
├── whats-chat.avif     # Avatar del AI
├── logo.svg            # Logo Liverpool
├── 1.png               # Logo NADS (footer)
└── README.md           # Esta documentación
```

## Configuración de Gemini API

- **Modelo**: `gemini-2.5-flash`
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`
- **API Key**: Configurada en el código (cambiar en producción)
- **Timeout**: 10 segundos
- **Max Tokens**: 200

## Productos Liverpool

El banner incluye productos en las siguientes categorías:

- **Guantes**: Nike, Under Armour, Puma
- **Hidratación**: CamelBak Podium, Mochilas de hidratación
- **Nutrición**: Proteínas Birdman Falcon, Geles GU Energy, Barras Clif Bar
- **Seguridad**: Cascos POC, Luces LED Garmin, Chalecos reflectantes
- **Tecnología**: Garmin Forerunner 55, Garmin Instinct Solar, Ciclocomputadores GPS
- **Default**: Productos generales de ciclismo

## Sistema de Detección de Productos

El banner usa un sistema de 3 niveles de prioridad:

1. **Nivel 1**: Productos específicos por keywords del mensaje del AI
2. **Nivel 2**: Productos de la categoría detectada
3. **Nivel 3**: Productos default (fallback)

## Optimizaciones Aplicadas

- ✅ Código de debug eliminado (console.log)
- ✅ Meta tags para plataformas programáticas
- ✅ Tracking de eventos integrado
- ✅ Imágenes optimizadas (Unsplash HD)
- ✅ Peso < 200KB para DV360
- ✅ Responsive mobile-first

## Próximos Pasos (Producción)

- [ ] Migrar Tailwind CDN a build compilado
- [ ] Reemplazar imágenes Unsplash con URLs oficiales de Liverpool
- [ ] Configurar API Key de Gemini en variables de entorno
- [ ] Agregar Google Tag Manager / Analytics
- [ ] Configurar Floodlight tags para CM360
- [ ] Testing en DV360/CM360

## Contacto

- **Desarrollado por**: NADS / Pottential
- **Versión**: 1.0.0
- **Fecha**: Enero 2024

