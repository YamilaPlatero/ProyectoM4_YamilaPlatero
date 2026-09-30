# 📝 Gestor de Tareas & Contact API (PI4 - FS)

Link Deploy : https://pim4-proyecto.vercel.app/      


Aplicación Full-Stack para la gestión de tareas personales con autenticación de usuarios y servicio de mensajería/contacto integrado mediante funciones Serverless y **AWS SES (Simple Email Service)**. Desarrollado como Proyecto Individual para el Módulo 4 (PI4) Full Stack.

---

## 🚀 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Documentación de la API](#-documentación-de-la-api)
  - [`POST /api/send-email`](#post-apisend-email)
- [Instalación y Configuración](#-instalación-y-configuración)
  - [Requisitos Previos](#requisitos-previos)
  - [Variables de Entorno](#variables-de-entorno)
  - [Ejecución en Desarrollo](#ejecución-en-desarrollo)
- [Scripts Disponibles](#-scripts-disponibles)
- [Testing](#-testing)
- [Despliegue](#-despliegue)
- [Autor](#-autor)

---

## ✨ Características Principales

1. **🔐 Autenticación de Usuarios:**
   - Registro e inicio de sesión seguro gestionado con **Firebase Authentication**.
   - Persistencia de sesión con React Context y Hooks personalizados (`useAuth`).
   - Rutas protegidas (`ProtectedRoute`) para restringir el acceso a usuarios no autenticados.

2. **📋 Gestor de Tareas (CRUD):**
   - Creación, listado, cambio de estado (completada/pendiente) y eliminación de tareas.
   - Almacenamiento en tiempo real con **Firebase Cloud Firestore**.
   - Aislamiento de datos: cada usuario solo accede y gestiona sus propias tareas.

3. **✉️ API Serverless de Contacto & Envío de Correos:**
   - Endpoint backend `/api/send-email` implementado como Vercel Serverless Function con Node.js & TypeScript.
   - Integración con **AWS SDK v3 (@aws-sdk/client-ses)** para envío confiable de correos electrónicos transaccionales.
   - Validaciones de esquema, formato de email y manejo estructurado de errores HTTP.

4. **🧪 Testing Automatizado:**
   - Suite de pruebas unitarias y de integración implementada con **Vitest** y **React Testing Library**.

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** (con TypeScript y Hooks)
- **Vite** (bundler y entorno de desarrollo ultra rápido)
- **React Router DOM v7** (enrutamiento del cliente y navegación protegida)
- **CSS3 / Vanilla CSS** (estilos modulares, responsivos y dinámicos)

### Backend & Servicios en la Nube
- **Vercel Serverless Functions** (TypeScript / Node.js)
- **AWS Simple Email Service (SES)** (`@aws-sdk/client-ses` v3)
- **Firebase Authentication** (Gestión de usuarios y sesiones)
- **Firebase Cloud Firestore** (Base de datos NoSQL para tareas)

### Testing & Calidad de Código
- **Vitest** (Test runner)
- **React Testing Library** (`@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`)
- **JSDOM**

---

## 📂 Estructura del Proyecto

```text
PI4/
├── api/                           # Funciones Serverless (Backend / Vercel Functions)
│   └── send-email.ts              # Endpoint POST /api/send-email (AWS SES)
├── src/                           # Código fuente Frontend (React + TypeScript)
│   ├── components/                # Componentes reutilizables (TodoForm, TodoList, etc.)
│   ├── context/                   # Contextos de React (AuthContext)
│   ├── features/                  # Módulos por feature (auth, tareas)
│   ├── hooks/                     # Custom hooks (useAuth, useTareas)
│   ├── pages/                     # Vistas / Páginas (Home, Tareas, Contacto, Login, Register)
│   ├── routes/                    # Configuración de rutas y ProtectedRoute
│   ├── services/                  # Clientes externos (Firebase, apiClient)
│   ├── types/                     # Definiciones de TypeScript e interfaces
│   ├── utils/                     # Utilidades auxiliares
│   ├── App.tsx                    # Componente principal con Layout y Navbar
│   ├── index.css                  # Estilos globales de la aplicación
│   ├── main.tsx                   # Punto de entrada de React
│   └── setupTests.ts              # Configuración global para pruebas
├── tests/                         # Suites de pruebas con Vitest
│   ├── components/                # Tests de componentes
│   ├── hooks/                     # Tests de hooks personalizados
│   └── mocks/                     # Mocks para Firebase y servicios
├── .env.example                   # Plantilla de variables de entorno
├── package.json                   # Dependencias y scripts del proyecto
├── tsconfig.json                  # Configuración del compilador de TypeScript
├── vercel.json                    # Reglas de enrutamiento y reescritura para Vercel
└── vite.config.ts                 # Configuración de Vite y Vitest
```

---

## 📡 Documentación de la API

### `POST /api/send-email`

Envía un correo electrónico transaccional a través de AWS SES a partir de los datos recibidos en el formulario de contacto.


## ⚙️ Instalación y Configuración

### Requisitos Previos
- **Node.js**: v18.0.0 o superior
- **npm**: v9.0.0 o superior
- Cuenta de **Firebase** con un proyecto configurado (Auth + Firestore).
- Cuenta de **AWS** con credenciales y servicio **SES** habilitado/verificado.
- Cuenta en **Vercel** (para despliegue o ejecución local con Vercel CLI).

### 1. Clonar el repositorio e instalar dependencias

```bash
git clone https://github.com/YamilaPlatero/ProyectoM4_YamilaP
cd PI4
npm install
```

### 2. Variables de Entorno

```env
# Configuración de Firebase
VITE_FIREBASE_API_KEY=tu_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_APP_ID=tu_app_id

# Configuración de AWS SES
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=tu_aws_access_key_id
AWS_SECRET_ACCESS_KEY=tu_aws_secret_access_key
AWS_SES_FROM_EMAIL=correo_verificado_en_ses@tudominio.com
AWS_SES_TO_EMAIL=correo_destino_opcional@tudominio.com
```

---

## 💻 Scripts Disponibles

En el directorio del proyecto puedes ejecutar:

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo de Vite (Frontend en `http://localhost:5173`). |
| `npm run dev:vercel` | Inicia el entorno local de Vercel emulando las funciones Serverless (`/api/*`) y el frontend simultáneamente. |
| `npm run build` | Compila TypeScript y genera el bundle optimizado para producción en `dist/`. |
| `npm run preview` | Previsualiza localmente el build de producción. |
| `npm test` | Ejecuta la suite de pruebas unitarias con **Vitest**. |

---

## 🧪 Testing

Para ejecutar los tests automatizados:

```bash

npm test
```

Los tests cubren:
- Renderizado, validación y eventos de formularios (`TodoForm.test.tsx`).
- Inicialización y flujo de autenticación en custom hooks (`useAuth.test.tsx`).
- Mocks para el SDK de Firebase.

---

## 🚢 Despliegue

El proyecto está configurado para desplegarse fácilmente en **Vercel**

---

## 👩‍💻 Autor

- **Yamila Platero** - *Proyecto Individual M4 (PI4)  Full Stack*
