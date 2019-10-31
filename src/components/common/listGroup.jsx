import React from "react";

const ListGroup = ({
  listItem,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect
}) => {
  return (
    <ul className="list-group">
      {listItem.map(item => (
        <li
          key={item[valueProperty]}
          style={{ cursor: "pointer" }}
          className={
            item === selectedItem || (!item._id && !selectedItem)
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
