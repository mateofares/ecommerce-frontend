# Urban Re-Cycle — Frontend

Marketplace de moda urbana de segunda mano. Permite a usuarios comprar y vender prendas verificadas, gestionar pedidos, calificar vendedores y administrar el catálogo desde un panel de administración.

## Tecnologías

- React 18 + Vite
- Redux Toolkit (createSlice, createAsyncThunk)
- React Router DOM
- Axios
- Tailwind CSS

## Requisitos previos

- Node.js 18+
- Backend corriendo en `http://localhost:8080` (ver instrucciones del backend)

## Instalación y ejecución

```bash
npm install
npm run dev
```

La app queda disponible en `http://localhost:5173`.

## Estructura del proyecto

```
src/
├── components/        # Componentes reutilizables por dominio
│   ├── auth/          # RutaProtegida, RutaAdmin
│   ├── formularios/   # FormularioLogin, FormularioProducto, FormularioTarjeta
│   ├── layout/        # Header, Footer, BarraLateral
│   ├── pedidos/       # TarjetaPedido
│   ├── perfil/        # PerfilCard, PerfilStats, ActividadReciente, MisDirecciones
│   ├── productos/     # TarjetaProducto, SeccionProductos, ModalEditarProducto
│   ├── resenias/      # TarjetaResena, SelectorEstrellas
│   └── ui/            # Boton, InsigniaEstado, SelectorTalle, TablaDatos, etc.
├── layouts/           # PlantillaMarketplace, PlantillaAdmin
├── pages/
│   ├── admin/         # Dashboard, Envios, Productos, Usuarios, Facturas
│   └── usuario/       # Inicio, Productos, Detalle, Carrito, Checkout, Compras, Perfil, Vender, Calificar
├── redux/             # Slices y thunks por dominio
│   ├── store.js
│   ├── authSlice.js
│   ├── productoSlice.js
│   ├── carritoSlice.js
│   ├── ordenSlice.js
│   ├── pagoSlice.js
│   ├── envioSlice.js
│   ├── facturaSlice.js
│   ├── reseniaSlice.js
│   ├── direccionSlice.js
│   ├── descuentoSlice.js
│   └── usuarioSlice.js
└── styles/            # CSS global y por módulo
```

## Flujo principal

1. El usuario se registra o inicia sesión (`/login`)
2. Explora el catálogo con filtros (`/productos`)
3. Agrega productos al carrito y completa el checkout (`/checkout`)
4. Visualiza sus compras y califica vendedores (`/compras`, `/calificar`)
5. Publica sus propias prendas (`/vender`, `/mis-productos`)
6. Administradores gestionan usuarios, envíos y facturas desde `/admin`

## Vistas principales

| Ruta | Vista |
|------|-------|
| `/` | Home |
| `/login` | Login / Registro |
| `/productos` | Catálogo con filtros |
| `/producto/:id` | Detalle de producto |
| `/carrito` | Carrito |
| `/checkout` | Checkout |
| `/compras` | Historial de compras |
| `/calificar/:ordenId/:productoId` | Calificar compra |
| `/perfil` | Perfil del usuario |
| `/vender` | Publicar producto |
| `/mis-productos` | Mis productos publicados |
| `/admin` | Dashboard admin |
| `/admin/envios` | Gestión de envíos |
| `/admin/productos` | Gestión de productos |
| `/admin/usuarios` | Gestión de usuarios |
| `/admin/facturas` | Gestión de facturas |
