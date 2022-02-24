import { gql } from '@apollo/client'

export const GET_ORDERS = gql`
  query GetOrders {
    orders {
      orderNumber
      date
      status
      price
    }
  }
`

export const GET_ORDERS_BY_YEAR = gql`
  query GetOrder($year: String) {
    ordersByYear(year: $year) {
      orderNumber
      date
      status
      price
    }
  }
`
