import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'


/* 
@desc     Create new order
@route    POST /api/orders
@access   Private
*/
const addOrderItems = asyncHandler(async (req, res) => {
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, 
           taxPrice, shippingPrice, totalPrice} = req.body

    if(orderItems && orderItems.length ==0){
        res.status(400)
        throw new Error('No order items')
        return
    }
    else{ //we want to create a new order in the DB
        const order = new Order({
            user : req.user_id, //who this order belongs to
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })
        //createdOrder is a document that matches the structure defined in the orderSchema.
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

export {addOrderItems}