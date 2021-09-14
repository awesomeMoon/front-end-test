export interface StockSummaryDetail {
    code: string
    currentPrice: number
    startPrice: number
    lowestPrice: number
    highestPrice: number
}

export interface StockDetail {
    code: string
    price: number
}

export interface LogDetails{
    time: string
    stocks: StockDetail[]
}

export interface InitialState { 
    allStocks: StockDetail[]
    stocksLogs: LogDetails[]
    stocksSummaries: StockSummaryDetail[]
}

export enum ACTIONS {
    ALL_DATA = "ALL_DATA"
}


export type Actions = {
    type: ACTIONS
    payload:  {
        data: InitialState
    }   
}


