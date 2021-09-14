import React from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid'

/**
 * UI component to display stock summary content
 */
interface Props {
  rows: GridRowsProp
}

export const SummaryContent: React.FC<Props> = props => {
  const allColumns: GridColDef[] = [
    {
      field: 'id',
      hide: true
    },
    {
      field: 'stock',
      headerName: 'Stock',
      headerClassName: 'header',
      cellClassName: 'cell'
    },
    {
      field: 'starting',
      headerName: 'Starting',
      headerClassName: 'header',
      cellClassName: 'cell'
    },
    {
      field: 'lowest',
      headerName: 'Lowest',
      headerClassName: 'header',
      cellClassName: 'cell'
    },
    {
      field: 'highest',
      headerName: 'Highest',
      headerClassName: 'header',
    },
    {
      field: 'current',
      headerName: 'Current',
      headerClassName: 'header',
      cellClassName: 'cell'
    }
  ]

  return (
    <DataGrid
      rows={props.rows}
      columns={allColumns}
      pageSize={10}
      rowsPerPageOptions={[10, 20]}
    />
  )
}
