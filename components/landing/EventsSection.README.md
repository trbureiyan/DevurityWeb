# Sección de Eventos y Noticias - EventsSection

## 📋 Descripción

Sección que muestra las últimas noticias y eventos del semillero Devurity con un diseño moderno inspirado en el mockup de Figma.

## 🎨 Diseño

### Layout
- **Dos columnas**:
  - **Izquierda**: Imagen decorativa con figuras geométricas (cyberpunk style)
  - **Derecha**: Tarjetas de noticias con bordes de colores

### Características visuales
- Título: "ÚLTIMAS NOTICIAS" alineado a la derecha
- 3 tarjetas de noticias con bordes de diferentes colores
- Cada tarjeta incluye: título, fecha, descripción y tags
- Imagen de fondo con overlay y figuras geométricas SVG

## 📦 Datos

Los datos de las noticias se encuentran en `/lib/constants/landing.ts`:

```typescript
interface NewsEvent {
  id: number;
  title: string;
  date: string;
  description: string;
  tags: string[];
  borderColor: string; // Color del borde de la tarjeta
}
```

### Colores de borde por defecto
- Noticia 1: `#d5d9e9` (gris claro)
- Noticia 2: `#63768d` (azul grisáceo)
- Noticia 3: `#b89e9e` (rosa grisáceo)

## 🖼️ Imagen decorativa

Actualmente usa: `/images/landing/cyberpunkWoman.webp`

### Para cambiar la imagen:
1. Coloca la nueva imagen en `/public/images/landing/`
2. Actualiza la ruta en el componente EventsSection.tsx
3. Recomendaciones:
   - Formato: WebP, JPG o PNG
   - Dimensiones: mínimo 1200x800px
   - Tema: tecnología, personas, o abstracto
   - Orientación: horizontal o cuadrada

## 🎯 Cómo actualizar las noticias

1. Edita el array `LATEST_NEWS` en `/lib/constants/landing.ts`
2. Cada noticia debe tener:
   - `id`: único
   - `title`: título de la noticia
   - `date`: fecha del evento
   - `description`: descripción breve
   - `tags`: array de strings (máximo 5 tags)
   - `borderColor`: color hexadecimal para el borde

### Ejemplo:
```typescript
{
  id: 4,
  title: "Nueva alianza con empresa tech",
  date: "15 de noviembre 2025",
  description: "Devurity firma convenio con TechCorp para proyectos conjuntos.",
  tags: ["Alianza", "Empresas", "Proyectos", "Innovación"],
  borderColor: "#a8c5e0",
}
```

## ✨ Efectos interactivos

- **Hover en tarjetas**: Escala 1.02x
- **Transiciones**: Suaves en 300ms
- **Cursor**: Pointer en tarjetas (preparado para links futuros)

## 📱 Responsive

- **Móvil**: Columna única, imagen debajo
- **Tablet**: Columna única optimizada
- **Desktop**: Dos columnas (imagen izquierda, noticias derecha)

## 🔜 Mejoras futuras sugeridas

1. Agregar links a páginas de detalle de cada noticia
2. Sistema de paginación o "ver más noticias"
3. Filtrado por tags
4. Animaciones de entrada (scroll animations)
5. Conectar con CMS o base de datos
