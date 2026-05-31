import DataTable from '../components/DataTable'
import TarjetaDashboard from '../components/TarjetaDashboard'
import { facturas } from '../data/mockData'
import AdminLayout from '../layouts/AdminLayout'

export default function AdminInvoicesPage() {
  return (
    <AdminLayout eyebrow="Finanzas & control" title="Historial de facturacion" text="Revision y auditoria de transacciones generadas en el marketplace.">
      <div className="admin-metrics">
        <TarjetaDashboard titulo="Facturas pagadas" valor="1,284" detalle="Mes actual" />
        <TarjetaDashboard titulo="Pendientes" valor="12" detalle="Control fiscal" />
      </div>
      <DataTable
        headers={['ID factura', 'Fecha', 'Cliente', 'Monto total', 'Estado', 'Acciones']}
        rows={facturas.map((factura) => [
          factura.id,
          factura.fecha,
          factura.cliente,
          factura.monto,
          factura.estado,
          'Descargar PDF',
        ])}
      />
    </AdminLayout>
  )
}
