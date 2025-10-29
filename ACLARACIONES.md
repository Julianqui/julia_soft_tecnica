# Aclaraciones Técnicas del Proyecto

## 1. React Avanzado

### Hooks

- **useState**:

  - En `PhraseForm/index.tsx` para manejar el estado del input (`newPhrase`)
  - En `withLoading.tsx` para manejar el estado de carga

- **useReducer**:

  - En `context/PhrasesContext.tsx` para manejar el estado global de las frases y búsqueda
  - Implementa un patrón de reducer similar a Redux pero nativo de React

- **useCallback**:

  - En `context/PhrasesContext.tsx` para memorizar las funciones:
    ```typescript
    const addPhrase = useCallback((text: string) => {
      dispatch({ type: "ADD_PHRASE", payload: text });
    }, []);
    ```

- **useMemo**:
  - En `context/PhrasesContext.tsx` para optimizar el filtrado de frases:
    ```typescript
    const filteredPhrases = useMemo(() => {
      return state.phrases.filter((phrase) =>
        phrase.text.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }, [state.phrases, state.searchQuery]);
    ```

### Higher Order Components (HOC)

- Implementado en `hoc/withLoading.tsx`
- Ejemplo de uso en `SearchBar/index.tsx`:
  ```typescript
  export const SearchBar = withLoading(SearchBarComponent);
  ```
- Agrega funcionalidad de loading state a cualquier componente

### Render Props

- Implementado en `components/IntersectionObserver/index.tsx`
- Permite la reutilización de lógica de intersección observer
- Ejemplo de patrón de render prop:
  ```typescript
  <IntersectionObserver
    render={(isIntersecting) => (
      // Renderizado condicional basado en isIntersecting
    )}
  />
  ```

### Context API

- Implementado en `context/PhrasesContext.tsx`
- Provee estado global para:
  - Lista de frases
  - Query de búsqueda
  - Funciones de manejo (add, delete, search)

## 2. ES6+ Features

### Destructuring

```typescript
const { phrases } = usePhrases();
const { searchQuery, setSearchQuery } = usePhrases();
```

### Arrow Functions

```typescript
const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
  setSearchQuery(e.target.value);
};
```

### Spread Operator

```typescript
return {
  ...state,
  phrases: filteredPhrases,
};
```

### Template Literals

Usados en los estilos y clases dinámicas

### Async/Await

- Implementado en `hooks/useAsync.ts`
- Ejemplo de uso:

```typescript
const execute = async (asyncFunction: () => Promise<T>) => {
  try {
    const result = await asyncFunction();
    // ...
  } catch (error) {
    // ...
  }
};
```

## 3. Optimizaciones de Rendimiento

### Memoization

- **useMemo**: Para evitar recálculos innecesarios del filtrado de frases
- **useCallback**: Para evitar recreaciones de funciones

### Debouncing

- Implementado en `hooks/useDebounce.ts`
- Aplicado en SearchBar para optimizar las búsquedas:

```typescript
const debouncedSetSearchQuery = useDebounce((value: string) => {
  setSearchQuery(value);
}, 300);
```

## 4. TypeScript

### Interfaces

```typescript
interface Phrase {
  id: string;
  text: string;
  createdAt: Date;
}
```

### Tipos Genéricos

```typescript
export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({...});
}
```

### Type Guards

Implementados en las validaciones de context

## 5. Closures

- En `hooks/useDebounce.ts`:
  - La función debounced mantiene acceso al scope exterior
  - Mantiene referencia a timeoutRef incluso después de que la función original ha terminado

## 6. Arquitectura y Estructura

### Organización de Carpetas

```
src/
  components/           # Componentes con estructura feature-first
    PhraseCard/        # Cada componente en su propia carpeta
    PhraseForm/
    SearchBar/
    PhraseGrid/
  context/             # Context API y lógica de estado global
  hooks/               # Hooks personalizados
  hoc/                 # Higher Order Components
```

### Componentes

- Cada componente tiene su propio módulo CSS
- Separación clara de responsabilidades
- Componentes presentacionales vs. contenedores

## 7. Posibles Mejoras Futuras

1. Implementar tests unitarios y de integración
2. Agregar persistencia de datos
3. Implementar infinite scroll usando IntersectionObserver
4. Agregar animaciones de transición
5. Implementar modo oscuro usando CSS variables
6. Agregar categorización de frases
7. Implementar undo/redo usando el patrón Command
