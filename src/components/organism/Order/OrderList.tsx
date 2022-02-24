import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { priceFormat } from '../../../helpers/price'
import ListItem from '../../molecule/listItem/ListItem'
import { GET_ORDERS, GET_ORDERS_BY_YEAR } from '../../../queries/ordersQuery'

import './OrderList.css'

export interface IOrderData {
  orderNumber: string
  date: string
  status: string
  price: number
}

const CommandList: React.FC = () => {
  const [year, setYear] = useState('2019')

  const {
    loading,
    error,
    data: ordersByYear,
  } = useQuery(GET_ORDERS_BY_YEAR, {
    variables: { year },
  })

  const { data } = useQuery(GET_ORDERS)

  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    setYear(value)
  }

  const years = [
    ...new Set(
      data?.orders?.map((order: IOrderData) =>
        new Date(order.date).getFullYear()
      )
    ),
  ] as [number]

  if (loading) {
    return <>loading...</>
  }

  if (error) {
    console.error(error)
    return <>Something went wrong !</>
  }

  return (
    <>
      <h1>Affichage d'une liste de commandes par année</h1>
      <div>Vos commandes pour l'année</div>
      <div>
        <select onChange={selectHandler} value={year}>
          {years?.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <ul className='orderList'>
          {ordersByYear?.ordersByYear?.map((order: IOrderData) => {
            const { orderNumber, date, status, price } = order
            return (
              <ListItem key={orderNumber}>
                <span className='orderList__date'>
                  {new Date(date).toLocaleDateString('fr-FR')}
                </span>
                <span className='orderList__number'>N° {orderNumber}</span>
                <span className='orderList__status'>{status}</span>
                <span className='orderList__price'>{priceFormat(price)}</span>
              </ListItem>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default CommandList
