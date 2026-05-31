export const productos = [
  {
    id: 1,
    nombre: "Chaqueta Denim Re-Punk",
    precio: 'EUR 124',
    descripcion: "Denim recuperado con patches industriales y desgaste autentico.",
    detalle: 'Pieza unica intervenida a mano. Corte amplio, forro liviano y costuras reforzadas.',
    categoria: 'Usado',
    insignia: 'Autentico verificado',
    estadoInsignia: 'success',
    etiquetaImagen: 'Denim 90s',
  },
  {
    id: 2,
    nombre: "Sneakers Eco-Runner V1",
    precio: 'EUR 120',
    descripcion: 'Caucho reciclado, cuero vegano y suela de impacto urbano.',
    detalle: 'Calzado seleccionado por su vida util extendida. Limpieza profunda incluida.',
    categoria: 'Nuevo',
    insignia: 'Opcion sostenible',
    estadoInsignia: 'success',
    etiquetaImagen: 'Calzado',
  },
  {
    id: 3,
    nombre: "Camiseta Grafica Bio-War",
    precio: 'EUR 35',
    descripcion: 'Algodon organico deadstock con grafica rebel archive.',
    detalle: 'Remera liviana de calce recto, estampada en baja tirada para evitar excedentes.',
    categoria: 'Nuevo',
    insignia: 'Nuevo drop',
    estadoInsignia: 'warning',
    etiquetaImagen: 'Graphic Tee',
  },
  {
    id: 4,
    nombre: 'Pantalon Cargo Concrete',
    precio: 'EUR 85',
    descripcion: 'Canvas resistente, bolsillos tecnicos y ajuste relajado.',
    detalle: 'Prenda revisada por el archivo. Pequenas marcas de uso documentadas.',
    categoria: 'Usado',
    insignia: 'Poco stock',
    estadoInsignia: 'danger',
    etiquetaImagen: 'Cargo',
  },
]

export const pedidos = [
  {
    codigo: '#UR-98210',
    producto: "Chaqueta Denim Re-Punk",
    fecha: '14 Oct, 2024',
    talle: 'Talle L',
    total: 'EUR 124.00',
    estado: 'Entregado',
    tipoEstado: 'success',
    accion: 'Calificar',
  },
  {
    codigo: '#UR-97554',
    producto: 'Pantalon Cargo Concrete',
    fecha: '08 Oct, 2024',
    talle: 'Talle M',
    total: 'EUR 85.50',
    estado: 'Enviado',
    tipoEstado: 'warning',
    accion: 'Rastrear',
  },
  {
    codigo: '#UR-97011',
    producto: "Sneakers Eco-Runner V1",
    fecha: '02 Oct, 2024',
    talle: 'Talle 42',
    total: 'EUR 120.00',
    estado: 'Pendiente',
    tipoEstado: 'neutral',
    accion: 'Factura PDF',
  },
]

export const envios = [
  { id: '#URC-8924', cliente: 'Alex Chen', direccion: '124 Industrial Ave, Brooklyn NY', estado: 'Pendientes', prioridad: true },
  { id: '#URC-8925', cliente: 'Sarah Jenkins', direccion: '890 Neon St, Seattle WA', estado: 'Cancelado', prioridad: false },
  { id: '#URC-8920', cliente: 'Marcus Reed', direccion: '45 Concrete Way, Portland OR', estado: 'En transito', prioridad: false },
]

export const usuarios = [
  { nombre: 'Maria Garcia', id: 'URC-21', email: 'm.garcia@urbanrecycle.com', rol: 'ADMIN', estado: 'Activo' },
  { nombre: 'Javier Ruiz', id: 'URC-12', email: 'javier.ruiz@vendedor.es', rol: 'VENDEDOR', estado: 'Activo' },
  { nombre: 'Elena Soler', id: 'URC-3', email: 'e.soler@comprador.me', rol: 'COMPRADOR', estado: 'Inactivo' },
  { nombre: 'Roberto Sanz', id: 'URC-1', email: 'r.sanz@vendedor.es', rol: 'VENDEDOR', estado: 'Activo' },
]

export const facturas = [
  { id: '#INV-2023-001', fecha: '24/05/2024', cliente: 'Carlos Rodriguez', monto: '$124.50', estado: 'Pagado' },
  { id: '#INV-2023-002', fecha: '23/05/2024', cliente: 'Elena Martinez', monto: '$89.99', estado: 'Pendiente' },
  { id: '#INV-2023-003', fecha: '22/05/2024', cliente: 'Sofia Garcia', monto: '$210.00', estado: 'Pagado' },
  { id: '#INV-2023-004', fecha: '22/05/2024', cliente: 'Miguel Ruiz', monto: '$45.50', estado: 'Cancelado' },
]
