# ANYWAY... | Especificación Técnica Completa 🍒
## Octavo Hermano del Aldraverse

---

## 1. PROPÓSITO Y VISIÓN

**Anyway...** es una plataforma web de **transcripción de audio con inteligencia artificial integrada**, diseñada para estudiantes, profesores y creadores de contenido educativo. Permite a cada usuario transcribir contenido de múltiples fuentes (YouTube, GMetrix, archivos locales), procesarlo con IA (resúmenes, puntos clave, traducciones) y gestionar todo en un dashboard personal.

**Filosofía:** "Producto con alma que ayuda a Manuel y a todos los que lo necesitan."

**Público Objetivo:** Estudiantes, profesores, creadores de cursos, instituciones educativas que necesitan accesibilidad lingüística a contenido educativo en inglés.

---

## 2. STACK TECNOLÓGICO DEFINITIVO

| Capa | Tecnología | Versión | Justificación |
|---|---|---|---|
| **Frontend** | Next.js | 14+ (App Router) | SSR, optimización, UX moderna |
| **Backend** | Django + DRF | 4.2+ | APIs REST robustas, admin panel |
| **Base de Datos** | PostgreSQL (Supabase) | 15+ | Escalabilidad, confiabilidad, SQL avanzado |
| **Autenticación** | Supabase Auth (OAuth2) | Integrado | Gestión de sesiones, social login |
| **Transcripción** | OpenAI Whisper API | v1 | Transcripción de audio de alta calidad |
| **IA Asistente** | OpenAI GPT-4 / Claude | API | Resúmenes, puntos clave, traducciones |
| **Almacenamiento** | Supabase Storage (S3) | Integrado | Archivos de audio y exportaciones |
| **Tipografías** | Google Fonts | - | Space Grotesk, Syne, Inter, JetBrains Mono |
| **Estilos** | Tailwind CSS 4 | 4.1+ | Estética Aurora Visual (lava-neón) |

---

## 3. ARQUITECTURA GENERAL

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTE (Next.js)                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Landing Page | Dashboard | Transcription Detail | Export │   │
│  │ Estética Aurora Visual (lava-neón, tipografías modernas) │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕ (HTTPS)
┌─────────────────────────────────────────────────────────────────┐
│                    SERVIDOR (Django + DRF)                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ API REST | Autenticación | Lógica de Negocio | Webhooks │   │
│  │ /api/transcriptions/ | /api/ai/ | /api/auth/            │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕ (SDK)
┌─────────────────────────────────────────────────────────────────┐
│                  SERVICIOS EXTERNOS INTEGRADOS                   │
│  ┌─────────────┬──────────────┬──────────────┬──────────────┐   │
│  │  Supabase   │   OpenAI     │   OpenAI     │   Supabase   │   │
│  │  (Auth +    │   (Whisper   │   (GPT-4 /   │   (Storage)  │   │
│  │  PostgreSQL)│   Transcribe)│   Claude AI) │   (S3)       │   │
│  └─────────────┴──────────────┴──────────────┴──────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. MODELO DE DATOS (PostgreSQL)

### Tabla: `auth_user` (Supabase Auth)
Gestiona identidad y autenticación de usuarios.

```sql
id (UUID, PK)
email (varchar, unique)
encrypted_password (varchar)
email_confirmed_at (timestamp)
created_at (timestamp)
updated_at (timestamp)
last_sign_in_at (timestamp)
```

### Tabla: `users` (Extensión de Supabase Auth)
Perfil extendido del usuario.

```sql
id (UUID, PK, FK → auth_user.id)
email (varchar)
full_name (varchar)
avatar_url (varchar, nullable)
subscription_tier (enum: free | pro | enterprise) → Default: free
storage_used_mb (bigint) → Default: 0
created_at (timestamp)
updated_at (timestamp)
```

### Tabla: `transcriptions`
Almacena todas las transcripciones de cada usuario.

