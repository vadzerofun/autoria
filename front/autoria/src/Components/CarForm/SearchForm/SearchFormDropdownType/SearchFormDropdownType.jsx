import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { SearchCaretUpIcon } from '../../../Icons/SearchCaretUpIcon/SearchCaretUpIcon';

export const SearchFormDropdownType = ({ types, formDataValue, handleChange }) => {
  const handleSelect = (selectedKey) => {        
    handleChange({ target: { name: 'type', value: selectedKey } });
  };

  const selectedItem = types[formDataValue];   

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
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle as={CustomToggle} id="searchFormDropdownToggleType">
        {selectedItem ? (
          <div className="searchFormDropdownToggleContent">
            {selectedItem}
          </div>
        ) : (
          'Легкові'
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu
        className="searchFormDropdownMenu"
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
        {types.map((type, index) => (
          <Dropdown.Item key={`type-${index}`} eventKey={index}>
            {type}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
