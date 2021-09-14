import React from 'react'
import { LogDetails } from '../../interface'

interface Props {
  logStock: LogDetails
}

/**
 * UI components to display single log item
 */
export const LogItem: React.FC<Props> = (props) => {
  return (
    <div className="logItem">
        <div className="itemTime">Updates for {props.logStock.time}</div>
       {    
           props.logStock.stocks.map((stock, index) => {
               // FIXME: it's not ideal to use index as ID, api should return proper id
               return <div key={index} className="stockPrice">{stock.code}: ${stock.price}</div>
           })
       }
    </div>
  )
}
