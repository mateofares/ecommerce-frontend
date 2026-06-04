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
    imagen: '/imagenes/chaqueta-punk.jpg',
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
    productId: 1,
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
    productId: 4,
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
    productId: 2,
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

export const carrito = [
  {
    id: 1,
    nombre: 'Chaqueta Denim Re-Punk',
    precio: 'EUR 124',
    etiquetaImagen: 'Denim 90s',
    talle: 'M',
    garantia: '12 meses',
    reparacion: true,
  },
  {
    id: 2,
    nombre: 'Sneakers Eco-Runner V1',
    precio: 'EUR 120',
    etiquetaImagen: 'Calzado',
    talle: 'M',
    garantia: '12 meses',
    reparacion: true,
  },
]

export const resumenCarrito = {
  subtotal: 'EUR 244.00',
  envio: 'EUR 8.00',
  total: 'EUR 252.00',
}

export const resumenCheckout = {
  articulos: 2,
  subtotal: 'EUR 244.00',
  envio: 'EUR 8.00',
  total: 'EUR 252.00',
}

export const resenas = [
  {
    id: 1,
    productId: 1,
    usuario: 'Sofía R.',
    iniciales: 'SR',
    color: '#1a5c3a',
    estrellas: 5,
    fecha: '12 Nov, 2024',
    comentario: 'Una pieza increíble. Los patches son auténticos y el denim tiene ese peso perfecto de los 90s. La compré sin saber muy bien qué esperar y superó todo.',
  },
  {
    id: 2,
    productId: 1,
    usuario: 'Mateo F.',
    iniciales: 'MF',
    color: '#7c3aed',
    estrellas: 4,
    fecha: '03 Nov, 2024',
    comentario: 'Muy buena calidad para ser una prenda de segunda mano. El desgaste es real, no fabricado. Le saco una estrella porque tardó un poco más en llegar.',
  },
  {
    id: 3,
    productId: 1,
    usuario: 'Lucia M.',
    iniciales: 'LM',
    color: '#b45309',
    estrellas: 5,
    fecha: '28 Oct, 2024',
    comentario: 'Corte amplio tal como lo dice la descripción. Lo usé el primer día que llegó. La tela es gruesa y se siente duradera. Totalmente recomendado.',
  },
  {
    id: 4,
    productId: 2,
    usuario: 'Diego V.',
    iniciales: 'DV',
    color: '#0369a1',
    estrellas: 5,
    fecha: '15 Nov, 2024',
    comentario: 'El caucho reciclado se nota en la pisada. Son cómodos desde el primer uso, sin período de adaptación. El color está perfecto para cualquier outfit.',
  },
  {
    id: 5,
    productId: 2,
    usuario: 'Carmen P.',
    iniciales: 'CP',
    color: '#9d174d',
    estrellas: 3,
    fecha: '10 Nov, 2024',
    comentario: 'Bonitos y cómodos, pero el tallado me quedó un poco justo. Recomendaría pedir un número más. La calidad del cuero vegano está muy bien.',
  },
  {
    id: 6,
    productId: 3,
    usuario: 'Andrés K.',
    iniciales: 'AK',
    color: '#065f46',
    estrellas: 5,
    fecha: '20 Nov, 2024',
    comentario: 'La estampa tiene un nivel de detalle brutal. El algodón orgánico se nota en el tacto, muy suave. Ya compré dos prendas de esta tienda y siempre quedan contentos.',
  },
  {
    id: 7,
    productId: 4,
    usuario: 'Valeria T.',
    iniciales: 'VT',
    color: '#92400e',
    estrellas: 4,
    fecha: '05 Nov, 2024',
    comentario: 'Los bolsillos técnicos son funcionales de verdad. El canvas es resistente, lo usé en el barro y quedó como nuevo. Le bajo una por las pequeñas marcas que no estaban muy documentadas.',
  },
]

export const facturas = [
  { id: '#INV-2023-001', fecha: '24/05/2024', cliente: 'Carlos Rodriguez', monto: '$124.50', estado: 'Pagado' },
  { id: '#INV-2023-002', fecha: '23/05/2024', cliente: 'Elena Martinez', monto: '$89.99', estado: 'Pendiente' },
  { id: '#INV-2023-003', fecha: '22/05/2024', cliente: 'Sofia Garcia', monto: '$210.00', estado: 'Pagado' },
  { id: '#INV-2023-004', fecha: '22/05/2024', cliente: 'Miguel Ruiz', monto: '$45.50', estado: 'Cancelado' },
]
