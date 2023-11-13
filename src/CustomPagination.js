import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Pagination from "react-bootstrap/Pagination";

const CustomPagination = ({ totalPages, activePage, onPageChange }) => {
  const paginationItems = [];

  // Show dots in the center section
  for (
    let i = Math.max(1, activePage - 2);
    i <= Math.min(totalPages, activePage + 2);
    i++
  ) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        active={i === activePage}
        onClick={() => onPageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <Pagination className="justify-content-end">
      <Pagination.First onClick={() => onPageChange(1)} />
      <Pagination.Prev
        onClick={() => onPageChange(activePage - 1)}
        disabled={activePage === 1}
      />

      {activePage > 3 && <Pagination.Ellipsis />}

      {paginationItems}

      {activePage < totalPages - 2 && <Pagination.Ellipsis />}

      <Pagination.Next
        onClick={() => onPageChange(activePage + 1)}
        disabled={activePage === totalPages}
      />
      <Pagination.Last onClick={() => onPageChange(totalPages)} />
    </Pagination>
  );
};

export default CustomPagination;
