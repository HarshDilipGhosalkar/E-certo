import React from 'react';
import { useState } from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  
  const [page,setPage]=useState(1);

  function pagination(decision){
    var p=0;
    if (decision=="inc") {
    p=page+1;
    setPage(p);
    } else {
    p=page-1;
    setPage(p);  
    }
    dopainate(p);
  }
  function dopainate(pno){
    paginate(pno);
  }
  return (
    <nav>
      <ul className='pagination'>
      <li className='page-item'>
        {page <= 1 ? (
          <></>
        ) : (
          <a onClick={() => pagination("dec")} className='page-link'>
          Prev
        </a>
        )}
          </li>
          <li className='page-item'>

          <a  className='page-link'>
          {page}
        </a>

          </li>
          <li className='page-item'>
        {page >= Math.ceil(totalPosts / postsPerPage) ? (
          <></>
        ) : (
          <a onClick={() => pagination("inc")} className='page-link'>
          inc
        </a>
        )}
          </li>
        
      </ul>
    </nav>
  );
};

export default Pagination;