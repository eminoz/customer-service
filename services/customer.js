const { GeneratePassword, ValidatePassword, GenerateSignature } = require("../utils")
const { SuccessResponse, ErrorResponse } = require("clean-response")
const { CustomerModel, AddressModel } = require('../model');
const { CustomerRepository } = require("../repository")
class CustomerService {
    constructor() {
        this.customerRepository = new CustomerRepository()
    }
    async SignUp(req) {
        const { email, password, phone } = req.body;
        try {
            const existingCustomer = await this.customerRepository.FindCustomerByEmail({ email })
            if (existingCustomer) {

                return new ErrorResponse(400).dataResult()
            }
            else {
                let userPassword = await GeneratePassword(password)
                const customer = new CustomerModel({
                    email,
                    password: userPassword,
                    phone,
                    address: [],
                    order: []
                })
                const existingCustomer = await this.customerRepository.CreateCustomer(customer)

                // generate token
                return new SuccessResponse(201, existingCustomer).dataResult()
            }
        } catch (error) {
            throw error
        }
    }
    async SignIn(req) {
        const { email, password } = req.body;
        try {
            const existingCustomer = await this.customerRepository.FindCustomerByEmail({ email })
            if (existingCustomer) {
                const validPassword = await ValidatePassword(password, existingCustomer.password)
                if (validPassword) {
                    const token = await GenerateSignature({ email: existingCustomer.email, _id: existingCustomer._id })
                    return new SuccessResponse(200, token).dataResult()
                }
            }
            return new ErrorResponse(400).dataResult()
        } catch (error) {
            throw error
        }
    }
    async AddNewAddress(req) {

        const { email } = req.user;
        const { country, city, street, doorCode, fullAddress } = req.body;

        try {
            const user = await this.customerRepository.FindCustomerByEmail({ email })

            if (user) {
                const newAddress = new AddressModel({
                    country,
                    city,
                    street,
                    doorCode,
                    fullAddress
                })
                const addressResult = await this.customerRepository.CreateAddress({ user, newAddress })
                return new SuccessResponse(200, addressResult).dataResult()

            }

        } catch (error) {
            throw error
        }

    }
    async GetProfile(req) {
        const { _id } = req.user;

        try {
            const existingCustomer = await this.repository.FindCustomerById({ _id })
            return new SuccessResponse(200, existingCustomer).dataResult()
        } catch (error) {
            throw error
        }
    }

}
module.exports = CustomerService;
