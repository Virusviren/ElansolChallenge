import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'
// Initial state

const initialState = {

    transactions: [],
    error: null,
    loading: true
}



// Create context


export const GlobalContext = createContext(initialState)


// Provider component

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);



    // Actions for the global state


    async function getTransactions() {
        try {
            const res = await axios.get('/api/v1/transactions')

            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTIONS_ERROR',
                payload: err.response.data.error
            })
        }
    }




    async function deleteTransaction(id) {
        try {
            await axios.delete(`/api/v1/transactions/${id}`)
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            })
            getTransactions()
        } catch (err) {
            dispatch({
                type: 'TRANSACTIONS_ERROR',
                payload: err.response.data.error
            })
        }

    }

    async function addTransaction(transaction) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {

            await axios.post(`/api/v1/transactions`, transaction, config)
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: transaction
            })
            getTransactions()
        } catch (err) {
            dispatch({
                type: 'TRANSACTIONS_ERROR',
                payload: err.response.data.error
            })
        }




    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        deleteTransaction, addTransaction, getTransactions,
        error: state.error,
        loading: state.loading
    }}>
        {children}
    </GlobalContext.Provider>
    )
}