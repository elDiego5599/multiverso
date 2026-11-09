# Multiverso

Un archivo del universo de Rick y Morty. Busca personajes, abre su ficha y guarda a tus favoritos.

Hecho con Vite, React, TypeScript, React Router y Tailwind CSS. Los datos vienen de [The Rick and Morty API](https://rickandmortyapi.com).

## Qué se puede hacer

- Inicio con una presentación del proyecto
- Explorar: búsqueda en tiempo real, filtro por estado y paginación. La búsqueda queda guardada en la URL
- Ficha de cada personaje, con su propia petición a la API por id
- Favoritos que se guardan en el navegador y se mantienen al cambiar de página
- Contacto con formulario validado y confirmación antes de enviar
- Modo claro y oscuro, que recuerda tu elección
- Página 404

## Detalles

- Estados visibles de carga, error y sin resultados
- Avisos de éxito, error e información que desaparecen solos (hechos a mano, sin librerías)
- Confirmaciones con `<dialog>` nativo
- Un pop-up con trampas de diseño a propósito, explicadas en un comentario dentro de `NewsletterDialog.tsx`
- Etiquetas, roles y HTML semántico para lectores de pantalla

## Para correrlo

```bash
npm install
npm run dev
```

Para generar la versión de producción:

```bash
npm run build
```
