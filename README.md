# 📱 Ventas App

Aplicación móvil desarrollada con **React Native** + **Expo** para registrar ventas en mano de una marca de ropa. Permite gestionar una base de datos local, con funcionalidades completas de CRUD, filtros, exportación de datos y almacenamiento persistente.

## 🚀 Características

- ✅ Registro de ventas con los campos: artículo, talla, precio y fecha.
- 📝 Funcionalidad CRUD: crear, leer, editar y eliminar ventas.
- 💾 Almacenamiento local con `AsyncStorage`.
- 📅 Filtros por fecha y artículo.
- 📤 Exportación de ventas a formato CSV con `papaparse`.
- 🧠 Estilos modernos con Tailwind (via NativeWind).
- 🔒 Persistencia de datos sin conexión.

## 🛠️ Tecnologías utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [NativeWind](https://www.nativewind.dev/) (Tailwind CSS para React Native)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [React Navigation](https://reactnavigation.org/)
- [Papaparse](https://www.papaparse.com/)

## 📦 Instalación y ejecución

### Requisitos previos

- Node.js ≥ 18
- Git (opcional, solo si clonas el repositorio)
- Expo CLI (no global, usa `npx expo`)
- Un emulador Android/iOS o dispositivo físico

### Instrucciones

```bash
# 1. Clona el repositorio o descarga el ZIP
git clone https://github.com/openai-dev-helper/ventas-app-nativewind.git
cd ventas-app-nativewind

# 2. Instala las dependencias
npm install

# 3. Inicia el servidor de desarrollo
npx expo start
