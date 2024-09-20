import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { CaretDownIcon } from '../../../Icons/CaretDownIcon/CaretDownIcon';
import './SearchFormDropdownRegion.css';
import { SearchCaretUpIcon } from '../../../Icons/SearchCaretUpIcon/SearchCaretUpIcon';

export const SearchFormDropdownRegion = ({ regions, formDataValue, handleChange }) => {
  const handleSelect = (selectedKey) => {        
    handleChange({ target: { name: 'region', value: selectedKey } });
  };

  const selectedItem = regions.indexOf(formDataValue);  

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
      <Dropdown.Toggle as={CustomToggle} id="searchFormDropdownToggleRegion">
        {selectedItem > -1 ? (
          <div className="searchFormDropdownToggleContent">
            {regions[selectedItem]}
          </div>
        ) : (
          'Регіон'
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
        {regions.map((region, index) => (
          <Dropdown.Item key={`region-${index}`} eventKey={region}>
            {region}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
