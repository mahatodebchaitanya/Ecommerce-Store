// Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination" style={{width:'auto',display:'flex',justifyContent:'center',alignContent:'center',padding:'15px auto',gap:'10px'}}>
      <button style={{fontSize:'18px',padding:'5px 10px'}} onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Prev
      </button>
      <span style={{fontSize:'18px'}}>Page {currentPage} of {totalPages}</span>
      <button style={{fontSize:'18px',padding:'5px,10px'}} onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};
export default Pagination