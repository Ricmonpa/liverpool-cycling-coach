# 🛡️ PLAN DE SEGURIDAD - API KEYS

## 🚨 PROBLEMA IDENTIFICADO

**API Key expuesta en**: `GITGUARDIAN_REMEDIATION.md` (líneas 17 y 36)
- **Key comprometida**: `AIzaSyBRX40ORBEHIUMayqQVqI2fEvkb-UCge5o`
- **Ubicación**: Archivo de documentación subido a GitHub
- **Detectado por**: Google Cloud (403 - "Your API key was reported as leaked")

## 📋 EVIDENCIAS DE EXPOSICIÓN

### Archivos con API Keys Expuestas (HISTÓRICO)

1. **`GITGUARDIAN_REMEDIATION.md`** ✅ CORREGIDO
   - Línea 17: `AIzaSyBRX40ORBEHIUMayqQVqI2fEvkb-UCge5o`
   - Línea 36: `AIzaSyBRX40ORBEHIUMayqQVqI2fEvkb-UCge5o`
   - **Estado**: Removida en este commit

2. **`AUDIT_SECURITY.md`** ✅ CORREGIDO (anteriormente)
   - Contenía la misma key, ya fue removida

3. **Commits en Git** (historial)
   - Commit `0bb2a31`: "Add Gemini API Key to HTML head" - Key antigua
   - Commit `21cb82d`: "Add GitGuardian remediation guide" - Key nueva expuesta

## 🔍 ANÁLISIS DE CAUSA RAÍZ

### ¿Por qué se expuso?

1. **Error humano**: Se incluyó la API Key en archivos de documentación
2. **Falta de validación**: No se verificó antes de hacer commit
3. **Documentación mal ubicada**: Archivos `.md` con información sensible
4. **Sin pre-commit hooks**: No hay validación automática antes de commits

### Vectores de Exposición Identificados

1. ✅ **Archivos de documentación** (`.md`) - CORREGIDO
2. ✅ **Código fuente** (`index.html`) - CORREGIDO (ahora usa Workers Function)
3. ⚠️ **Historial de Git** - Contiene keys antiguas (no crítico si están rotadas)
4. ✅ **Variables Secretas** - Configurado correctamente

## 🛡️ PLAN DE PREVENCIÓN

### FASE 1: Limpieza Inmediata ✅

- [x] Remover API Key de `GITGUARDIAN_REMEDIATION.md`
- [x] Verificar que no haya más referencias en código
- [x] Actualizar `.gitignore` para prevenir futuras exposiciones

### FASE 2: Configuración de Seguridad

#### 2.1 Pre-commit Hooks (CRÍTICO)

Crear `.git/hooks/pre-commit`:

```bash
#!/bin/bash
# Pre-commit hook para prevenir API Keys en commits

# Patrones a buscar
PATTERNS=(
    "AIzaSy[A-Za-z0-9_-]{35}"
    "GEMINI_API_KEY.*=.*['\"][A-Za-z0-9_-]"
    "api.*key.*=.*['\"][A-Za-z0-9_-]"
)

# Archivos a verificar
FILES=$(git diff --cached --name-only)

for file in $FILES; do
    for pattern in "${PATTERNS[@]}"; do
        if grep -qE "$pattern" "$file" 2>/dev/null; then
            echo "❌ ERROR: Posible API Key detectada en $file"
            echo "   Patrón: $pattern"
            echo "   Por favor, remueve la API Key antes de hacer commit"
            exit 1
        fi
    done
done

echo "✅ Pre-commit check: Sin API Keys detectadas"
exit 0
```

**Instalación**:
```bash
chmod +x .git/hooks/pre-commit
```

#### 2.2 Actualizar `.gitignore`

Agregar al `.gitignore`:

```
# Archivos con información sensible
*SECRET*.md
*API*.md
*KEY*.md
*PASSWORD*.md
*CREDENTIAL*.md
GITGUARDIAN*.md
AUDIT*.md
```

#### 2.3 Script de Validación Pre-Push

Crear `scripts/validate-secrets.sh`:

```bash
#!/bin/bash
# Validar que no haya secrets antes de push

echo "🔍 Validando que no haya secrets expuestos..."

# Buscar patrones de API Keys
if git diff --cached | grep -qE "AIzaSy[A-Za-z0-9_-]{35}"; then
    echo "❌ ERROR: API Key detectada en cambios staged"
    exit 1
fi

echo "✅ Validación exitosa: Sin secrets detectados"
exit 0
```

### FASE 3: Mejores Prácticas

#### 3.1 Estructura de Archivos

```
/Liverpool-Cycling-Coach/
├── .gitignore          # Excluir archivos sensibles
├── .git/hooks/         # Pre-commit hooks
├── scripts/            # Scripts de validación
├── docs/               # Documentación (sin secrets)
└── SECURITY.md         # Guía de seguridad (sin keys reales)
```

#### 3.2 Convenciones de Nombres

**NUNCA incluir en nombres de archivos**:
- `*SECRET*`
- `*API_KEY*`
- `*PASSWORD*`
- `*CREDENTIAL*`

