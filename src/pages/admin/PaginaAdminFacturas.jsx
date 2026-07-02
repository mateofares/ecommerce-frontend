import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Boton from '../../components/ui/Boton'
import InsigniaEstado from '../../components/ui/InsigniaEstado'
import TablaDatos from '../../components/ui/TablaDatos'
import PlantillaAdmin from '../../layouts/PlantillaAdmin'
import { fetchFacturas, fetchFacturaPorOrden, anularFactura } from '../../redux/facturaSlice'

export default function PaginaAdminFacturas() {
  const { items: facturas, seleccionada: resultado, fetched, loading: cargando, error } = useSelector((state) => state.facturas)
  const dispatch = useDispatch()
  const [ordenId, setOrdenId] = useState('')

  useEffect(() => {
    if (!fetched) dispatch(fetchFacturas())
  }, [dispatch])

  function buscar(e) {
    e.preventDefault()
    dispatch(fetchFacturaPorOrden(ordenId))
  }

  function anular(factura) {
    dispatch(anularFactura(factura.id))
  }

  return (
    <PlantillaAdmin eyebrow="Finanzas & control" title="Facturacion" text="Listado de todas las facturas y busqueda por orden.">

      {/* Buscador */}
      <form onSubmit={buscar} className="form-grid" style={{ maxWidth: '420px', marginBottom: '24px' }}>
        <input
          placeholder="ID numerico de la orden (ej: 42)"
          value={ordenId}
          onChange={(e) => setOrdenId(e.target.value)}
          required
        />
        <Boton>Buscar por orden</Boton>
      </form>

      {error && <p style={{ color: '#c0392b', marginBottom: '16px' }}>{error}</p>}

      {resultado && (
        <article className="shipping-card" style={{ maxWidth: '560px', marginBottom: '32px' }}>
          <div className="product-card__top">
            <strong>{resultado.numeroFactura}</strong>
            <InsigniaEstado status={resultado.activa ? 'success' : 'danger'}>
              {resultado.activa ? 'Activa' : 'Anulada'}
            </InsigniaEstado>
          </div>
          <p>{resultado.nombreComprador} {resultado.apellidoComprador}</p>
          <span>Orden: {resultado.numeroOrden}</span>
          <span>Total: $ {resultado.totalFacturado}</span>
          <span>Fecha: {resultado.fechaFactura?.slice(0, 10)}</span>
          <div className="detail-info__actions">
            {resultado.activa && (
              <Boton variant="ghost" onClick={() => anular(resultado)}>Anular factura</Boton>
            )}
          </div>
        </article>
      )}

      {/* Listado completo */}
      <h2 style={{ marginBottom: '12px' }}>Todas las facturas</h2>
      {cargando ? (
        <p>Cargando...</p>
      ) : facturas.length === 0 ? (
        <p>No hay facturas registradas aun.</p>
      ) : (
        <TablaDatos
          headers={['Numero', 'Comprador', 'Orden', 'Total', 'Fecha', 'Estado', 'Acciones']}
          rows={facturas.map(f => [
            f.numeroFactura,
            `${f.nombreComprador} ${f.apellidoComprador}`,
            f.numeroOrden,
            `$ ${f.totalFacturado}`,
            f.fechaFactura?.slice(0, 10) ?? '—',
            <InsigniaEstado key={`est-${f.id}`} status={f.activa ? 'success' : 'danger'}>
              {f.activa ? 'Activa' : 'Anulada'}
            </InsigniaEstado>,
            f.activa
              ? <Boton key={`an-${f.id}`} variant="ghost" onClick={() => anular(f)}>Anular</Boton>
              : <span key={`an-${f.id}`} style={{ color: '#aaa', fontSize: '12px' }}>—</span>,
          ])}
        />
      )}
    </PlantillaAdmin>
  )
}
