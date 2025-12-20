# RESUMEN EJECUTIVO - Liverpool Cycling Fest AI Banner

## 📊 EVALUACIÓN ACTUAL

**Estado:** Prototipo funcional completo
- ✅ UI/UX implementada (chat interactivo, carrusel productos)
- ✅ Branding Liverpool (magenta #E10098, logo SVG)
- ✅ Chat funcional (input, envío, respuestas simuladas)
- ✅ Responsive mobile-first (390px)
- ⚠️ Sin integración AI real (respuestas hardcodeadas)

## 🛠️ STACK TÉCNICO ACTUAL

- **Frontend:** HTML5 + Tailwind CSS (CDN)
- **JavaScript:** Vanilla JS (sin frameworks)
- **Assets:** SVG (logo), AVIF (avatar)
- **Arquitectura:** Single-file HTML (296 líneas)
- **Compatibilidad:** DV360/CM360 ready (HTML estático)

## 🎯 PROPUESTA SIGUIENTE: INTEGRACIÓN GEMINI API

### Objetivo
Transformar respuestas simuladas en inteligencia real para recomendaciones personalizadas de productos.

### Implementación Técnica
1. **Backend Proxy** (Node.js/Express o Cloud Function)
   - Recibe mensajes del banner
   - Llama a Gemini API con contexto de productos
   - Retorna respuestas estructuradas

2. **Frontend Updates**
   - Reemplazar `setTimeout()` por `fetch()` a proxy
   - Manejo de estados (loading, error)
   - Cache de respuestas frecuentes

3. **Contexto para Gemini**
   - Catálogo productos Liverpool Cycling
   - Reglas de negocio (descuentos, stock)
   - Personalización por segmento

## 🚀 RUTA DE ACCIÓN

### Fase 1: Backend (2-3 días)
- [ ] Setup Cloud Function (Firebase/Cloud Run)
- [ ] Integración Gemini API
- [ ] Endpoint `/api/chat` con autenticación
- [ ] Contexto productos en prompt

### Fase 2: Frontend (1-2 días)
- [ ] Reemplazar lógica simulada
- [ ] Estados UI (loading spinner, error handling)
- [ ] Optimización requests (debounce, cache)

### Fase 3: DV360/CM360 Tags (1 día)
- [ ] Wrapper HTML para tag manager
- [ ] Event tracking (clicks, conversaciones)
- [ ] Testing en ambiente DV360/CM360
- [ ] Documentación implementación

### Fase 4: Testing & Optimización (1-2 días)
- [ ] A/B testing respuestas
- [ ] Performance (lazy loading, minificación)
- [ ] Analytics integración

**Timeline Total: 5-8 días**

## ⚠️ CONSIDERACIONES DV360/CM360

- **Tamaño:** Mantener < 200KB (actual ~50KB)
- **CORS:** Backend debe permitir origen del banner
- **Tracking:** Implementar eventos estándar (view, click, conversion)
- **Fallback:** Si API falla, mostrar respuesta genérica
- **Compliance:** GDPR/CCPA para datos de chat

## 💰 ESTIMACIÓN COSTOS

- **Gemini API:** ~$0.001/request (Free tier: 15 RPM)
- **Cloud Function:** ~$0.40/millón requests
- **Total mensual:** ~$50-100 (10K conversaciones)

---

**Próximo paso:** Aprobar integración Gemini → Iniciar Fase 1

