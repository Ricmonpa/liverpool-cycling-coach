# PROPUESTA DE DEBUG - TRUNCAMIENTO DE MENSAJES AI

## RESUMEN EJECUTIVO

**Problema:** Los mensajes del AI se reciben completos en el frontend (confirmado en logs), pero se cortan visualmente en la UI del chat.

**Impacto:** Experiencia de usuario degradada - mensajes incompletos afectan la conversación y confianza en el asistente.

**Solución Propuesta:** Debug sistemático en 3 fases, sin riesgo de regresiones.

---

## DIAGNÓSTICO ACTUAL

✅ **Confirmado:**
- API responde correctamente (mensajes completos en logs)
- Frontend recibe datos completos (`AI Message full` muestra texto completo)
- Problema es 100% CSS/rendering

❌ **Problema:**
- Mensajes se cortan visualmente en el último renglón
- No es problema de `maxOutputTokens` (ya aumentado a 800)
- No es problema de scroll (ya corregido)

---

## PLAN DE DEBUG (3 FASES)

### FASE 1: Aislamiento del Problema (5 min)
**Objetivo:** Identificar el elemento CSS exacto que causa el corte.

**Acciones:**
1. Agregar clase de debug temporal `.debug-message` al contenedor del mensaje
2. Inspeccionar en DevTools con `getComputedStyle()` para identificar:
   - `height` vs `scrollHeight`
   - `overflow` properties
   - `line-height` y `max-height` ocultos
3. Capturar screenshots antes/después

**Riesgo:** Cero - solo lectura de estilos.

---

### FASE 2: Corrección Dirigida (10 min)
**Objetivo:** Aplicar fix mínimo y específico.

**Acciones:**
1. Basado en Fase 1, aplicar fix CSS quirúrgico:
   - Si es `line-height`: ajustar a `1.5` o `normal`
   - Si es `max-height` oculto: remover
   - Si es `overflow: hidden`: cambiar a `visible`
   - Si es padding interno: verificar `box-sizing`
2. Test inmediato con mensaje largo (150+ caracteres)
3. Verificar que no afecte otros elementos

**Riesgo:** Bajo - cambios aislados y reversibles.

---

### FASE 3: Validación y Limpieza (5 min)
**Objetivo:** Confirmar fix y remover código de debug.

**Acciones:**
1. Test con 3-5 mensajes de diferentes longitudes
2. Verificar en diferentes navegadores (Chrome, Safari)
3. Remover clases de debug temporales
4. Documentar solución final

**Riesgo:** Cero - solo limpieza.

---

## CRITERIOS DE ÉXITO

✅ Mensajes de 50-200 caracteres se muestran completos
✅ No hay scroll horizontal no deseado
✅ No se afectan otros elementos (carousel, input, header)
✅ Performance sin degradación

---

## TIMELINE

**Total:** 20 minutos
- Fase 1: 5 min
- Fase 2: 10 min  
- Fase 3: 5 min

**Rollback:** Inmediato (git revert si necesario)

---

## ALTERNATIVA RÁPIDA (Si Fase 1 identifica problema obvio)

**Fix inmediato propuesto:**
```css
/* Aplicar a contenedor de mensaje AI */
.ai-message-container {
    min-height: auto !important;
    max-height: none !important;
    overflow: visible !important;
    line-height: 1.6 !important;
}
```

**Validación:** Test con mensaje de 150 caracteres.

---

## APROBACIÓN REQUERIDA

¿Proceder con el plan de debug en 3 fases?
- [ ] Aprobado - Proceder con Fase 1
- [ ] Aprobado - Aplicar fix alternativo directo
- [ ] Revisar antes de proceder

---

**Preparado por:** AI Assistant  
**Fecha:** $(date)  
**Prioridad:** Alta (UX crítico)

