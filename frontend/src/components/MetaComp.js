import React from 'react'
import {Helmet} from "react-helmet"


const MetaComp = ({title, descrption, keywords}) => {

  return (
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={descrption}/>
        <meta name='keyword' content={keywords}/>

    </Helmet>
  )
}

MetaComp.defaultProps = {
    title: 'Welcome To Proshop',
    descrption: 'Best products, Lowest prices',
    keywords: 'electronics, buy electronics, cheap electronics'
}

export default MetaComp