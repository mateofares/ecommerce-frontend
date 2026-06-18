import { useState } from 'react'
import Boton from '../../components/Boton'
import InsigniaEstado from '../../components/InsigniaEstado'
import PlantillaAdmin from '../../layouts/PlantillaAdmin'
import api from '../../services/api'

// El backend no expone un listado de facturas; se consultan por numero de orden.
export default function PaginaAdminFacturas() {
  const [ordenId, setOrdenId] = useState('')
  const [factura, setFactura] = useState(null)
  const [error, setError] = useState('')

  async function buscar(e) {
    e.preventDefault()
    setError('')
    setFactura(null)
    try {
      const data = await api.get(`/facturas/orden/${ordenId}`)
      setFactura(data)
    } catch (err) {
      setError(err.message || 'Factura no encontrada')
    }
  }

  async function descargar() {
    try {
      const url = await api.get(`/facturas/${factura.id}/descargar`)
      if (url) window.open(url, '_blank')
    } catch (err) {
      setError(err.message || 'No se pudo descargar')
    }
  }

  async function anular() {
    try {
      await api.patch(`/facturas/${factura.id}/anular`)
      setFactura({ ...factura, activa: false })
    } catch (err) {
      setError(err.message || 'No se pudo anular')
    }
  }

  return (
    <PlantillaAdmin eyebrow="Finanzas & control" title="Facturacion" text="Consulta de facturas por orden, descarga y anulacion.">
      <form onSubmit={buscar} className="form-grid" style={{ maxWidth: '420px', marginBottom: '20px' }}>
        <input
          placeholder="Numero de orden"
          value={ordenId}
          onChange={(e) => setOrdenId(e.target.value)}
          required
        />
        <Boton>Buscar factura</Boton>
      </form>

      {error && <p style={{ color: '#c0392b' }}>{error}</p>}

      {factura && (
        <article className="shipping-card" style={{ maxWidth: '560px' }}>
          <div className="product-card__top">
            <strong>{factura.numeroFactura}</strong>
            <InsigniaEstado status={factura.activa ? 'success' : 'danger'}>
              {factura.activa ? 'Activa' : 'Anulada'}
            </InsigniaEstado>
          </div>
          <p>{factura.nombreComprador} {factura.apellidoComprador}</p>
          <span>Orden: {factura.numeroOrden}</span>
          <span>Total: $ {factura.totalFacturado}</span>
          <span>Fecha: {factura.fechaFactura?.slice(0, 10)}</span>
          <div className="detail-info__actions">
            <Boton onClick={descargar}>Descargar PDF</Boton>
            {factura.activa && <Boton variant="ghost" onClick={anular}>Anular factura</Boton>}
          </div>
        </article>
      )}
    </PlantillaAdmin>
  )
}
