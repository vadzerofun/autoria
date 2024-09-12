import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { CaretDownIcon } from '../../Icons/CaretDownIcon/CaretDownIcon';
import './CarTypeDropdown.css';

export const CarTypeDropdown = ({ selectCarType, formDataType, handleChange }) => {
  const handleSelect = (selectedKey) => { 
    console.log(selectedKey);
       
    handleChange({ target: { name: 'Type', value: selectedKey } });
  };

  const selectedCarType = selectCarType.at(formDataType);

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
      <div className="carTypeDropdownToggle">
        {children}
        <CaretDownIcon color="var( --bs-darkgray )" width={16} height={10} />
      </div>
    </a>
  ));

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle as={CustomToggle} id="carTypeDropdownToggle">
        {selectedCarType ? (
          <div className="carTypeDropdownToggleContent">
            {selectedCarType.icon} {selectedCarType.type}
          </div>
        ) : (
          'Вибрати'
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu
        className="carTypeDropdownMenu"
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
        {selectCarType.map((carType, index) => (
          <Dropdown.Item key={`carType-${index}`} eventKey={index}>
            {carType.icon} {carType.type}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
