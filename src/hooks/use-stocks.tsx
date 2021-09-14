import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import {
  ACTIONS,
  InitialState
} from '../interface'
import { baseUrl } from '../constants'
import { UseStockContext } from './use-stock-context'

const REFRESH_TIME = 6000 * 2

/**
 * A custom hook to return/update every stock details and new stock result by every 2 mins
 */
export const useStocks = () => {
  const [timerId, setTimerId] = useState<number>(0)
  const [isPaused, setIsPaused] = useState<boolean>(false)

  const { dispatch } = useContext(UseStockContext)

  /**
   * Retrive data from API
   */
  const getAllStocks = async () => {
    const response = await axios.get('/stock-pricing', {
      baseURL: baseUrl,
      timeout: 600    
    })
    dispatch({
      type: ACTIONS.ALL_DATA,
      payload: { data: { allStocks: response.data } as InitialState }
    })
  }

  /**
   * Fetch data by given fresh time
   */
  const timerForFetch = () => {
    const timer = window.setInterval(async () => {
      setTimerId(timer)
      await getAllStocks()
    }, REFRESH_TIME)
  }

  /**
   * ComponentDidMount
   */
  useEffect(() => {
    timerForFetch()
    return () => clearInterval(timerId)
  }, [])

  /**
   * Handle state for resume/pause fetch data
   */
  const onClickHandler = () => {
    if (isPaused) {
      // Restart timer to fetch data
      setIsPaused(false)
      timerForFetch()
    } else {
      // Pause timer to fetch data
      clearInterval(timerId)
      setIsPaused(true)
    }
    
  }

  return {
    isPaused,
    onClickHandler
  }
}
