import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../actions'


export default function Counter() {
    const count = useSelector((state) => state.counter.count)
    const dispatch = useDispatch()
    return (
        <>
            <p>count {count}</p>
            <button onClick={() => { dispatch(increment()) }}>increment</button>
            <button onClick={() => { dispatch(decrement()) }}>decrement</button>
        </>
    )
}
