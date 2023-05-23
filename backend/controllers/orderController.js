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
            user : req.user._id, //who this order belongs to
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


/* 
@desc     Gwt order by id
@route    GET /api/orders/:id
@access   Private
*/
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user' , 'name email')
    if(order){
        res.json(order)
    }
    else{
        res.status(404)
        throw new Error('Order Not Found')
    }
})
    

export {addOrderItems, getOrderById}