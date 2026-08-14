# TEBA Travel · Sitio web

Landing de una página para TEBA Travel, construida a partir del **Manual de Marca v1.0**.
Sitio estático (HTML + CSS + JS), sin build ni dependencias — listo para desplegar en **Vercel**.

## Estructura

```
teba-web/
├── index.html          Página principal
├── styles.css          Sistema visual (colores, tipografía y tokens del manual)
├── script.js           Menú, formulario, WhatsApp, animaciones
├── vercel.json         Configuración de Vercel (URLs limpias + caché de assets)
└── assets/brand/       Logos y favicons de la marca
```

## Antes de publicar — edita estos datos

Abre `script.js` y cambia el bloque `TEBA` (arriba del todo):

```js
const TEBA = {
  whatsapp: '573000000000',        // ← tu número de WhatsApp, con código de país, sin + ni espacios
  email:    'marca@tebatravel.com', // ← correo donde quieres recibir las cotizaciones
  waMsgDefault: 'Hola Teba 👋, quiero información sobre un viaje.'
};
```

## Desplegar en Vercel

**Opción A — arrastrar y soltar (la más rápida)**
1. Entra a https://vercel.com y crea una cuenta (gratis).
2. En el dashboard, arrastra la carpeta `teba-web` completa a la zona de "deploy".
3. Vercel la publica en segundos y te da una URL `.vercel.app`.

**Opción B — con Git (recomendada para seguir editando)**
1. Sube esta carpeta a un repositorio en GitHub.
2. En Vercel: *Add New → Project → Import* el repositorio.
3. Framework Preset: **Other** (es un sitio estático, no necesita build).
4. *Deploy*. Cada cambio que subas a GitHub se publica solo.

**Dominio propio:** en Vercel → *Settings → Domains* puedes conectar `tebatravel.com`.

## Sobre las imágenes

Las secciones visuales usan fondos de marca (navy + símbolo) como base.
Para darle vida con fotografía real, sigue la dirección del manual: luz natural,
horizontes amplios, personas de espaldas al viaje — nunca banco de imágenes posado.
Puedes reemplazar los paneles `.hero__panel` por fotos cuando las tengas.
