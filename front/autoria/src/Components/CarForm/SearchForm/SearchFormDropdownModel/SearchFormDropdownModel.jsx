import React from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import './SearchFormDropdownModel.css';
import { SearchCaretUpIcon } from '../../../Icons/SearchCaretUpIcon/SearchCaretUpIcon';

export const SearchFormDropdownModel = ({ formDataValue, handleChange }) => {
  const handleInput = (e) => {
    handleChange(e);
  };

  const model = formDataValue;

  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}>
      <div className="searchFormDropdownToggle">
        {children}
        <SearchCaretUpIcon color="var( --bs-darkgray )" width={24} height={24} />
      </div>
    </a>
  ));

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="searchFormDropdownToggleModel">
        {model ? <div className="searchFormDropdownToggleContent">{`${model}`}</div> : 'Модель'}
      </Dropdown.Toggle>

      <Dropdown.Menu
        className="searchFormDropdownMenu dropdownMenuModel"
        popperConfig={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 16]
              }
            }
          ]
        }}>
        {
          <>
            <Form.Control
              type="text"
              className="mb-1"
              name="model"
              onChange={handleInput}
              value={model}
              placeholder="Ім'я"
            />
          </>
        }
      </Dropdown.Menu>
    </Dropdown>
  );
};
