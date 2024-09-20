import React, { useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import './SearchFormDropdownYear.css';
import { SearchCaretUpIcon } from '../../../Icons/SearchCaretUpIcon/SearchCaretUpIcon';

export const SearchFormDropdownYear = ({
  years,
  formDataStart,
  formDataEnd,
  handleChange,
  handleChangeFromTo
}) => {
  const handleSelect = (e) => {
    const { name, value } = e.target;

    if (name === 'minYear' && selectedEnd && value > selectedEnd) {
      handleChangeFromTo({
        target: { nameFrom: 'minYear', nameTo: 'maxYear', valueFrom: selectedEnd, valueTo: value }
      });
      return;
    }

    if (name === 'maxYear' && selectedStart && value < selectedStart) {
      handleChangeFromTo({
        target: { nameFrom: 'minYear', nameTo: 'maxYear', valueFrom: value, valueTo: selectedStart }
      });
      return;
    }

    handleChange(e);
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
    <Dropdown className="dropdownYear">
        <Dropdown.Toggle as={CustomToggle} id="searchFormDropdownToggleYear">
          {selectedStart && selectedEnd ? (
            <div className="searchFormDropdownToggleContent">
              {`${formDataStart} - ${formDataEnd}`}
            </div>
          ) : selectedStart && !selectedEnd ? (
            <div className="searchFormDropdownToggleContent">{`${formDataStart}`}</div>
          ) : !selectedStart && selectedEnd ? (
            <div className="searchFormDropdownToggleContent">{`${formDataEnd}`}</div>
          ) : (
            'Рік випуску'
          )}
        </Dropdown.Toggle>
  
        <Dropdown.Menu
          className="searchFormDropdownMenu dropdownMenuYear"
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
              <Form.Select
                className="mb-1"
                name="minYear"
                onChange={handleSelect}
                value={selectedStart}>
                <option value="">Від</option>
                {years.map((year, index) => (
                  <option value={year} key={`minYear-${index}`}>
                    {year}
                  </option>
                ))}
              </Form.Select>
              <Form.Select name="maxYear" onChange={handleSelect} value={selectedEnd}>
                <option value="">До</option>
                {years.map((year, index) => (
                  <option value={year} key={`maxYear-${index}`}>
                    {year}
                  </option>
                ))}
              </Form.Select>
            </>
          }
        </Dropdown.Menu>
      </Dropdown>
  );
};
