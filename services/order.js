const { SuccessResponse } = require("clean-response");
const { OrderModel } = require("../model");
const { CustomerRepository, OrderRepository } = require("../repository");

class OrderService {
    constructor() {
        this.customerRepository = new CustomerRepository()
        this.orderRepository = new OrderRepository()
    }
    async CreateNewOrder(req) {
        const { customerId, amount, Product } = req.body

        try {
            const user = await this.customerRepository.FindCustomerById({ customerId })

            const order = new OrderModel({
                customerId,
                amount,
                Product: Product
            })
            const orderResult = await this.orderRepository.CreateOrder({ user, order })
            return new SuccessResponse(200, orderResult).dataResult()
        } catch (error) {
            throw error
        }
    }
    async GetUserOrders(req) {
        const { _id } = req.body
        try {
            const user = await this.orderRepository.GetUserOrders({ _id })
            return new SuccessResponse(200, user).dataResult()
        } catch (error) {
            throw error
        }
    }
}
module.exports = OrderService;
