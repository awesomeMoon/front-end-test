import React from 'react'
import axios from 'axios'
import { renderHook, act } from "@testing-library/react-hooks"
import { mockData } from '../__mocks__/mock'
import { useStocks } from '../use-stocks'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const mockDispatch = jest.fn()

describe('use stocks hooks', () => {
    it('should call dispatch to pass data', async () => {
        mockedAxios.get.mockImplementation(() =>
          Promise.resolve({data: mockData})
        )

        jest.spyOn(React, 'useContext').mockImplementation(() => ({
            dispatch: mockDispatch
        }));
    
        const {result, waitForNextUpdate} = renderHook(() => useStocks())
    
        await act(() => waitForNextUpdate())

        expect(mockDispatch).toBeCalled()    
        // expect(result.current.rows[0].name).toStrictEqual(mockData[0].code)
        // expect(result.current.columns[0].headerName).toEqual('Horse')
      })
})