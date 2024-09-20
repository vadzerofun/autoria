import React from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import './SearchFormDropdownPrice.css';
import { SearchCaretUpIcon } from '../../../Icons/SearchCaretUpIcon/SearchCaretUpIcon';

export const SearchFormDropdownPrice = ({
  formDataStart,
  formDataEnd,
  handleChange,
  handleChangeFromTo
}) => {
  const handleInput = (e) => {
    handleChange(e);
  };

  const handleLostFocus = (e) => {
    const { name, value } = e.target;

    if (name === 'minPrice' && selectedEnd && value > selectedEnd) {
      handleChangeFromTo({
        target: { nameFrom: 'minPrice', nameTo: 'maxPrice', valueFrom: selectedEnd, valueTo: value }
      });
      return;
    }

    if (name === 'maxPrice' && selectedStart && value < selectedStart) {
      handleChangeFromTo({
        target: {
          nameFrom: 'minPrice',
          nameTo: 'maxPrice',
          valueFrom: value,
          valueTo: selectedStart
        }
      });
      return;
    }
  };

  const selectedStart = formDataStart;
  const selectedEnd = formDataEnd;

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
    <Dropdown className="searchFormDropdownPrice">
      <Dropdown.Toggle as={CustomToggle} id="searchFormDropdownTogglePrice">
        {selectedStart && selectedEnd ? (
          <div className="searchFormDropdownToggleContent">
            {`${formDataStart} - ${formDataEnd}`}
          </div>
        ) : selectedStart && !selectedEnd ? (
          <div className="searchFormDropdownToggleContent">{`${formDataStart}`}</div>
        ) : !selectedStart && selectedEnd ? (
          <div className="searchFormDropdownToggleContent">{`${formDataEnd}`}</div>
        ) : (
          'Ціна'
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu
        className="searchFormDropdownMenu dropdownMenuPrice"
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
              name="minPrice"
              onChange={handleInput}
              onBlur={handleLostFocus}
              value={selectedStart}
              placeholder="Від"
            />
            <Form.Control
              type="text"
              name="maxPrice"
              onChange={handleInput}
              onBlur={handleLostFocus}
              value={selectedEnd}
              placeholder="До"
            />
          </>
        }
      </Dropdown.Menu>
    </Dropdown>
  );
};
