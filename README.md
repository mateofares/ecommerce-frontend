# Urban Re-Cycle — Rebel Grit

Marketplace de moda urbana de segunda mano. Permite comprar y vender prendas verificadas, gestionar pedidos y administrar la plataforma desde un panel dedicado.

Proyecto desarrollado para la materia Desarrollo Frontend — React (2025).

## Tecnologías

- React 19 + Vite
- React Router DOM v7
- Tailwind CSS v4
- react-icons

## Instalación

```bash
npm install
```

## Uso

```bash
npm run dev


La app corre por defecto en `http://localhost:5173`.

## Estructura

```
src/
├── components/   # Componentes reutilizables
├── pages/
│   ├── usuario/  # Vistas del marketplace
│   └── admin/    # Panel de administración
├── layouts/      # PlantillaMarketplace y PlantillaAdmin
├── datos/        # Mock data
└── styles/       # CSS modular
```

## Vistas principales

| Ruta | Vista |
|------|-------|
| `/` | Home |
| `/productos` | Catálogo |
| `/producto/:id` | Detalle de producto |
| `/carrito` | Carrito |
| `/checkout` | Checkout |
| `/compras` | Historial de compras |
| `/admin` | Panel de administración |