```sql
id (UUID, PK)
user_id (UUID, FK → users.id, NOT NULL)
title (varchar, NOT NULL)
source (enum: youtube | gmetrix | file_upload, NOT NULL)
source_url (varchar, nullable) → URL de YouTube/GMetrix
audio_file_key (varchar, nullable) → Referencia en Supabase Storage
audio_file_name (varchar, nullable) → Nombre original del archivo
audio_duration_seconds (integer, nullable)
transcription_text (text, NOT NULL)
detected_language (varchar, default: 'en')
word_count (integer)
is_archived (boolean, default: false)
created_at (timestamp)
updated_at (timestamp)

Índices:
- user_id, created_at (para listar por usuario)
- user_id, title (para búsqueda)
- is_archived (para filtros)
```

### Tabla: `ai_interactions`
Registra interacciones con el asistente IA (resúmenes, puntos clave, traducciones).

```sql
id (UUID, PK)
transcription_id (UUID, FK → transcriptions.id, NOT NULL)
user_id (UUID, FK → users.id, NOT NULL)
interaction_type (enum: summary | key_points | translation, NOT NULL)
target_language (varchar, nullable) → Para traducciones ('es', 'fr', etc.)
input_tokens (integer)
output_tokens (integer)
result (text, NOT NULL)
model_used (varchar) → 'gpt-4', 'claude-3', etc.
created_at (timestamp)

Índices:
- transcription_id (para obtener historial de IA)
- user_id, created_at (para auditoría)
```

### Tabla: `exports`
Registra exportaciones de transcripciones (auditoría y estadísticas).

```sql
id (UUID, PK)
transcription_id (UUID, FK → transcriptions.id, NOT NULL)
user_id (UUID, FK → users.id, NOT NULL)
export_format (enum: txt | pdf | docx)
export_size_kb (integer)
created_at (timestamp)
```

---

## 5. FLUJOS DE FUNCIONAMIENTO

### 5.1 Flujo de Autenticación

```
1. Usuario accede a landing page (/)
2. Hace clic en "Comenzar" o "Login"
3. Redirige a Supabase Auth (OAuth2)
4. Usuario se autentica (email/contraseña, Google, GitHub, etc.)
5. Supabase redirige con token JWT
6. Next.js almacena token en cookie segura (httpOnly)
7. Usuario ve dashboard personal (/dashboard)
8. Logout limpia cookie y redirige a landing
```

### 5.2 Flujo de Transcripción

```
ENTRADA:
┌─ Usuario en /dashboard
│  ├─ Opción 1: Pega URL de YouTube
│  ├─ Opción 2: Pega URL de GMetrix
│  └─ Opción 3: Sube archivo (mp3, wav, webm)

PROCESAMIENTO:
├─ Frontend valida entrada
├─ Envía a Django API: POST /api/transcriptions/create/
├─ Django descarga/procesa audio
│  ├─ YouTube: extrae audio con yt-dlp
│  ├─ GMetrix: descarga si es accesible
│  └─ Archivo: sube a Supabase Storage
├─ Django envía audio a OpenAI Whisper
├─ Whisper retorna transcripción + idioma detectado
├─ Django guarda en BD (tabla transcriptions)
└─ Retorna JSON con transcripción

SALIDA:
└─ Frontend muestra transcripción en /transcriptions/:id
```

### 5.3 Flujo del Asistente IA

```
ENTRADA:
┌─ Usuario en vista de transcripción (/transcriptions/:id)
│  ├─ Solicita "Resumen"
│  ├─ Solicita "Puntos Clave"
│  └─ Solicita "Traducir a Español"

PROCESAMIENTO:
├─ Frontend envía a Django API: POST /api/ai/process/
├─ Django prepara prompt según tipo:
│  ├─ Resumen: "Resume este texto en 3-5 párrafos"
│  ├─ Puntos Clave: "Extrae 5-7 puntos principales"
│  └─ Traducción: "Traduce al español manteniendo contexto"
├─ Django envía a OpenAI GPT-4 / Claude
├─ IA retorna resultado
├─ Django guarda en tabla ai_interactions
└─ Retorna JSON con resultado

SALIDA:
└─ Frontend muestra resultado en panel lateral (streaming si es posible)
```

### 5.4 Flujo de Exportación

