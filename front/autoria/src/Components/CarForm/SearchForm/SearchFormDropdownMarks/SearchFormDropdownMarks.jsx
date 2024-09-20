import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { CaretDownIcon } from '../../../Icons/CaretDownIcon/CaretDownIcon';
import './SearchFormDropdownMarks.css';
import { SearchCaretUpIcon } from '../../../Icons/SearchCaretUpIcon/SearchCaretUpIcon';

export const SearchFormDropdownMarks = ({ marksIds, marksNames, formDataValue, handleChange }) => {
  const handleSelect = (selectedKey) => {        
    handleChange({ target: { name: 'mark', value: selectedKey } });
  };

  const selectedItem = marksIds.indexOf(formDataValue);

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
      <Dropdown.Toggle as={CustomToggle} id="searchFormDropdownToggleMark">
        {selectedItem > -1 ? (
          <div className="searchFormDropdownToggleContent">
            {marksNames[selectedItem]}
          </div>
        ) : (
          'Марка'
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
        {marksIds.map((id, index) => (
          <Dropdown.Item key={`mark-${index}`} eventKey={id}>
            {marksNames[index]}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
