import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { SearchCaretUpIcon } from '../../../Icons/SearchCaretUpIcon/SearchCaretUpIcon';
import './SearchFormDropdownCurrency.css'

export const SearchFormDropdownCurrency = ({ currencies, formDataValue, handleChange }) => {
  const handleSelect = (selectedKey) => {        
    handleChange({ target: { name: 'currency', value: selectedKey } });
  };

  const selectedItem = currencies[formDataValue];   

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
      <Dropdown.Toggle as={CustomToggle} id="searchFormDropdownToggleCurrency">
        {selectedItem ? (
          <div className="searchFormDropdownToggleContent">
            {selectedItem}
          </div>
        ) : (
          '$'
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu
        className="searchFormDropdownMenu dropdownMenuCurrency"
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
        {currencies.map((currency, index) => (
          <Dropdown.Item key={`currency-${index}`} eventKey={index}>
            {currency}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
