const { CustomerModel } = require("../model")

class OrderRepository {
    async CreateOrder({ user, order }) {
        try {
            await order.save()
            user.orders.push(order)
            return await user.save()
        } catch (error) {
            throw error
        }
    }
    async GetUserOrders({ _id }) {
        return await CustomerModel.findById(_id).populate("orders")
    }
}
module.exports = OrderRepository