```
ENTRADA:
┌─ Usuario en vista de transcripción (/transcriptions/:id)
│  ├─ Opción 1: "Descargar como .txt"
│  ├─ Opción 2: "Copiar al portapapeles"
│  └─ Opción 3: "Descargar como PDF" (futuro)

PROCESAMIENTO (Descargar):
├─ Frontend envía GET /api/transcriptions/:id/export/
├─ Django formatea: título + fecha + texto completo
├─ Django retorna archivo .txt
├─ Frontend inicia descarga automática

PROCESAMIENTO (Copiar):
├─ Frontend copia texto al portapapeles
├─ Muestra toast de confirmación

SALIDA:
└─ Usuario tiene archivo o contenido en portapapeles
```

### 5.5 Flujo del Dashboard

```
ENTRADA:
└─ Usuario accede a /dashboard (autenticado)

PROCESAMIENTO:
├─ Frontend obtiene lista: GET /api/transcriptions/list/
├─ Django retorna todas las transcripciones del usuario:
│  ├─ Paginación (10-20 por página)
│  ├─ Ordenadas por fecha (más recientes primero)
│  └─ Con búsqueda y filtros
├─ Frontend renderiza tabla con columnas:
│  ├─ Título
│  ├─ Fuente (YouTube, GMetrix, Archivo)
│  ├─ Fecha
│  ├─ Idioma detectado
│  └─ Acciones (Ver, Copiar, Descargar, Eliminar)

ACCIONES:
├─ Ver: Redirige a /transcriptions/:id
├─ Copiar: Copia transcripción al portapapeles
├─ Descargar: Descarga como .txt
└─ Eliminar: Solicita confirmación y elimina

SALIDA:
└─ Dashboard actualizado en tiempo real
```

---

## 6. ENDPOINTS API (Django REST Framework)

### Autenticación
```
POST   /api/auth/register/          → Crear cuenta
POST   /api/auth/login/             → Login (retorna token)
POST   /api/auth/logout/            → Logout
GET    /api/auth/me/                → Obtener usuario actual
POST   /api/auth/refresh/           → Refrescar token
```

### Transcripciones
```
GET    /api/transcriptions/         → Listar todas (paginadas)
GET    /api/transcriptions/:id/     → Obtener una específica
POST   /api/transcriptions/create/  → Crear nueva (URL o archivo)
DELETE /api/transcriptions/:id/     → Eliminar
PATCH  /api/transcriptions/:id/     → Actualizar (título, archivar)
GET    /api/transcriptions/search/  → Buscar por título/contenido
GET    /api/transcriptions/:id/export/ → Exportar como .txt
```

### Asistente IA
```
POST   /api/ai/summarize/           → Resumen de transcripción
POST   /api/ai/key-points/          → Puntos clave
POST   /api/ai/translate/           → Traducción a idioma especificado
GET    /api/ai/history/:transcription_id/ → Historial de IA
```

### Usuarios
```
GET    /api/users/profile/          → Obtener perfil
PATCH  /api/users/profile/          → Actualizar perfil
GET    /api/users/storage/          → Uso de almacenamiento
```

---

## 7. ESTÉTICA AURORA VISUAL

### Paleta de Colores

| Elemento | Hex | RGB | Uso |
|---|---|---|---|
| **Fondo Primario** | `#0a0e27` | 10, 14, 39 | Fondo principal (muy oscuro) |
| **Fondo Secundario** | `#1a1f3a` | 26, 31, 58 | Tarjetas, paneles, modales |
| **Lava Magenta** | `#ff006e` | 255, 0, 110 | Botones primarios, acentos |
| **Lava Violeta** | `#b537f2` | 181, 55, 242 | Gradientes, bordes, hover |
| **Lava Naranja** | `#ff6b35` | 255, 107, 53 | Highlights, alertas, CTA |
| **Neón Verde** | `#00f5ff` | 0, 245, 255 | Éxito, información, badges |
| **Neón Rosa** | `#ff10f0` | 255, 16, 240 | Énfasis, efectos especiales |
| **Texto Primario** | `#ffffff` | 255, 255, 255 | Texto principal |
| **Texto Secundario** | `#b0b0b0` | 176, 176, 176 | Texto secundario, hints |
| **Borde Sutil** | `#2d3748` | 45, 55, 72 | Bordes, divisores |

### Gradientes Recomendados

