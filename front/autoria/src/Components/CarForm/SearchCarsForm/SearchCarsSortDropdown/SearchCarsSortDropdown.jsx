import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { SearchCaretUpIcon } from '../../../Icons/SearchCaretUpIcon/SearchCaretUpIcon';
import './SearchCarsSortDropdown.css';
import { SearchCaretDownIcon } from '../../../Icons/SearchCaretDownIcon/SearchCaretDownIcon';

export const SearchCarsSortDropdown = ({ name, options, formDataValue, handleChange }) => {
  const handleSelect = (selectedKey) => {        
    handleChange({ target: { name: name, value: selectedKey } });
  };

  const selectedItem = options[formDataValue];   

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
      <div className="searchCarsSortDropdownToggle">
        {children}
        <SearchCaretDownIcon color="var( --bs-primary )" width={24} height={24} />
      </div>
    </a>
  ));

  return (
    <Dropdown className="searchCarsSortDropdown" onSelect={handleSelect}>
      <Dropdown.Toggle as={CustomToggle}>
        {selectedItem ? (
          <div className="searchCarsSortDropdownToggleContent">
            {selectedItem}
          </div>
        ) : (
          'Легкові'
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu
        className="searchCarsSortDropdownMenu"
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
        {options.map((option, index) => (
          <Dropdown.Item key={`${name}-${index}`} eventKey={index}>
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
