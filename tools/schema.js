const { gql } = require('apollo-server')

const typeDefs = gql`
  type Order {
    orderNumber: String
    date: String
    status: String
    price: Float
  }

  type Query {
    orders: [Order]
    ordersByYear(year: String): [Order]
  }
`

module.exports = typeDefs
