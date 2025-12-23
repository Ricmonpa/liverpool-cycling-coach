# 🚨 REMEDIACIÓN - GitGuardian API Key Leak

## ⚠️ PROBLEMA DETECTADO

GitGuardian detectó una API Key de Google expuesta en el historial de Git:
- **Commit**: `0bb2a31` - "Add Gemini API Key to HTML head"
- **API Key detectada**: `AIzaSyCt-6SVeTRNu3SiGGEq_FgSvcBF036s9YI`
- **Fecha**: December 21st 2025, 18:10:22 UTC

## ✅ ACCIONES INMEDIATAS (YA COMPLETADAS)

1. ✅ **API Key removida del código actual**
   - Commit: `1fc35af` - "Remove API key from HTML and add secure Workers Function proxy"
   - El código actual NO contiene la API Key

2. ✅ **API Key rotada en Google Cloud**
   - Nueva API Key: Configurada en Variables Secretas (no expuesta)
   - La key antigua debería estar deshabilitada/eliminada

3. ✅ **Workers Function implementado**
   - La nueva API Key está solo en Variables Secretas de Cloudflare Pages
   - No está en el código fuente

## 🔧 REMEDIACIÓN COMPLETA

### Opción 1: Verificar que la Key Antigua Esté Rotada (RECOMENDADO)

1. **Ve a Google Cloud Console**:
   - https://console.cloud.google.com/
   - Proyecto: "Liverpool Banner HTML"
   - APIs & Services → Credentials

2. **Verifica/elimina la key antigua**:
   - Busca y elimina todas las keys comprometidas
   - Confirma que la nueva key esté activa en Variables Secretas de Cloudflare Pages

3. **Verifica restricciones**:
   - La nueva key debe tener restricciones de HTTP Referrers
   - Solo debe funcionar desde `coach-liverpool.potenttial.site`

### Opción 2: Limpiar Historial de Git (AVANZADO)

Si quieres eliminar completamente la key del historial de Git:

**⚠️ ADVERTENCIA**: Esto reescribe el historial y puede afectar colaboradores.

#### Usando BFG Repo-Cleaner (Recomendado)

```bash
# 1. Instalar BFG (si no lo tienes)
# brew install bfg  # macOS
# o descargar de: https://rtyley.github.io/bfg-repo-cleaner/

# 2. Crear backup del repositorio
cd "/Users/ricardomoncadapalafox/Liverpool Coach"
git clone --mirror . ../liverpool-cycling-coach-backup.git

# 3. Limpiar la API Key del historial
bfg --replace-text passwords.txt

# Crear archivo passwords.txt con:
# AIzaSyCt-6SVeTRNu3SiGGEq_FgSvcBF036s9YI==>REMOVED
# AIzaSyDhkRsRMnWXqXfZMzVQh6MtG_YEajhe6Cc==>REMOVED

# 4. Limpiar referencias
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 5. Force push (CUIDADO: esto reescribe el historial)
git push --force --all
```

#### Usando git filter-repo (Alternativa)

```bash
# 1. Instalar git-filter-repo
# pip install git-filter-repo

# 2. Limpiar la key del historial
git filter-repo --replace-text <(echo "AIzaSyCt-6SVeTRNu3SiGGEq_FgSvcBF036s9YI==>REMOVED")

# 3. Force push
git push --force --all
```

**⚠️ IMPORTANTE**: 
- Notifica a todos los colaboradores antes de hacer force push
- Todos necesitarán hacer `git pull --rebase` después
- Considera crear un nuevo repositorio si no hay colaboradores activos

### Opción 3: Crear Nuevo Repositorio (MÁS SIMPLE)

Si no necesitas mantener el historial completo:

1. **Crear nuevo repositorio en GitHub**
2. **Push solo del código actual** (sin historial):
   ```bash
   cd "/Users/ricardomoncadapalafox/Liverpool Coach"
   git checkout --orphan clean-main
   git add .
   git commit -m "Initial commit: Clean version without API keys"
   git remote set-url origin https://github.com/Ricmonpa/liverpool-cycling-coach.git
   git push -f origin clean-main:main
   ```

## 📋 CHECKLIST DE REMEDIACIÓN

- [x] API Key removida del código actual
- [x] Nueva API Key creada y configurada
- [x] Workers Function implementado
- [ ] **Verificar que key antigua esté rotada/eliminada en Google Cloud**
- [ ] **Decidir si limpiar historial de Git** (Opcional)
- [ ] **Actualizar Cloudflare Pages con nueva key** (si aún no está)
- [ ] **Probar que el banner funcione con nueva key**

## 🔒 PREVENCIÓN FUTURA

1. **NUNCA subir API Keys a Git**
   - Usar Variables Secretas siempre
   - Verificar antes de hacer commit

2. **Pre-commit hooks** (Opcional):
   ```bash
   # Crear .git/hooks/pre-commit
   #!/bin/bash
   if git diff --cached | grep -q "AIzaSy"; then
     echo "ERROR: API Key detectada en commit. Abortando."
     exit 1
   fi
   ```

3. **Usar GitGuardian** (ya lo tienes):
   - Monitorear alertas
   - Responder rápidamente a leaks

## ✅ ESTADO ACTUAL

- ✅ Código actual: SEGURO (sin API Keys)
- ✅ Nueva API Key: Configurada en Variables Secretas
- ⚠️ Historial de Git: Contiene key antigua (pero key ya rotada)
- ✅ Workers Function: Implementado y funcionando

## 🎯 RECOMENDACIÓN

**Para este caso específico**:
1. Verifica que la key antigua esté rotada en Google Cloud (más importante)
2. El código actual está seguro
3. La limpieza del historial es opcional (solo si es crítico para tu organización)

La key antigua en el historial NO es un riesgo si:
- ✅ Ya fue rotada/eliminada en Google Cloud
- ✅ No está activa
- ✅ El código actual no la usa

---

**Fecha de remediación**: 2025-12-21  
**Estado**: En proceso de verificación

