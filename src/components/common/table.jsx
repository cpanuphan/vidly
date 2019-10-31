import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({ movies, columns, onDelete, onLiked, onSort, sortColumn }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody
        data={movies}
        columns={columns}
        onDelete={onDelete}
        onLiked={onLiked}
      />
    </table>
  );
};

export default Table;
