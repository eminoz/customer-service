const { CustomerModel, } = require('../model');

class CustomerRepository {

    async CreateCustomer(customer) {
        try {
            return await customer.save()
        } catch (error) {
            throw error
        }
    }
    async CreateAddress({ user, newAddress }) {
        try {
            await newAddress.save()
            user.address.push(newAddress)
            return await user.save();
        } catch (error) {
            throw error
        }
    }

    async FindCustomerById({ customerId }) {
        try {
            return await CustomerModel.findById(customerId).populate("address")

        } catch (error) {
            throw error
        }
    }
    async FindCustomerByEmail({ email }) {
        try {
            return await CustomerModel.findOne({ email: email })
        } catch (error) {
            throw error
        }
    }
}
module.exports = CustomerRepository
