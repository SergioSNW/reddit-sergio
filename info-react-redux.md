# Vamos a ver un ejemplo **completo y sencillo** de Redux con acciones normales y thunks, usando Redux Toolkit y React.

## 1. Reducer y Slice

Creamos un slice con dos acciones:
- **sumar**: acción normal, incrementa un contador.
- **sumarAsync**: thunk, suma después de 1 segundo.

```js
// contadorSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Estado inicial
const initialState = {
  valor: 0,
};

const contadorSlice = createSlice({
  name: 'contador',
  initialState,
  reducers: {
    sumar(state) {
      state.valor += 1;
    },
  },
});

// Acción thunk
export const sumarAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(sumar());
  }, 1000);
};

export const { sumar } = contadorSlice.actions;
export default contadorSlice.reducer;
```

## 2. Configuración del Store

```js
// store.js
import { configureStore } from '@reduxjs/toolkit';
import contadorReducer from './contadorSlice';

const store = configureStore({
  reducer: {
    contador: contadorReducer,
  },
});

export default store;
```

## 3. Componente React

```jsx
// Contador.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sumar, sumarAsync } from './contadorSlice';

export default function Contador() {
  const valor = useSelector((state) => state.contador.valor);
  const dispatch = useDispatch();

  return (
    
      Contador: {valor}
       dispatch(sumar())}>
        Sumar ahora
      
       dispatch(sumarAsync())}>
        Sumar después de 1 segundo
      
    
  );
}
```

## 4. Integración en la App

```jsx
// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Contador from './Contador';

function App() {
  return (
    
      
    
  );
}

export default App;
```

## 5. ¿Qué sucede cuando pulsas los botones?

- **Sumar ahora**:  
  Llama a la acción normal `sumar`, el contador sube inmediatamente.

- **Sumar después de 1 segundo**:  
  Llama al thunk `sumarAsync`, que espera 1 segundo y luego despacha la acción `sumar`.

## 6. Resumen visual

- **Acción normal**:  
  ```js
  dispatch(sumar()); // sube el contador ya
  ```

- **Thunk**:  
  ```js
  dispatch(sumarAsync()); // sube el contador tras 1 segundo
  ```

¿Te gustaría que te explique alguna parte con más detalle, o quieres probarlo y preguntar sobre el resultado?¡Perfecto! Vamos a ver un ejemplo **completo y sencillo** de Redux con acciones normales y thunks, usando Redux Toolkit y React.

## 1. Reducer y Slice

Creamos un slice con dos acciones:
- **sumar**: acción normal, incrementa un contador.
- **sumarAsync**: thunk, suma después de 1 segundo.

```js
// contadorSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Estado inicial
const initialState = {
  valor: 0,
};

const contadorSlice = createSlice({
  name: 'contador',
  initialState,
  reducers: {
    sumar(state) {
      state.valor += 1;
    },
  },
});

// Acción thunk
export const sumarAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(sumar());
  }, 1000);
};

export const { sumar } = contadorSlice.actions;
export default contadorSlice.reducer;
```

## 2. Configuración del Store

```js
// store.js
import { configureStore } from '@reduxjs/toolkit';
import contadorReducer from './contadorSlice';

const store = configureStore({
  reducer: {
    contador: contadorReducer,
  },
});

export default store;
```

## 3. Componente React

```jsx
// Contador.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sumar, sumarAsync } from './contadorSlice';

export default function Contador() {
  const valor = useSelector((state) => state.contador.valor);
  const dispatch = useDispatch();

  return (
    
      Contador: {valor}
       dispatch(sumar())}>
        Sumar ahora
      
       dispatch(sumarAsync())}>
        Sumar después de 1 segundo
      
    
  );
}
```

## 4. Integración en la App

```jsx
// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Contador from './Contador';

function App() {
  return (
    
      
    
  );
}

export default App;
```

## 5. ¿Qué sucede cuando pulsas los botones?

- **Sumar ahora**:  
  Llama a la acción normal `sumar`, el contador sube inmediatamente.

- **Sumar después de 1 segundo**:  
  Llama al thunk `sumarAsync`, que espera 1 segundo y luego despacha la acción `sumar`.

## 6. Resumen visual

- **Acción normal**:  
  ```js
  dispatch(sumar()); // sube el contador ya
  ```

