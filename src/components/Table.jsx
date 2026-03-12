import { memo } from 'react'
import '../styles/components.css'

export const Table = memo(function Table({ columns, data, onRowClick }) {
  if (data.length === 0) {
    return (
      <div className="table-container">
        <p className="no-data">No data available</p>
      </div>
    )
  }

  return (
    <div className="table-container">
      <table className="data-table" role="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              onClick={() => onRowClick?.(row)}
              onKeyDown={(event) => {
                if (!onRowClick) return
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  onRowClick(row)
                }
              }}
              className={onRowClick ? 'clickable' : ''}
              tabIndex={onRowClick ? 0 : undefined}
              aria-label={onRowClick ? `Open details for row ${idx + 1}` : undefined}
            >
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
})

export default Table
