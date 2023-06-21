import React from 'react'


function RatingComp({score , numOfReviews}) {

    var stars = [];
    for (var i = 0; i < Math.floor(score); i++) {
        stars.push(<i key={i} style={{color : 'red'}} className='fas fa-star'></i>);
    }
    if (Math.round(score) > Math.floor(score) ){ //if the fractional part of "score" is >= 0.5
        stars.push(<i key={"half-star"} style={{color : 'red'}} className='fas fa-star-half-alt'></i>);
    }
    // if (score < 0.5){
    //     stars.push(<i  key= {"empty-star"} style={{color : 'red'}} className='far fa-star'></i>);
    // }



  return (

    <div className='rating'>

        {stars} {score}<br/>
        {/* ({numOfReviews} reviews) */}

   </div>
      

  )


}

export default RatingComp