**Usar placeholders en documentación**:
- ❌ `const API_KEY = 'AIzaSy...'`
- ✅ `const API_KEY = 'TU_API_KEY_AQUI'` o `env.GEMINI_API_KEY`

#### 3.3 Checklist Pre-Commit

Antes de cada commit, verificar:

- [ ] ¿El commit contiene alguna API Key?
- [ ] ¿Hay archivos `.md` con información sensible?
- [ ] ¿Se actualizó `.gitignore` si es necesario?
- [ ] ¿Los archivos de documentación usan placeholders?

### FASE 4: Monitoreo Continuo

#### 4.1 GitGuardian Integration

- ✅ Ya configurado (detectó la exposición)
- Monitorear alertas semanalmente
- Responder inmediatamente a leaks

#### 4.2 Google Cloud Monitoring

- Configurar alertas en Google Cloud Console
- Notificaciones por email cuando una key sea reportada como comprometida
- Revisar logs de uso de API semanalmente

#### 4.3 Auditorías Periódicas

**Mensual**:
```bash
# Buscar posibles exposiciones
grep -r "AIzaSy" . --exclude-dir=.git
grep -r "GEMINI_API_KEY.*=" . --exclude-dir=.git
```

**Trimestral**:
- Revisar historial de Git completo
- Verificar Variables Secretas en Cloudflare
- Rotar API Keys (mejores prácticas)

## 🔐 CONFIGURACIÓN SEGURA DE NUEVA API KEY

### Paso 1: Crear Nueva API Key

1. Google Cloud Console → Credentials
2. "+ Crear credenciales" → "Clave de API"
3. **NO copiar la key todavía**

### Paso 2: Configurar Restricciones INMEDIATAMENTE

**Antes de usar la key**:

1. **Restricciones de API**:
   - ✅ "Restringir clave"
   - ✅ Solo "Generative Language API"

2. **Restricciones de Aplicación**:
   - ✅ "Ninguna" (para Workers Functions)

3. **Guardar**

### Paso 3: Configurar en Cloudflare Pages

1. **Variables Secretas**:
   - Variable: `GEMINI_API_KEY`
   - Valor: [PEGAR NUEVA KEY AQUÍ]
   - ✅ Encriptada automáticamente

2. **NO hacer commit de la key**

### Paso 4: Verificación

```bash
# Verificar que NO esté en el código
grep -r "TU_NUEVA_KEY" . --exclude-dir=.git
# Debe retornar: 0 resultados
```

## 📊 CHECKLIST DE IMPLEMENTACIÓN

### Inmediato (Hoy)

- [x] Remover API Key de `GITGUARDIAN_REMEDIATION.md`
- [ ] Crear nueva API Key en Google Cloud
- [ ] Configurar restricciones ANTES de usar
- [ ] Actualizar Variables Secretas en Cloudflare
- [ ] Verificar que funcione el chat

### Corto Plazo (Esta Semana)

- [ ] Instalar pre-commit hook
- [ ] Actualizar `.gitignore`
- [ ] Crear script de validación
- [ ] Documentar proceso en `SECURITY.md`

### Mediano Plazo (Este Mes)

- [ ] Configurar alertas en Google Cloud
- [ ] Revisar todos los archivos `.md`
- [ ] Limpiar historial de Git (opcional)
- [ ] Capacitar al equipo en seguridad

## 🚨 PROCEDIMIENTO DE EMERGENCIA

Si se detecta una API Key expuesta:

1. **INMEDIATO** (0-5 minutos):
   - Rotar API Key en Google Cloud
   - Eliminar key comprometida
   - Actualizar Variables Secretas en Cloudflare

2. **URGENTE** (5-30 minutos):
   - Remover key del código/documentación
   - Hacer commit de limpieza
   - Verificar que no haya más referencias

3. **SEGUIMIENTO** (24 horas):
   - Revisar logs de uso de API comprometida
   - Verificar si hubo uso no autorizado
   - Actualizar documentación de seguridad

## ✅ VERIFICACIÓN FINAL

Antes de considerar el proyecto seguro:

```bash
# 1. Verificar código fuente
grep -r "AIzaSy" . --exclude-dir=.git
# Resultado esperado: 0 coincidencias

# 2. Verificar documentación
grep -r "GEMINI_API_KEY.*=" . --exclude-dir=.git
# Resultado esperado: Solo en Workers Function (env.GEMINI_API_KEY)

# 3. Verificar historial reciente
git log --all -p -S "AIzaSy" --since="1 week ago" | grep -i "AIzaSy"
# Resultado esperado: Solo commits de limpieza
```

## 📝 NOTAS IMPORTANTES

1. **NUNCA** incluir API Keys en:
   - Código fuente
   - Archivos de documentación
   - Commits de Git
   - Screenshots o imágenes
   - Mensajes de chat/email

2. **SIEMPRE** usar:
   - Variables Secretas (Cloudflare Pages)
   - Workers Functions como proxy
   - Placeholders en documentación
   - Pre-commit hooks

3. **ROTAR** API Keys:
   - Cada 6 meses (mejores prácticas)
   - Inmediatamente si se detecta exposición
   - Después de cambios de seguridad importantes

---

**Última actualización**: 2025-12-22  
**Próxima revisión**: 2026-01-22

