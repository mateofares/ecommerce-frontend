export default function TablaDatos({ headers, rows }) {
  return (
    <div className="data-table">
      <table>
        <thead>
          <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join('-')}>
              {row.map((cell) => <td key={cell}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      <p>Mostrando 1 - 4 de 1,284 registros</p>
    </div>
  )
}