- **Thunk**:  
  ```js
  dispatch(sumarAsync()); // sube el contador tras 1 segundo
  ```



#
# Aquí tienes una explicación visual y clara de **cómo interactúan store, reducer, slice, dispatch, select y los componentes** en una aplicación React con Redux Toolkit:

## 1. Estructura de alto nivel

| Elemento     | ¿Qué hace?                                                                                   | ¿Dónde se define?              |
|--------------|---------------------------------------------------------------------------------------------|-------------------------------|
| **store**    | Es el objeto único que contiene todo el estado global de la app                              | `store.js`                    |
| **slice**    | Define una porción del estado, sus acciones y reducers asociados                             | `contadorSlice.js`, etc.      |
| **reducer**  | Función pura que indica cómo cambia el estado según la acción recibida                       | Generado por cada slice       |
| **dispatch** | Función que envía acciones (acciones normales o thunks) al store                             | Usado en componentes          |
| **select**   | Selector: función que lee una parte del estado del store                                     | Usado en componentes          |
| **componente** | Lógica visual que usa `dispatch` y `select` para interactuar con el store                 | Archivos `.jsx`               |

## 2. Flujo de datos en Redux (unidireccional)

1. **El componente** despacha una acción usando `dispatch` (por ejemplo, al hacer clic en un botón).
2. **El store** recibe la acción y la pasa al reducer correspondiente.
3. **El reducer** (definido en el slice) calcula el nuevo estado según la acción.
4. **El store** actualiza el estado global con el nuevo valor.
5. **Los componentes** que usan `useSelector` para leer ese estado se actualizan automáticamente[1][2][4][5][6].

## 3. Ejemplo visual y código simplificado

### Slice (contadorSlice.js)

```js
import { createSlice } from '@reduxjs/toolkit';

const contadorSlice = createSlice({
  name: 'contador',
  initialState: { valor: 0 },
  reducers: {
    sumar(state) {
      state.valor += 1;
    },
  },
});

export const { sumar } = contadorSlice.actions;
export default contadorSlice.reducer;
```

### Store (store.js)

```js
import { configureStore } from '@reduxjs/toolkit';
import contadorReducer from './contadorSlice';

const store = configureStore({
  reducer: {
    contador: contadorReducer, // Aquí se conecta el reducer del slice al store
  },
});

export default store;
```

### Componente React (Contador.jsx)

```jsx
import { useDispatch, useSelector } from 'react-redux';
import { sumar } from './contadorSlice';

function Contador() {
  const valor = useSelector((state) => state.contador.valor); // select
  const dispatch = useDispatch();

  return (
    
      {valor}
       dispatch(sumar())}>Sumar
    
  );
}
```

### Integración en la app principal

```jsx
import { Provider } from 'react-redux';
import store from './store';
import Contador from './Contador';

function App() {
  return (
    
      
    
  );
}
```

## 4. Resumen gráfico del flujo

```
[Componente] --(dispatch)--> [Store] --(acción)--> [Reducer (en Slice)] --(nuevo estado)--> [Store] --(useSelector)--> [Componente]
```

### **Puntos clave**

- El **store** es el centro de todo el estado de la app[3][4][5].
- Los **reducers** definen cómo cambia el estado, y se crean automáticamente con cada slice[7][8].
- Los **slices** agrupan estado, reducers y acciones relacionados.
- **dispatch** envía acciones al store.
- **useSelector** (o selectores) permiten a los componentes leer el estado.
- Los componentes nunca modifican el estado directamente, solo despachan acciones[1][2][3][5][6].

## Referencia a paginas relacionadas:
- [1] https://imaginaformacion.com/tutoriales/que-es-y-como-usar-redux-en-react
- [2] https://www.hackio.com/blog/redux-el-patron-de-arquitectura-de-datos
- [3] http://blog.enriqueoriol.com/2018/08/que-es-redux.html
- [4] https://carlosazaustre.es/como-funciona-redux-conceptos-basicos
- [5] https://antonio-richaud.com/blog/archivo/publicaciones/05-redux.html
- [6] https://blog.openreplay.com/es/entender-redux-react-gestionar-estado/
- [7] https://oxygenacademy.es/que-es-redux-y-por-que-deberias-implementarlo-en-tus-aplicaciones-react/
- [8] https://leanpub.com/react-redux/read
- [9] https://keepcoding.io/blog/funcionamiento-de-redux-con-vue/

