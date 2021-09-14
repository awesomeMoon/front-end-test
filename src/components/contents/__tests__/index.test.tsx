import React from 'react'
import { render, screen } from '@testing-library/react'
import { mockStocks, mockLogs, mockSummaries } from '../__mocks__/mock'
import { useStocks } from '../../../hooks/use-stocks'
import { UseStockContext} from '../../../hooks/use-stock-context'
import { Content } from '..'

jest.mock('../../hooks/use-stock-context')
jest.mock('../../hooks/use-stocks')

const mockOnClick = jest.fn()
const mockDispatch = jest.fn()

describe('should full screen to display all data', () => {
    it('should render components with calling hooks', () => {

      (useStocks as jest.MockedFunction<any>).mockReturnValue({
        isPaused: true,
        onClickHandler: mockOnClick
      })

      render(<Content />)
      expect(useStocks).toHaveBeenCalled()
    })
  
    it('should render data in log and summary components', async () => {
        (useStocks as jest.MockedFunction<any>).mockReturnValue({
            isPaused: true,
            onClickHandler: mockOnClick
          })

        const mockValue= {
                state: {
                allStocks: mockStocks,
                stocksLogs: mockLogs,
                stocksSummaries: mockSummaries
            },
            dispatch: mockDispatch
        }

        render(<UseStockContext.Provider value={mockValue}><Content /></UseStockContext.Provider>)

        const summaryItem = await screen.getByText(mockSummaries[0].code)
        const logItem = await screen.getByText(mockLogs[0].stocks[0].code)
  
        expect(summaryItem).toBeTruthy()
        expect(logItem).toBeTruthy()
    })
  })
