import React from 'react'
import { LogDetails } from '../../../interface'
import { LogItem } from '../../log-item/log-item'
import { Button } from '@material-ui/core'/**

* UI component to display stocks log content
 */
interface Props {
    stocks: LogDetails[]
    clickHandler:() => void
    buttonText: string
}

export const LogContent: React.FC<Props>= (props) => {
    return (
        <>
            <Button onClick={props.clickHandler} color="primary" variant="outlined">{props.buttonText}</Button>
            <div>
                
                {
                    props.stocks.map((item, index) => {
                        return (
                            // FIXME: it's not ideal to use index as ID, api should return proper id
                            <LogItem key={index} logStock={item} />
                        )
                    })
                }
            </div>
        </>
    )
}