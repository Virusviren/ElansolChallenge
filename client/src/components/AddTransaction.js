import React, { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { GlobalContext } from '../context/GlobalState'

export const AddTransaction = () => {
    const { addTransaction } = useContext(GlobalContext)
    const [text, setText] = useState("")
    const [amount, setAmount] = useState(0)

    const onSubmit = e => {
        e.preventDefault();
        const newTransaction = {
            id: uuidv4(),
            text, amount: +amount
        }

        addTransaction(newTransaction)
        setText("")
        setAmount(0)
    }
    return (
        <>
            <h3>
                Add new transaction
            </h3>
            <form onSubmit={onSubmit}>
                <div className='form-control'>
                    <label for="text">
                        Text
                    </label>
                    <input type='text' placeholder='Enter text...' value={text} onChange={e => setText(e.target.value)}></input>
                </div>

                <div className='form-control'>
                    <label for="amount">
                        Amount <br />
                        (negative - expense, positive - income)
                    </label>
                    <input type='number' placeholder='Enter amount...' value={amount} onChange={e => setAmount(e.target.value)}></input>
                </div>
                <button className='btn'>Add transaction</button>
            </form>
        </>
    )
}
