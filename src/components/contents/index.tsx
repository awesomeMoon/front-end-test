import React, { useContext, useEffect, useState } from 'react'
import { UseStockContext } from '../../hooks/use-stock-context'
import { useStocks } from '../../hooks/use-stocks'
import { LogContent } from './log-content/log-content'
import { SummaryContent } from './summary-content/summary-content'
import './index.css'

import { GridRowsProp } from '@mui/x-data-grid'

/**
 * Fetching data and display all stocks information
 */
export const Content: React.FC = () => {
  const { isPaused, onClickHandler } = useStocks()

  const { state } = useContext(UseStockContext)

  const [rows, setRows] = useState<GridRowsProp>([])

  /**
   * Convert data for material UI data grid
   */
  useEffect(() => {
    if (state.stocksSummaries) {
      const allRows = state.stocksSummaries.map((item, index) => {
        return {
          id: index,
          stock: item.code,
          starting: item.startPrice,
          lowest: item.lowestPrice,
          highest: item.highestPrice,
          current: item.currentPrice
        }
      })
      setRows(allRows)
    }
  }, [state])

  return (
    <div className="container">
      <div className="logContainer">
        <div>Log</div>
        <div className="logContent">
          <LogContent
            buttonText={isPaused ? 'Resume Log' : 'Pause Log'}
            clickHandler={onClickHandler}
            stocks={state.stocksLogs}
          />
        </div>
      </div>
      <div className="summaryContainer">
        <div>Summary</div>
        <SummaryContent rows={rows} />
      </div>
    </div>
  )
}
