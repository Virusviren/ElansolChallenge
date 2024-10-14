import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

export const IncomeExpenses = () => {
    const { transactions } = useContext(GlobalContext)
    const amounts = transactions.map(transaction => transaction.amount)

    let income = 0;
    let expense = 0;

    amounts.forEach(item => {
        if (item > 0) {
            income += item;
        } else {
            expense += item;
        }
    });

    expense = expense * -1;

    return (
        <div className="inc-exp-container">

            <div>
                <h4>
                    Income
                </h4>
                <p className='money plus'>+${income}</p>
            </div>


            <div>
                <h4>
                    Expenses
                </h4>
                <p className='money minus'>-${expense}</p>
            </div>

        </div>
    )
}
