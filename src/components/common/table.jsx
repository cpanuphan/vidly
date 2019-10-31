import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = props => {
  const { movies, columns, onDelete, onLiked, onSort, sortColumn } = props;

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
