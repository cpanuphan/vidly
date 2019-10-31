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
          className={
            item === selectedItem || (!item._id && !selectedItem)
              ? "clickable list-group-item active"
              : "clickable list-group-item"
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
