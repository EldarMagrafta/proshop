import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'


const PaginateComp = ({pages, page, isAdmin=false, keyword=''}) => {

    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
      pageNumbers.push(i);
    }


  //if there is only 1 pages dont return anything. i.e dont create pagination 
  return (pages > 1 &&
    (
      <Pagination>
        {
          pageNumbers.map((x) => {
          const searchPath = keyword ? `/search/${keyword}/page/${x}` : `/page/${x}`;
          const adminPath = `/admin/productlist/${x}`;
          const linkTo = isAdmin ? adminPath : searchPath;

          return (
            <LinkContainer key={x} to={linkTo}>
              <Pagination.Item active={x === page}>{x}</Pagination.Item>
            </LinkContainer>
          );
          })
        }
    </Pagination>
    )
  )
}

export default PaginateComp