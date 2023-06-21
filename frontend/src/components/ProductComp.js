import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import RatingComp from './RatingComp'






function ProductComp({product}) { //Destructuring props

  return (

    <Card className='my-3 p-3 rounded'>
          {/* product image */}
         <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant = "top"/>
         </Link>

          {/* product details */}
         <Card.Body>
            <Link to={`/product/${product._id}`}>
              <Card.Title>{product.name}</Card.Title>
            </Link>
            
            <Card.Text as='div'> {/*the as='div' is instead of the default <p> that generates validateDOMNesting warning. */}
                  <RatingComp score={product.rating} numOfReviews={product.numReviews}/>
                  ({product.numReviews} reviews)
            </Card.Text>
              
            <Card.Text as ='h3'> ${product.price} </Card.Text>

         </Card.Body>

    </Card>
    


  )
  



  
}

export default ProductComp