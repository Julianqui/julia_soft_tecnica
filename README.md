# Phrase Manager Application

Una aplicación de gestión de frases construida con React, TypeScript y Vite. Permite crear, buscar y eliminar frases con una interfaz moderna y responsive.

## 🚀 Características

- ✅ **Agregar frases**: Formulario intuitivo para crear nuevas frases
- ✅ **Búsqueda en tiempo real**: Filtrado instantáneo con debouncing
- ✅ **Eliminar frases**: Botón de eliminación en cada tarjeta
- ✅ **Diseño responsive**: Adaptable a móviles, tablets y desktop
- ✅ **Persistencia local**: Los datos se guardan en localStorage
- ✅ **Internacionalización**: Soporte para español e inglés
- ✅ **Layout de dos columnas**: Formulario a la izquierda, frases a la derecha

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Styled Components** - CSS-in-JS
- **React i18next** - Internacionalización

### Testing
- **Jest** - Framework de testing
- **React Testing Library** - Testing de componentes
- **ts-jest** - Integración TypeScript con Jest

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **Prettier** - Formateo de código
- **TypeScript** - Compilador y type checker

## 🏗️ Arquitectura del Proyecto

### Patrones de React Avanzado
- **Hooks personalizados**: `useDebounce`, `useAsync`
- **Higher Order Components**: `withLoading`
- **Render Props**: `IntersectionObserver`
- **Context API**: Estado global con `PhrasesContext`

### Gestión de Estado
- **useReducer**: Patrón reducer para actualizaciones de estado
- **useContext**: Estado global compartido
- **useMemo/useCallback**: Optimizaciones de rendimiento

### Estructura de Carpetas
```
src/
├── components/           # Componentes UI
│   ├── PhraseCard/      # Tarjeta individual de frase
│   ├── PhraseForm/      # Formulario de agregar frases
│   ├── PhraseGrid/      # Grid de frases
│   ├── SearchBar/       # Barra de búsqueda
│   └── IntersectionObserver/ # Hook de intersección
├── context/             # Context API
│   └── PhrasesContext.tsx
├── hooks/               # Hooks personalizados
│   ├── useAsync.ts
│   └── useDebounce.ts
├── hoc/                 # Higher Order Components
│   └── withLoading.tsx
├── locales/             # Traducciones
│   ├── es.json
│   └── en.json
├── styles/              # Estilos globales
│   └── colors.ts
└── types/               # Definiciones de tipos
    └── index.ts
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd quinteiro_sooft_tecnica

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run test         # Ejecutar tests
npm run test:watch   # Tests en modo watch
npm run lint         # Linting del código
```

## 🧪 Testing

El proyecto incluye tests completos usando Jest y React Testing Library:

```bash
# Ejecutar todos los tests
npm test

# Tests en modo watch
npm run test:watch

# Tests con coverage
npm test -- --coverage
```

### Cobertura de Tests
- ✅ Componentes individuales
- ✅ Hooks personalizados
- ✅ Context providers
- ✅ Integración de componentes
- ✅ Interacciones de usuario

## 🎨 Características Técnicas

### Optimizaciones de Rendimiento
- **Memoización**: `useMemo` para filtrado de frases
- **Callbacks optimizados**: `useCallback` para funciones
- **Debouncing**: Búsqueda optimizada con delay de 300ms
- **Lazy loading**: Componentes cargados bajo demanda

### TypeScript
- **Tipado fuerte**: Interfaces para todos los componentes
- **Genéricos**: Hooks reutilizables con tipos genéricos
- **Type guards**: Validaciones de tipos en runtime
- **Strict mode**: Configuración estricta habilitada

### ES6+ Features
- **Destructuring**: Extracción de propiedades de objetos
- **Arrow functions**: Funciones concisas
- **Spread operator**: Clonación y fusión de objetos
- **Template literals**: Strings dinámicos
- **Async/await**: Manejo de operaciones asíncronas
- **Closures**: Encapsulación de estado en hooks

## 🌐 Internacionalización

La aplicación soporta múltiples idiomas:
- **Español** (por defecto)
- **Inglés**

Los textos se cargan dinámicamente desde archivos JSON en `src/locales/`.

## 📱 Responsive Design

- **Desktop**: Layout de dos columnas (50%-50%)
- **Tablet**: Layout apilado verticalmente
- **Mobile**: Diseño optimizado para pantallas pequeñas

## 🔧 Configuración de Desarrollo

### ESLint
Configuración personalizada con reglas de TypeScript y React:
```bash
npm run lint
```

### TypeScript
Configuración estricta en `tsconfig.json`:
- Strict mode habilitado
- Path mapping configurado
- Excludes optimizados

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
```

Los archivos estáticos se generan en la carpeta `dist/` y están listos para desplegar en cualquier servidor web estático.

### Variables de Entorno
No se requieren variables de entorno para el funcionamiento básico. La aplicación funciona completamente en el cliente.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Julian Quinteiro**
- GitHub: [@julianquinteiro](https://github.com/julianquinteiro)

## 🙏 Agradecimientos

- React team por la excelente documentación
- Vite team por la herramienta de build
- Styled Components por la solución CSS-in-JS
- Testing Library por la filosofía de testing centrada en el usuario