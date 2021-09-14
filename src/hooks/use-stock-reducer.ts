import { format } from 'date-fns'
import {
  Actions,
  ACTIONS,
  InitialState,
  StockDetail,
  LogDetails,
  StockSummaryDetail
} from '../interface'

/**
 * A reducer to filter stock data by different actions
 */
export const reducer = (state: InitialState, action: Actions): InitialState => {
  switch (action.type) {
    case ACTIONS.ALL_DATA:
      return {
        ...state,
        stocksLogs: _filterAllStocks(
          false,
          state.allStocks,
          action.payload.data.allStocks,
          state.stocksLogs
        ) as LogDetails[],
        allStocks: _filterAllStocks(
          true,
          state.allStocks,
          action.payload.data.allStocks,
          []
        ) as StockDetail[],
        stocksSummaries: _filterStocksSummaries(
          action.payload.data.allStocks,
          state.stocksSummaries
        )
      }
    default:
      return state
  }
}

/**
 * filter out newly stocks from all fetched stocks, then add back to all data at the beginning
 * OR only return newly fetched stocks
 */
const _filterAllStocks = (
  isReturnAllStock: boolean,
  currentData: StockDetail[],
  newlyFetchedAllData: StockDetail[],
  stocksLogs: LogDetails[]
) => {
  const newlyAddedStocks: StockDetail[] = []

  const stocksFromState = currentData
  newlyFetchedAllData.forEach(item => {
    if (stocksFromState.indexOf(item) < 0) {
      stocksFromState.unshift(item)
      if (!isReturnAllStock) {
        newlyAddedStocks.push(item)
      }
    }
  })

  return isReturnAllStock
    ? stocksFromState
    : _filterStockLogs(newlyAddedStocks, stocksLogs)
}

/**
 * Add newly fetched data to stock log array at the beginning
 */
const _filterStockLogs = (
  filteredAllData: StockDetail[],
  stockLogs: LogDetails[]
) => {
  const stocksLogsFromState = stockLogs
  stocksLogsFromState.unshift({
    time: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
    stocks: filteredAllData
  })
  return stocksLogsFromState
}

/**
 * Update stocks summaries array
 */
const _filterStocksSummaries = (
  newlyFetchedAllData: StockDetail[],
  stocksSummaries: StockSummaryDetail[]
) => {
  newlyFetchedAllData.forEach(item => {
    const stockSummary = stocksSummaries.find(
      summary => summary.code === item.code
    )
    if (stockSummary) {
      stockSummary.currentPrice = item.price
      stockSummary.highestPrice = Math.max(
        item.price,
        stockSummary.highestPrice
      )
      stockSummary.lowestPrice = Math.min(item.price, stockSummary.lowestPrice)
    } else {
      stocksSummaries.push({
        code: item.code,
        currentPrice: item.price,
        highestPrice: item.price,
        lowestPrice: item.price,
        startPrice: item.price
      })
    }
  })
  return stocksSummaries
}
