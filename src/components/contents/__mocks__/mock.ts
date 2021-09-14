import { LogDetails, StockDetail, StockSummaryDetail } from "../../../interface"

export const mockStocks: StockDetail[] = [
  { code: 'GOK', price: 123.25 },
  { code: 'CS', price: 174.62 }
]

export const mockLogs: LogDetails[] = [
  {
    time: 'time',
    stocks: mockStocks
  }
]

export const mockSummaries: StockSummaryDetail[]= [
  {
    code: 'GOK',
    currentPrice: 123.25,
    startPrice: 123.25,
    lowestPrice: 123.25,
    highestPrice: 123.25
  }
]
