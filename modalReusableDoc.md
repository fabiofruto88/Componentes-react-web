# Documentación Detallada: Componente ReusableModal

## Índice
1. [Introducción](#introducción)
2. [Estructura del Componente](#estructura-del-componente)
3. [Props y Configuración](#props-y-configuración)
4. [Análisis de Cada Sección](#análisis-de-cada-sección)
   - [Importaciones](#importaciones)
   - [Documentación JSDoc](#documentación-jsdoc)
   - [Función renderIconOrImage](#función-rendericonorimage)
   - [Estructura Principal del Diálogo](#estructura-principal-del-diálogo)
   - [Estilos y Personalización](#estilos-y-personalización)
5. [Patrones de Diseño Implementados](#patrones-de-diseño-implementados)
6. [Decisiones de Diseño y Alternativas](#decisiones-de-diseño-y-alternativas)
7. [Buenas Prácticas Implementadas](#buenas-prácticas-implementadas)
8. [Ejemplos de Uso](#ejemplos-de-uso)
9. [Resolución de Problemas Comunes](#resolución-de-problemas-comunes)
10. [Consideraciones para el Rendimiento](#consideraciones-para-el-rendimiento)

---

## Introducción

El componente `ReusableModal` es un modal personalizable para aplicaciones React con Material UI y Next.js. Está diseñado siguiendo principios de reutilización, configurabilidad y fácil mantenimiento. Este componente permite mostrar mensajes, advertencias o información al usuario con una interfaz consistente que incluye opciones para personalizar iconos, imágenes, títulos, descripciones y botones.

Este documento explica en detalle la implementación, patrones de diseño, y mejores prácticas utilizadas en el componente.

---

## Estructura del Componente

El código completo del componente es el siguiente:

```jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Stack,
  Typography,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

/**
 * ReusableModal - Un componente de modal personalizable
 * 
 * @param {Object} props
 * @param {boolean} props.open - Controla si el modal está abierto
 * @param {function} props.onClose - Función a llamar al cerrar el modal
 * @param {string} props.title - Título opcional para el modal
 * @param {string} props.description - Texto de descripción para el modal
 * @param {React.ReactNode} props.icon - Componente de icono a mostrar
 * @param {string} props.iconColor - Color para el icono (por defecto: "#1FFF79")
 * @param {string|Object} props.image - Fuente de imagen opcional o componente a mostrar en lugar del icono
 * @param {Object} props.confirmButton - Configuración para el botón de confirmación
 * @param {string} props.confirmButton.text - Texto para el botón de confirmación
 * @param {function} props.confirmButton.onClick - Función a llamar cuando se hace clic en el botón de confirmación
 * @param {Object} props.confirmButton.sx - Estilos adicionales para el botón de confirmación
 * @param {string} props.maxWidth - Ancho máximo del diálogo ("xs", "sm", "md", "lg", "xl")
 * @param {Object} props.sx - Estilos adicionales para el componente Paper del diálogo
 * @returns {React.ReactElement}
 */
const ReusableModal = ({
  open,
  onClose,
  title,
  description,
  icon,
  iconColor = "#1FFF79",
  image,
  confirmButton = {
    text: "Confirmar",
    onClick: () => {},
    sx: {},
  },
  maxWidth = "xs",
  sx = {},
}) => {
  // Determina si mostrar un icono o una imagen
  const renderIconOrImage = () => {
    if (image) {
      // Verifica si es un objeto de imagen importado de Next.js
      if (typeof image === 'object' && 'src' in image) {
        return (
          <Box sx={{ width: '80px', height: '80px', position: 'relative' }}>
            <Image 
              src={image} 
              alt="Icono del modal"
              width={80}
              height={80}
              style={{ objectFit: 'contain' }}
            />
          </Box>
        );
      } 
      // Si es una cadena de texto (URL), renderiza una etiqueta img básica
      else if (typeof image === 'string') {
        return (
          <Box
            component="img"
            src={image}
            alt="Icono del modal"
            sx={{
              width: '80px',
              height: '80px',
              objectFit: 'contain',
            }}
          />
        );
      } 
      // Si es otro tipo de componente, simplemente renderízalo
      else {
        return image;
      }
    }

    // Si se proporciona un icono, clónalo con el color especificado
    if (icon) {
      return React.cloneElement(icon, {
        sx: {
          fontSize: "80px",
          color: iconColor,
          ...(icon.props.sx || {}),
        },
      });
    }

    // Retorna null si no se proporciona ni icono ni imagen
    return null;
  };

  return (
    <Dialog
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      open={open}
      PaperProps={{
        style: {
          backgroundColor: "#2B2B2B",
          borderRadius: "13px",
          ...sx,
        },
      }}
    >
      {title && (
        <DialogTitle sx={{ backgroundColor: "transparent", color: "#FFFFFF" }}>
          {title}
        </DialogTitle>
      )}
      
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "#1FFF79",
        }}
      >
        <CloseIcon />
      </IconButton>
      
      <DialogContent>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          gap={3}
        >
          {renderIconOrImage()}
          
          {description && (
            <Typography color="#FFFFFF">
              {description}
            </Typography>
          )}
        </Stack>
      </DialogContent>
      
      <DialogActions sx={{ pb: 4 }}>
        <Button
          sx={{
            borderRadius: "12px",
            mx: "auto",
            backgroundColor: "#1FFF79",
            color: "#2B2B2B",
            '&:hover': {
              backgroundColor: "#19CC61",
            },
            ...confirmButton.sx,
          }}
          onClick={confirmButton.onClick}
        >
          {confirmButton.text}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReusableModal;
```

---

## Props y Configuración

El componente acepta las siguientes props para su personalización:

| Prop | Tipo | Descripción | Valor predeterminado |
|------|------|-------------|---------------------|
| `open` | boolean | Controla si el modal está abierto o cerrado | - |
| `onClose` | function | Función que se llama al cerrar el modal | - |
| `title` | string | Título opcional para el modal | - |
| `description` | string | Texto de descripción para el modal | - |
| `icon` | React.ReactNode | Componente de icono a mostrar | - |
| `iconColor` | string | Color para el icono | "#1FFF79" |
| `image` | string\|Object | Imagen o componente a mostrar en lugar del icono | - |
| `confirmButton` | Object | Configuración para el botón de confirmación | Ver abajo |
| `confirmButton.text` | string | Texto para el botón | "Confirmar" |
| `confirmButton.onClick` | function | Función a llamar al hacer clic en el botón | () => {} |
| `confirmButton.sx` | Object | Estilos adicionales para el botón | {} |
| `maxWidth` | string | Ancho máximo del diálogo | "xs" |
| `sx` | Object | Estilos adicionales para el modal | {} |

---

## Análisis de Cada Sección

### Importaciones

```jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Stack,
  Typography,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
```

**Explicación:**
- Importamos `React` para poder crear nuestro componente funcional.
- De Material UI, importamos varios componentes:
  - `Dialog`, `DialogTitle`, `DialogContent`, `DialogActions`: Componentes base para crear diálogos o modales en Material UI.
  - `IconButton`, `Button`: Componentes para botones.
  - `Stack`: Contenedor que organiza elementos en filas o columnas con espaciado consistente.
  - `Typography`: Componente para mostrar texto con estilos consistentes.
  - `Box`: Componente versátil que sirve como contenedor con propiedades de estilo.
- `CloseIcon`: Icono de "cerrar" de Material UI.
- `Image`: Componente optimizado de Next.js para manejar imágenes.

**Buenas prácticas:**
1. Importamos solo lo que necesitamos, no todo el paquete de Material UI.
2. Agrupamos las importaciones relacionadas para mejorar la legibilidad.
3. Separamos las importaciones de diferentes paquetes (React, Material UI, Next.js).

---

### Documentación JSDoc

```jsx
/**
 * ReusableModal - Un componente de modal personalizable
 * 
 * @param {Object} props
 * @param {boolean} props.open - Controla si el modal está abierto
 * ...
 * @returns {React.ReactElement}
 */
```

**Explicación:**
- Utilizamos la sintaxis JSDoc para documentar nuestro componente.
- Describimos el propósito del componente y detallamos cada prop con su tipo y descripción.

**Buenas prácticas:**
1. La documentación completa ayuda a otros desarrolladores (y a tu futuro yo) a entender cómo usar el componente.
2. Especificar tipos facilita la comprensión y previene errores.
3. Describir cada prop proporciona contexto sobre su propósito.

---

### Desestructuración de Props

```jsx
const ReusableModal = ({
  open,
  onClose,
  title,
  description,
  icon,
  iconColor = "#1FFF79",
  image,
  confirmButton = {
    text: "Confirmar",
    onClick: () => {},
    sx: {},
  },
  maxWidth = "xs",
  sx = {},
}) => {
```

**Explicación:**
- Utilizamos la desestructuración de objetos de JavaScript para extraer las props directamente en la definición del componente.
- Asignamos valores predeterminados para algunas props (`iconColor`, `confirmButton`, `maxWidth`, `sx`).
- Proporcionamos un objeto completo como valor predeterminado para `confirmButton` con sus propias propiedades predeterminadas.

**Buenas prácticas:**
1. La desestructuración mejora la legibilidad al hacer explícitas las props que utiliza el componente.
2. Los valores predeterminados aseguran que el componente funcione incluso si no se proporcionan todas las props.
3. Para objetos complejos, proporcionamos un objeto completo con valores predeterminados.

**¿Por qué así y no de otra forma?**
- Podríamos haber utilizado `props` directamente (como `props.open`, `props.onClose`), pero la desestructuración es más limpia y explícita.
- La asignación de valores predeterminados en la desestructuración es más concisa que hacerlo dentro del cuerpo de la función.

---

### Función renderIconOrImage

```jsx
// Determina si mostrar un icono o una imagen
const renderIconOrImage = () => {
  if (image) {
    // Verifica si es un objeto de imagen importado de Next.js
    if (typeof image === 'object' && 'src' in image) {
      return (
        <Box sx={{ width: '80px', height: '80px', position: 'relative' }}>
          <Image 
            src={image} 
            alt="Icono del modal"
            width={80}
            height={80}
            style={{ objectFit: 'contain' }}
          />
        </Box>
      );
    } 
    // Si es una cadena de texto (URL), renderiza una etiqueta img básica
    else if (typeof image === 'string') {
      return (
        <Box
          component="img"
          src={image}
          alt="Icono del modal"
          sx={{
            width: '80px',
            height: '80px',
            objectFit: 'contain',
          }}
        />
      );
    } 
    // Si es otro tipo de componente, simplemente renderízalo
    else {
      return image;
    }
  }

  // Si se proporciona un icono, clónalo con el color especificado
  if (icon) {
    return React.cloneElement(icon, {
      sx: {
        fontSize: "80px",
        color: iconColor,
        ...(icon.props.sx || {}),
      },
    });
  }

  // Retorna null si no se proporciona ni icono ni imagen
  return null;
};
```

**Explicación:**
- Esta función determina qué elemento visual (icono o imagen) mostrar en el modal.
- Implementa lógica para manejar diferentes tipos de datos para la prop `image`:
  1. **Objeto de imagen de Next.js**: Contiene una propiedad `src`.
  2. **URL como string**: Una ruta o URL directa a una imagen.
  3. **Componente React**: Cualquier otro tipo de componente.
- Para los iconos de Material UI, utilizamos `React.cloneElement` para modificar sus propiedades.

**Patrones implementados:**
1. **Strategy Pattern (Patrón Estrategia)**: Seleccionamos diferentes estrategias de renderizado basadas en el tipo de entrada.
2. **Adapter Pattern (Patrón Adaptador)**: Adaptamos diferentes formatos de entrada (objeto Next.js, URL, componente) a una salida consistente.

**Buenas prácticas:**
1. Separamos la lógica de renderizado en una función específica para mejorar la legibilidad y mantenimiento.
2. Manejamos múltiples casos de uso, haciendo el componente más versátil.
3. Utilizamos comprobaciones de tipo para determinar el comportamiento adecuado.
4. Respetamos las propiedades existentes al clonar elementos (con `...(icon.props.sx || {})`).

**¿Por qué así y no de otra forma?**
- **¿Por qué no usar un único enfoque para todas las imágenes?** Porque los diferentes tipos de imágenes requieren diferentes tratamientos. El componente `Image` de Next.js proporciona optimizaciones importantes, pero las URLs directas necesitan un enfoque diferente.
- **¿Por qué usar `React.cloneElement`?** Permite modificar las propiedades de un componente existente sin tener que crear uno nuevo desde cero. Es ideal para aplicar el color personalizado a los iconos.
- **¿Por qué devolver `null` si no hay imagen ni icono?** Es una práctica común en React: devolver `null` de un componente o función de renderizado hace que no se renderice nada, evitando errores o espacios vacíos.

---

### Estructura Principal del Diálogo

```jsx
return (
  <Dialog
    onClose={onClose}
    fullWidth
    maxWidth={maxWidth}
    open={open}
    PaperProps={{
      style: {
        backgroundColor: "#2B2B2B",
        borderRadius: "13px",
        ...sx,
      },
    }}
  >
    {title && (
      <DialogTitle sx={{ backgroundColor: "transparent", color: "#FFFFFF" }}>
        {title}
      </DialogTitle>
    )}
    
    <IconButton
      onClick={onClose}
      sx={{
        position: "absolute",
        right: 8,
        top: 8,
        color: "#1FFF79",
      }}
    >
      <CloseIcon />
    </IconButton>
    
    <DialogContent>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        gap={3}
      >
        {renderIconOrImage()}
        
        {description && (
          <Typography color="#FFFFFF">
            {description}
          </Typography>
        )}
      </Stack>
    </DialogContent>
    
    <DialogActions sx={{ pb: 4 }}>
      <Button
        sx={{
          borderRadius: "12px",
          mx: "auto",
          backgroundColor: "#1FFF79",
          color: "#2B2B2B",
          '&:hover': {
            backgroundColor: "#19CC61",
          },
          ...confirmButton.sx,
        }}
        onClick={confirmButton.onClick}
      >
        {confirmButton.text}
      </Button>
    </DialogActions>
  </Dialog>
);
```

**Explicación por partes:**

#### 1. Componente Dialog Principal
```jsx
<Dialog
  onClose={onClose}
  fullWidth
  maxWidth={maxWidth}
  open={open}
  PaperProps={{
    style: {
      backgroundColor: "#2B2B2B",
      borderRadius: "13px",
      ...sx,
    },
  }}
>
```
- `onClose`: Función que se llama cuando el usuario cierra el modal.
- `fullWidth`: Hace que el modal ocupe todo el ancho disponible según el valor de `maxWidth`.
- `maxWidth`: Limita el ancho máximo del modal ("xs", "sm", "md", "lg", "xl").
- `open`: Controla si el modal está abierto o cerrado.
- `PaperProps`: Permite personalizar el estilo del componente `Paper` interno del diálogo, que es el contenedor principal.

**Buenas prácticas:**
1. Pasamos las props directamente al componente de Material UI para mantener su funcionalidad.
2. Usamos `...sx` para permitir que el usuario extienda los estilos predeterminados.

#### 2. Título Condicional
```jsx
{title && (
  <DialogTitle sx={{ backgroundColor: "transparent", color: "#FFFFFF" }}>
    {title}
  </DialogTitle>
)}
```
- Renderizamos el título solo si se proporciona (renderizado condicional).
- Aplicamos estilos consistentes con el tema del modal.

**Buenas prácticas:**
1. El renderizado condicional evita elementos vacíos en el DOM.

#### 3. Botón de Cierre
```jsx
<IconButton
  onClick={onClose}
  sx={{
    position: "absolute",
    right: 8,
    top: 8,
    color: "#1FFF79",
  }}
>
  <CloseIcon />
</IconButton>
```
- Botón de cierre posicionado absolutamente en la esquina superior derecha.
- Utiliza la misma función `onClose` que se pasa al componente principal.

**Buenas prácticas:**
1. Posicionamiento absoluto para mantener una ubicación consistente independientemente del contenido.
2. Reutilizamos la función `onClose` para mantener un comportamiento coherente.

#### 4. Contenido Principal
```jsx
<DialogContent>
  <Stack
    direction="column"
    justifyContent="center"
    alignItems="center"
    textAlign="center"
    gap={3}
  >
    {renderIconOrImage()}
    
    {description && (
      <Typography color="#FFFFFF">
        {description}
      </Typography>
    )}
  </Stack>
</DialogContent>
```
- Utilizamos `Stack` para organizar verticalmente el contenido con un espaciado consistente.
- Llamamos a nuestra función `renderIconOrImage()` para mostrar el icono o imagen.
- Renderizamos condicionalmente la descripción.

**Buenas prácticas:**
1. Utilizamos componentes de diseño apropiados (Stack) para organizar el contenido.
2. Centramos todo el contenido para una apariencia coherente.
3. Renderizado condicional para la descripción.

#### 5. Acciones del Diálogo
```jsx
<DialogActions sx={{ pb: 4 }}>
  <Button
    sx={{
      borderRadius: "12px",
      mx: "auto",
      backgroundColor: "#1FFF79",
      color: "#2B2B2B",
      '&:hover': {
        backgroundColor: "#19CC61",
      },
      ...confirmButton.sx,
    }}
    onClick={confirmButton.onClick}
  >
    {confirmButton.text}
  </Button>
</DialogActions>
```
- Usamos `DialogActions` para la sección de botones (siguiendo la estructura de Material UI).
- Centramos el botón con `mx: "auto"`.
- Aplicamos estilos consistentes con el tema.
- Permitimos personalización a través de `confirmButton.sx`.
- Usamos la función `onClick` proporcionada en `confirmButton`.

**Buenas prácticas:**
1. Seguimos la estructura recomendada por Material UI para diálogos.
2. Permitimos personalización mientras mantenemos una apariencia predeterminada coherente.
3. Utilizamos estados hover para mejorar la experiencia del usuario.

---

## Patrones de Diseño Implementados

### 1. Patrón de Componente de Presentación (Presentational Component)
Este componente es puramente presentacional, no contiene lógica de negocio o estado interno. Recibe datos a través de props y renderiza la UI correspondiente.

**Ventajas:**
- Fácil de probar, ya que el comportamiento está determinado completamente por las props.
- Fácil de reutilizar en diferentes contextos.
- Clara separación de responsabilidades.

### 2. Patrón de Composición
Combinamos múltiples componentes de Material UI para crear un componente más complejo y especializado.

**Ventajas:**
- Aprovechamos la funcionalidad existente sin duplicar código.
- Mantenemos una estructura de código organizada y comprensible.

### 3. Patrón de Estrategia (para renderIconOrImage)
Implementamos diferentes estrategias de renderizado basadas en el tipo de entrada.

**Ventajas:**
- Código más mantenible y escalable.
- Facilita la adición de nuevos tipos de entrada en el futuro.

### 4. Renderizado Condicional
Utilizamos el operador `&&` para renderizar elementos solo cuando se cumplen ciertas condiciones.

**Ventajas:**
- UI más limpia, evitando elementos vacíos.
- Código más declarativo y legible.

---

## Decisiones de Diseño y Alternativas

### 1. Manejo de Imágenes y Iconos

**Decisión:** Permitir múltiples formatos de entrada (URL, objeto Next.js, componente) y manejarlos de manera diferente.

**Alternativas consideradas:**
- **Restringir a un solo formato:** Habría simplificado el código, pero limitado la flexibilidad.
- **Implementar normalizadores separados:** Podríamos haber creado funciones separadas para normalizar cada tipo de entrada antes de procesarla.

**Razón de la elección:**
El enfoque actual proporciona máxima flexibilidad mientras mantiene una complejidad razonable. Permite a los usuarios utilizar tanto importaciones estáticas como URLs dinámicas.

### 2. Estructura de Props

**Decisión:** Usar objetos anidados para configuraciones complejas (como `confirmButton`).

**Alternativas consideradas:**
- **Props planas:** `confirmButtonText`, `confirmButtonClick`, etc.
- **Funciones de renderizado:** `renderConfirmButton={() => ...}`

**Razón de la elección:**
Los objetos anidados agrupan props relacionadas, lo que hace más intuitivo el uso del componente y facilita la extensión futura sin cambiar la API.

### 3. Estilización

**Decisión:** Combinar estilos predeterminados con la capacidad de extenderlos mediante props `sx`.

**Alternativas consideradas:**
- **Temas completos:** Depender completamente del sistema de temas de Material UI.
- **Estilos fijos:** Sin posibilidad de personalización.

**Razón de la elección:**
Este enfoque proporciona una apariencia consistente por defecto, pero permite la personalización cuando sea necesario, ofreciendo el mejor equilibrio entre coherencia y flexibilidad.

---

## Buenas Prácticas Implementadas

### 1. Documentación Completa
- JSDoc detallado para el componente y sus props.
- Comentarios en secciones críticas de código.

### 2. Valores Predeterminados
- Proporcionamos valores predeterminados sensatos para props opcionales.
- Esto hace que el componente sea más fácil de usar sin configuración excesiva.

### 3. Renderizado Condicional
- Elementos como el título y la descripción solo se renderizan si están presentes.

### 4. Composición sobre Herencia
- Construimos nuestro componente componiendo elementos más pequeños, no heredando de clases existentes.

### 5. Props Explícitas
- Todas las props están claramente definidas y documentadas.
- No usamos `{...restProps}` que podría pasar props inesperadas.

### 6. Respeto por las Props del Usuario
- Mantenemos las props de estilo del usuario con `...confirmButton.sx` y `...sx`.
- Para los iconos, preservamos sus props originales con `...(icon.props.sx || {})`.

### 7. Componente Funcional
- Usamos un componente funcional en lugar de un componente de clase.
- Esto está alineado con las prácticas modernas de React y facilita la adopción de Hooks si es necesario en el futuro.

---

## Ejemplos de Uso

### 1. Modal de Verificación de Correo

```jsx
import EmailIcon from '@mui/icons-material/Email';

// En tu componente:
const [emailModalOpen, setEmailModalOpen] = useState(false);

<ReusableModal
  open={emailModalOpen}
  onClose={() => setEmailModalOpen(false)}
  icon={<EmailIcon />}
  description="Verifica tu bandeja de entrada (también en spam) en tu correo para activar tu cuenta."
  confirmButton={{
    text: "Reenviar correo",
    onClick: handleResendEmail
  }}
/>
```

### 2. Modal de Advertencia

```jsx
import WarningIcon from '@mui/icons-material/Warning';

<ReusableModal
  open={warningModalOpen}
  onClose={() => setWarningModalOpen(false)}
  title="¡Advertencia!"
  icon={<WarningIcon />}
  iconColor="#FFC107"  // Color amarillo para advertencia
  description="¡No se encontraron rutinas, mákina! Pero tranqui, que eso no significa que no haya opciones. Ajusta los parámetros y prueba de nuevo, ¡vamos con toda!"
  confirmButton={{
    text: "Entendido",
    onClick: () => setWarningModalOpen(false),
    sx: { backgroundColor: "#FFC107" }  // Personalizando el color del botón
  }}
/>
```

### 3. Modal con Imagen Importada

```jsx
import imgMancuernaRota from "@/images/icon-mancuerna-rota.svg";

<ReusableModal
  open={modalAbierto}
  onClose={cerrarModal}
  title="¡Hey familia! En este momento no estamos en vivo 💥!"
  description="Pero no te preocupes, regresa más tarde. Recuerda que los en vivos son de lunes a viernes a las 8:30 AM hora Colombia 🇨🇴 y 2:30 PM hora España 🇪🇸. ¡Nos vemos en el próximo! 🔥"
  image={imgMancuernaRota}
  confirmButton={{
    text: "Entendido",
    onClick: cerrarModal
  }}
/>
```

---

## Resolución de Problemas Comunes

### 1. El modal no se abre
- Verifica que la prop `open` sea `true`.
- Confirma que el componente `ReusableModal` está siendo renderizado (no dentro de un bloque condicional que evalúa a `false`).

### 2. Problemas con las imágenes
- Para imágenes importadas de Next.js: Asegúrate de que la importación es correcta.
- Para URLs: Verifica que la ruta sea accesible.
- Para componentes: Asegúrate de que el componente sea válido y no devuelva `null`.

### 3. Los estilos no se aplican
- Revisa si estás sobrescribiendo los estilos con la prop `sx`.
- Para estilos específicos de Material UI, asegúrate de usar la sintaxis correcta (por ejemplo, `'&:hover'` para estilos de hover).

### 4. El botón de confirmación no hace nada
- Verifica que `confirmButton.onClick` sea una función válida.
- Comprueba si hay errores en la consola de JavaScript.

---

## Consideraciones para el Rendimiento

### 1. Renderizado Condicional
El uso de renderizado condicional (`{title && <DialogTitle>...}`) evita renderizar elementos innecesarios, lo que puede mejorar el rendimiento en algunos casos.

### 2. Componente Next.js Image
La utilización del componente `Image` de Next.js proporciona optimizaciones automáticas:
- Carga diferida (lazy loading)
- Redimensionamiento automático
- Optimización de formato de imagen
- Mejor Core Web Vitals

### 3. Memoización (Posible mejora)
Si el componente se vuelve más complejo o maneja mucha interactividad, considera utilizar `React.memo` o Hooks como `useMemo` y `useCallback` para evitar re-renderizados innecesarios.

```jsx
// Ejemplo de cómo podría implementarse con React.memo
const ReusableModal = React.memo(({
  // props...
}) => {
  // Implementación...
});

// O con useCallback para funciones internas
const renderIconOrImage = useCallback(() => {
  // Implementación...
}, [image, icon, iconColor]);
```

### 4. Evitar Re-renders Innecesarios
La función `renderIconOrImage` se recrea en cada renderizado. Si este componente se utiliza en contextos de rendimiento crítico, considera extraerla fuera del componente o memorizarla.

---

## Extensiones y Mejoras Futuras

### 1. Soporte para Múltiples Botones
Extender el componente para soportar múltiples botones de acción:

```jsx
<ReusableModal
  // ...otras props
  buttons={[
    {
      text: "Cancelar",
      onClick: handleCancel,
      variant: "outlined",
      sx: { color: "#999" }
    },
    {
      text: "Confirmar",
      onClick: handleConfirm,
      variant: "contained",
      sx: { backgroundColor: "#1FFF79" }
    }
  ]}
/>
```

### 2. Soporte para Animaciones
Añadir soporte para animaciones al abrir/cerrar el modal:

```jsx
<ReusableModal
  // ...otras props
  animation="fade" // o "slide", "zoom", etc.
  animationDuration={300}
/>
```

### 3. Sistema de Temas
Implementar un sistema de temas completo en lugar de colores fijos:

```jsx
<ReusableModal
  // ...otras props
  theme="warning" // o "success", "error", "info"
/>
```

### 4. Accesibilidad Mejorada
Añadir más atributos de accesibilidad y soporte para navegación con teclado:

```jsx
<ReusableModal
  // ...otras props
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
  initialFocus="#confirm-button"
/>
```

---

## Consideraciones de Accesibilidad

### 1. Estado Actual
El componente actual tiene algunas consideraciones básicas de accesibilidad:
- Utiliza componentes de Material UI que ya incluyen algunos atributos de accesibilidad.
- Incluye textos alternativos para imágenes.

### 2. Áreas de Mejora
Para mejorar la accesibilidad, se podrían implementar:
- Atributos ARIA para mejorar la navegación con lectores de pantalla.
- Foco mejorado para navegación con teclado.
- Contraste de colores adecuado para usuarios con discapacidad visual.
- Tamaños de texto ajustables.

### 3. Conformidad con WCAG
Para lograr conformidad con las Pautas de Accesibilidad para el Contenido Web (WCAG):
- Asegurar que todos los elementos interactivos sean accesibles por teclado.
- Proporcionar nombres y roles apropiados para todos los elementos interactivos.
- Mantener un contraste de color suficiente entre texto y fondo.
- Asegurar que el modal capture el foco cuando se abre.

---

## Estrategias de Prueba

### 1. Pruebas Unitarias
Pruebas para verificar el comportamiento básico del componente:

```jsx
// Ejemplo con Jest y React Testing Library
test('renders modal when open is true', () => {
  const { getByText } = render(
    <ReusableModal
      open={true}
      title="Test Title"
      description="Test Description"
      onClose={() => {}}
    />
  );
  
  expect(getByText('Test Title')).toBeInTheDocument();
  expect(getByText('Test Description')).toBeInTheDocument();
});

test('does not render modal when open is false', () => {
  const { queryByText } = render(
    <ReusableModal
      open={false}
      title="Test Title"
      description="Test Description"
      onClose={() => {}}
    />
  );
  
  expect(queryByText('Test Title')).not.toBeInTheDocument();
});
```

### 2. Pruebas de Integración
Probar cómo el modal interactúa con otros componentes:

```jsx
test('closes modal when confirm button is clicked', () => {
  const handleClose = jest.fn();
  const { getByText } = render(
    <ReusableModal
      open={true}
      title="Test Title"
      confirmButton={{
        text: "Confirm",
        onClick: handleClose
      }}
      onClose={handleClose}
    />
  );
  
  fireEvent.click(getByText('Confirm'));
  expect(handleClose).toHaveBeenCalledTimes(1);
});
```

### 3. Pruebas de Accesibilidad
Verificar que el componente cumpla con estándares de accesibilidad:

```jsx
test('modal has proper accessibility attributes', async () => {
  const { container } = render(
    <ReusableModal
      open={true}
      title="Test Title"
      description="Test Description"
      onClose={() => {}}
    />
  );
  
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## Conclusiones y Mejores Prácticas

El componente `ReusableModal` demuestra varias mejores prácticas en el desarrollo de React:

### Principios generales
1. **Componente reutilizable**: Diseñado para ser utilizado en múltiples contextos con diferentes configuraciones.
2. **API clara y documentada**: Props bien documentadas que hacen evidente cómo utilizar el componente.
3. **Valores predeterminados sensatos**: Funciona con una configuración mínima pero permite personalización.
4. **Separación de responsabilidades**: El componente maneja solo la presentación, delegando el comportamiento a las funciones proporcionadas.

### Lecciones aprendidas
1. **Adaptabilidad**: El manejo de diferentes tipos de entradas (iconos, imágenes) demuestra cómo hacer un componente adaptable.
2. **Equilibrio entre simplicidad y flexibilidad**: El componente ofrece opciones de personalización sin complicar innecesariamente la API.
3. **Integración de bibliotecas**: Muestra cómo integrar Material UI y Next.js de manera efectiva.

### Recomendaciones para desarrolladores
1. **Entender el caso de uso**: Antes de utilizar este componente, entiende tus requisitos específicos y cómo este componente puede adaptarse a ellos.
2. **Personalizar con cuidado**: Utiliza las opciones de personalización (`sx`, `confirmButton.sx`) para adaptarlo a tu diseño sin romper la consistencia.
3. **Considerar la accesibilidad**: Si utilizas este componente en una aplicación producción, considera implementar las mejoras de accesibilidad mencionadas.
4. **Probar en diferentes contextos**: Asegúrate de probar el componente en diferentes tamaños de pantalla y con diferentes tipos de contenido.

---

## Glosario de Términos

- **Props**: Propiedades que se pasan a un componente de React para configurar su comportamiento y apariencia.
- **JSX**: Extensión de sintaxis de JavaScript que permite escribir elementos de UI similares a HTML dentro de JavaScript.
- **Renderizado condicional**: Técnica en React para renderizar elementos solo cuando se cumplen ciertas condiciones.
- **Componente de presentación**: Componente que se centra en cómo se ven las cosas, sin lógica de estado o negocio significativa.
- **Material UI**: Biblioteca de componentes de React que implementa el diseño Material Design de Google.
- **Next.js**: Framework de React que proporciona funcionalidades como renderizado del lado del servidor (SSR) y optimización de imágenes.
- **Memoización**: Técnica de optimización que almacena resultados de operaciones costosas para evitar cálculos repetidos.
- **Desestructuración**: Sintaxis de JavaScript que permite extraer valores de objetos o arrays directamente en variables.
- **Patrón de Estrategia**: Patrón de diseño que permite seleccionar un algoritmo en tiempo de ejecución.
- **WCAG**: Web Content Accessibility Guidelines, pautas internacionales para hacer el contenido web más accesible.

---

## Referencias y Recursos

### Documentación Oficial
- [Material UI Dialog](https://mui.com/material-ui/react-dialog/)
- [Next.js Image Component](https://nextjs.org/docs/api-reference/next/image)
- [React Documentation](https://reactjs.org/docs/getting-started.html)

### Artículos y Tutoriales
- [React Component Patterns](https://reactpatterns.com/)
- [Accesible Modal Dialogs](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [React Performance Optimization](https://reactjs.org/docs/optimizing-performance.html)

### Herramientas
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Axe - Accessibility Testing](https://www.deque.com/axe/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
