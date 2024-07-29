import React from 'react';
import './Pagination.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number') {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevious} disabled={currentPage === 1} className="pagination__button">
      <img src="/src/assets/icons/prevPageIcon.svg" className="pagination__button__img"/>
      </button>
      {getPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => handlePageClick(page)}
            className={page === currentPage ? 'pagination__number-page pagination__number-page--active' : 'pagination__number-page'}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="ellipsis">
            {page}
          </span>
        )
      )}
      <button onClick={handleNext} disabled={currentPage === totalPages} className="pagination__button">
        <img src="/src/assets/icons/nextPageIcon.svg" className="pagination__button__img"/>
      </button>
    </div>
  );
};
