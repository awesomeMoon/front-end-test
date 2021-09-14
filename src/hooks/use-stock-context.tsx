import React, { createContext, useReducer } from 'react'
import {Actions, InitialState} from '../interface'
import { reducer } from './use-stock-reducer'

const initialState:InitialState = {
    allStocks: [],
    stocksLogs: [],
    stocksSummaries: []
}

export const UseStockContext = createContext<{state: InitialState, dispatch: React.Dispatch<Actions>}>({state: initialState, dispatch:()=>null})

interface Props {
    children: React.ReactNode[] | React.ReactNode
}

export const UseStockProvider = (props:Props) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <UseStockContext.Provider value={{state, dispatch}}>
            {props.children}
        </UseStockContext.Provider>
    )
}