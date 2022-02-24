const orders = require('./mocks/orders')

module.exports = {
  Query: {
    orders: () => {
      return orders
    },
    ordersByYear: async (root, { year }, context) => {
      return orders.filter((order) => {
        return new Date(order.date).getFullYear().toString() === year
      })
    },
  },
}
