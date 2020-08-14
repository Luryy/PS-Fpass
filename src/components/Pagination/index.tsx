import React from 'react';

import './styles.css'
import { Link } from 'react-router-dom';

interface PaginationProps{
    postsPerPage: number,
    totalPosts: number,
    current: number,
    paginate: Function
}

const Pagination: React.FC<PaginationProps> = ({ postsPerPage, totalPosts, current, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className={number===current ? 'active page-item' : 'page-item'}>
            <Link to="/list" onClick={() => paginate(number)} className='page-link'>
                {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;