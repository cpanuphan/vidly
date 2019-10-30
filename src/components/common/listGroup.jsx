import React from "react";

const ListGroup = ({ listItem, selectedItem, onSelectedItem }) => {
  return (
    <ul className="list-group">
      <li
        style={{ cursor: "pointer" }}
        className={
          selectedItem === "" ? "list-group-item active" : "list-group-item"
        }
        onClick={() => onSelectedItem("")}
      >
        All Genres
      </li>
      {listItem.map(item => (
        <li
          style={{ cursor: "pointer" }}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
          key={item._id}
          onClick={() => onSelectedItem(item)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
