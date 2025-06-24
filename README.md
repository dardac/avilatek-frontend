# Globetrotter

**Globetrotter** es una aplicación web para gestionar reservas de viajes, construida con **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**, y **React Hook Form**. Permite a los usuarios completar un flujo de reserva en cuatro pasos: ingresar detalles del viaje, información de viajeros, servicios adicionales y confirmación de la reserva. La aplicación utiliza un contexto global (`ReservationContext`) para gestionar el estado.

## Características

- **Flujo de Reserva en Múltiples Pasos**:
  - **Paso 1**: Detalles del viaje (destino, clase de vuelo, fechas).
  - **Paso 2**: Información de viajeros (nombre, documento, mascotas, equipaje extra).
  - **Paso 3**: Servicios adicionales (seguro de viaje, asientos preferenciales, asistencia especial).
  - **Paso 4**: Confirmación de la reserva con un resumen detallado.
- **Estado Global**: Usa `ReservationContext` para gestionar los datos de la reserva entre pasos.
- **Formateo Automático**: Configurado con **Prettier** para mantener un código consistente, incluyendo ordenamiento de clases de Tailwind CSS.
- **Interfaz Responsive**: Estilizada con **Tailwind CSS** para una experiencia de usuario fluida en dispositivos móviles y de escritorio.
- **Validaciones de Formularios**: Implementadas con **React Hook Form** para una mejor experiencia de usuario.
- **Componentes Reutilizables**: Incluye componentes personalizados (`Button`, `Card`, `Input`, etc.) en `components/`.
- **Indicador de Progreso**: Un componente `StepIndicator` muestra el progreso del usuario en el flujo de reserva.

## Tecnologías

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Hook Form**
- **Lucide React** (íconos)
- **Headless UI** (componentes accesibles como Switch y Dialog)
- **Prettier** (formateo de código)
- **Vercel** (despliegue)

## Requisitos Previos

- **Node.js**: Versión 18.x o superior
- **Yarn**: Yarn Berry

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/dardac/avilatek-frontend
   cd avilatek-frontend
   ```

2. Instala las dependencias:

   ```bash
   yarn
   ```

## Ejecución Local

1. Inicia el servidor de desarrollo:

   ```bash
   yarn dev
   ```

2. Abre la aplicación en tu navegador:

   ```
   http://localhost:3000
   ```

   - La página inicial (`/`) redirige automáticamente a `/step-1`.

## Scripts Disponibles

- `yarn dev`: Inicia el servidor de desarrollo.
- `yarn build`: Genera una build de producción.
- `yarn start`: Inicia la aplicación en modo producción.
- `yarn lint`: Ejecuta ESLint para verificar el código.
- `yarn format`: Formatea todos los archivos con Prettier.

## Despliegue

La aplicación está configurada para desplegarse fácilmente en **Vercel**:

1. Despliega:
   ```bash
   git push origin main
   ```
   Vercel detectará los cambios y desplegará automáticamente.

2. Verifica la URL de producción `https://avilatek-frontend-chi.vercel.app`.

## Mejoras recomendadas, adicionales a lo requerido
- **Protección de Rutas**: Agregar un middleware (`middleware.ts`) y validaciones del lado del cliente (cookies) para asegurar que los usuarios no puedan acceder a pasos posteriores sin completar los anteriores.
- **Envío de reserva**: Enviar al correo electrónico del usuario(previamente obtenido) los detalles de la reserva.
- **Mostrar totales**: Mostrar en la confirmación, el total en USD de la reserva (con mascotas, maletas y servicios adicionales).