```css
/* Lava Magenta → Violeta */
background: linear-gradient(135deg, #ff006e 0%, #b537f2 100%);

/* Violeta → Naranja */
background: linear-gradient(135deg, #b537f2 0%, #ff6b35 100%);

/* Lava Completa (3 colores) */
background: linear-gradient(135deg, #ff006e 0%, #b537f2 50%, #ff6b35 100%);

/* Efecto Neón (glow) */
box-shadow: 0 0 20px rgba(255, 0, 110, 0.5);
```

### Tipografías Google Fonts

| Uso | Fuente | Peso | Tamaño | Ejemplo |
|---|---|---|---|---|
| **H1 (Títulos)** | Space Grotesk | 700 | 48px | "Anyway... | Transcribe con IA" |
| **H2 (Subtítulos)** | Space Grotesk | 600 | 36px | "Tu Dashboard Personal" |
| **H3 (Encabezados)** | Syne | 600 | 24px | "Transcripciones Recientes" |
| **Cuerpo de Texto** | Inter | 400 | 16px | Párrafos, descripciones |
| **Pequeño/Etiquetas** | Inter | 400 | 14px | Labels, hints, badges |
| **Código/Monoespaciado** | JetBrains Mono | 400 | 14px | Texto de transcripción |
| **Botones** | Inter | 600 | 16px | "Transcribir", "Descargar" |

### Importación en `app/layout.tsx`

```jsx
import { Space_Grotesk, Syne, Inter, JetBrains_Mono } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '600', '700'] });
const syne = Syne({ subsets: ['latin'], weight: ['400', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '600'] });
```

---

## 8. ESTRUCTURA DE CARPETAS (Next.js + Django)

```
anyway-project/
├── frontend/                    # Next.js App Router
│   ├── app/
│   │   ├── layout.tsx          # Layout principal + Supabase Auth
│   │   ├── page.tsx            # Landing page (/)
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Dashboard personal (/dashboard)
│   │   ├── transcriptions/
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Vista detallada (/transcriptions/:id)
│   │   └── api/
│   │       └── auth/           # Rutas de autenticación
│   ├── components/
│   │   ├── LandingHero.tsx
│   │   ├── TranscriptionForm.tsx
│   │   ├── TranscriptionList.tsx
│   │   ├── AIAssistant.tsx
│   │   ├── ExportMenu.tsx
│   │   └── ui/                 # Componentes reutilizables
│   ├── lib/
│   │   ├── supabase.ts         # Cliente Supabase
│   │   ├── api.ts              # Funciones API
│   │   └── utils.ts
│   ├── styles/
│   │   └── globals.css         # Tailwind + Aurora Visual
│   └── package.json
│
├── backend/                     # Django + DRF
│   ├── manage.py
│   ├── requirements.txt
│   ├── config/
│   │   ├── settings.py         # Configuración Django
│   │   ├── urls.py             # Rutas principales
│   │   └── wsgi.py
│   ├── apps/
│   │   ├── auth/
│   │   │   ├── models.py
│   │   │   ├── views.py        # Vistas de autenticación
│   │   │   ├── serializers.py
│   │   │   └── urls.py
│   │   ├── transcriptions/
│   │   │   ├── models.py       # Modelos de BD
│   │   │   ├── views.py        # Vistas de transcripciones
│   │   │   ├── serializers.py
│   │   │   ├── urls.py
│   │   │   └── tasks.py        # Tareas async (Celery)
│   │   ├── ai/
│   │   │   ├── models.py
│   │   │   ├── views.py        # Vistas de IA
│   │   │   ├── serializers.py
│   │   │   ├── urls.py
│   │   │   └── prompts.py      # Prompts para IA
│   │   └── users/
│   │       ├── models.py
│   │       ├── views.py
│   │       └── serializers.py
│   ├── services/
│   │   ├── whisper_service.py  # Integración Whisper
│   │   ├── ai_service.py       # Integración IA (GPT-4, Claude)
│   │   ├── youtube_service.py  # Descarga de YouTube
│   │   └── storage_service.py  # Supabase Storage
│   └── tests/
│       ├── test_transcriptions.py
│       ├── test_ai.py
│       └── test_auth.py
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── API_SPEC.md
│   └── SETUP.md
│
└── README.md
```

