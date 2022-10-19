import { observer } from "mobx-react-lite";
import './dropdownStyles.css'
import React from "react";
import {AiOutlineAppstore} from 'react-icons/ai'
import { Button, ButtonGroup, Dropdown, Form } from "react-bootstrap";

const CheckboxMenu = React.forwardRef(
  (
    {
      children,
      style,
      className,
      "aria-labelledby": labeledBy,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={style}
        className={`${className} CheckboxMenu`}
        aria-labelledby={labeledBy}
      >
        <div
          className="d-flex flex-column"
          style={{ maxHeight: "calc(100vh)", overflow: "none" }}
        >
          <ul
            className="list-unstyled flex-shrink mb-0"
            style={{ overflow: "auto" }}
          >
            {children}
          </ul>
        </div>
      </div>
    );
  }
);

function handleChange(checkbox) {
    if(checkbox.checked == true){
        document.getElementById("submit").removeAttribute("disabled");
    }else{
        document.getElementById("submit").setAttribute("disabled", "disabled");
   }
}

const CheckDropdownItem = React.forwardRef(
  ({ children, id, checked, onChange }, ref) => {
    return (
      <Form.Group ref={ref} className="dropdown-item mb-0" controlId={id}>
        <Form.Check
          type="checkbox"
          label={children}
          checked={checked}
          onChange={handleChange }
        />
      </Form.Group>
    );
  }
);

export const CheckboxDropdown = observer(({ items }) => {
  const handleChecked = (key, event) => {
    items.find(i => i.id === key).checked = event.target.checked;
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="link" id="dropdown-basic">
      <AiOutlineAppstore alignmentBaseline='inherit'/> COLUMNS
      </Dropdown.Toggle>

      <Dropdown.Menu
        as={CheckboxMenu}
      >
        {items.map(i => (
          <Dropdown.Item
            key={i.id}
            as={CheckDropdownItem}
            id={i.id}
            checked={i.checked}
            onChange={handleChecked}
          >
            {i.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
});