---

## 9. FLUJO DE DESARROLLO (Modelado)

### Fase 1: Configuración Base
1. Crear proyecto Next.js con App Router
2. Configurar Django + DRF
3. Conectar Supabase (Auth + PostgreSQL + Storage)
4. Configurar variables de entorno (.env.local)

### Fase 2: Modelos de BD
1. Crear modelos Django (User, Transcription, AIInteraction, Export)
2. Ejecutar migraciones
3. Crear serializers DRF

### Fase 3: Autenticación
1. Integrar Supabase Auth en Next.js
2. Crear endpoints de autenticación en Django
3. Implementar middleware de protección

### Fase 4: Landing Page
1. Diseñar con Aurora Visual (lava-neón)
2. Implementar componentes (Hero, Features, CTA)
3. Responsive design

### Fase 5: Dashboard
1. Crear tabla de transcripciones
2. Implementar búsqueda y filtros
3. Botones de acción (Ver, Copiar, Descargar, Eliminar)

### Fase 6: Transcripción
1. Formulario de entrada (URL/archivo)
2. Integración con Whisper API
3. Guardado en BD
4. Vista detallada

### Fase 7: Asistente IA
1. Integración con GPT-4 / Claude
2. Prompts específicos (resumen, puntos clave, traducción)
3. Almacenamiento de resultados
4. Panel de IA en vista detallada

### Fase 8: Exportación
1. Descarga como .txt
2. Copia al portapapeles
3. Auditoría en tabla exports

### Fase 9: Testing y Optimización
1. Tests unitarios (pytest para Django, Jest para Next.js)
2. Tests de integración
3. Optimización de rendimiento

### Fase 10: Deployment
1. Deploy de Next.js (Vercel)
2. Deploy de Django (Railway, Render, Heroku)
3. Configuración de CORS y seguridad

---

## 10. REQUERIMIENTOS NO FUNCIONALES

| Requisito | Especificación |
|---|---|
| **Seguridad** | HTTPS, CORS configurado, JWT tokens, validación de entrada, sanitización de datos |
| **Rendimiento** | Tiempo de carga < 2s, API responde < 500ms, optimización de imágenes |
| **Escalabilidad** | Soportar 1000+ usuarios concurrentes, paginación de resultados, caché de IA |
| **Disponibilidad** | 99.5% uptime, backups automáticos, manejo de errores graceful |
| **Accesibilidad** | WCAG 2.1 AA, navegación por teclado, alt text en imágenes |
| **Responsividad** | Mobile-first, funciona en todos los navegadores modernos |
| **Auditoría** | Logs de acciones, historial de IA, estadísticas de uso |

---

## 11. CONSIDERACIONES ESPECIALES

### Límites de Uso (MVP)
- **Archivo de audio máximo:** 25MB (límite Whisper)
- **Transcripciones por usuario (free):** 10 por mes
- **Llamadas a IA por mes (free):** 50
- **Almacenamiento (free):** 100MB

### Futuras Mejoras
- Colaboración en tiempo real
- Compartición de transcripciones
- Plugins para plataformas educativas (Moodle, Canvas)
- Extensión de navegador
- Soporte para más idiomas
- Planes de pago (Pro, Enterprise)

---

## 12. RESUMEN EJECUTIVO

**Anyway...** es una plataforma web moderna de transcripción de audio con IA integrada. Utiliza **Next.js 14+ (App Router)** para el frontend con estética **Aurora Visual** (lava-neón), **Django + DRF** para el backend robusto, y **Supabase** (PostgreSQL + Auth + Storage) para infraestructura escalable. Permite a usuarios transcribir contenido educativo, procesarlo con IA (resúmenes, puntos clave, traducciones) y gestionar todo en un dashboard personal. La plataforma está diseñada para ser intuitiva, accesible y de alto rendimiento.

**Stack:** Next.js 14+ | Django 4.2+ | PostgreSQL (Supabase) | Supabase Auth | OpenAI Whisper | GPT-4/Claude | Tailwind CSS 4 | Aurora Visual

**Propósito:** Democratizar el acceso a contenido educativo en inglés mediante transcripción y traducción automática con IA.

