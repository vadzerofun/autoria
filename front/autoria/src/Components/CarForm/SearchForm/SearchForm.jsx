import React, { useState } from 'react';
import { Button, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import { SearchFormDropdownMarks } from './SearchFormDropdownMarks/SearchFormDropdownMarks';
import './SearchForm.css';

export const SearchForm = ({ marks }) => {
  // formData
  const [formData, setFormData] = useState({
    type: 0,
    mark: marks ? marks[0].id : '',
    model: '',
    minYear: 0,
    maxYear: 0,
    minPrice: 0,
    maxPrice: 0,
    region: 'string'
  });

  // handleChange
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
    console.log(formData);
    // console.log(e.target.files);
  };

  return (
    <Form className="searchCarForm">
      <div className="searchCarFormDropdowns">
        <DropdownButton
          id="dropdown-type"
          title={
            <div className="d-flex align-items-center justify-content-between text-text-darkgray">
              <span>Легкові</span>
              <span className="searchDropdownToggle"></span>
            </div>
          }
          className="searchDropdownItem">
          <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
          <Dropdown.Item as="button">Action</Dropdown.Item>
          <Dropdown.Item as="button">Another action</Dropdown.Item>
          <Dropdown.Item as="button">Something else</Dropdown.Item>
        </DropdownButton>
        <SearchFormDropdownMarks
          marksIds={marks.map((mark) => mark.id)}
          marksNames={marks.map((mark) => mark.name)}
          formDataValue={formData.mark}
          handleChange={handleChange}
        />
        <DropdownButton
          id="dropdown-model"
          title={
            <div className="d-flex align-items-center justify-content-between text-text-darkgray">
              <span>Модель</span>
              <span className="searchDropdownToggle"></span>
            </div>
          }
          className="searchDropdownItem">
          <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
          <Dropdown.Item as="button">Action</Dropdown.Item>
          <Dropdown.Item as="button">Another action</Dropdown.Item>
          <Dropdown.Item as="button">Something else</Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          id="dropdown-region"
          title={
            <div className="d-flex align-items-center justify-content-between text-text-darkgray">
              <span>Регіон</span>
              <span className="searchDropdownToggle"></span>
            </div>
          }
          className="searchDropdownItem">
          <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
          <Dropdown.Item as="button">Action</Dropdown.Item>
          <Dropdown.Item as="button">Another action</Dropdown.Item>
          <Dropdown.Item as="button">Something else</Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          id="dropdown-year"
          title={
            <div className="d-flex align-items-center justify-content-between text-text-darkgray">
              <span>Рік випуску</span>
              <span className="searchDropdownToggle"></span>
            </div>
          }
          className="searchDropdownItem">
          <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
          <Dropdown.Item as="button">Action</Dropdown.Item>
          <Dropdown.Item as="button">Another action</Dropdown.Item>
          <Dropdown.Item as="button">Something else</Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          id="dropdown-price"
          title={
            <div className="d-flex align-items-center justify-content-between text-text-darkgray">
              <span>Ціна, $</span>
              <span className="searchDropdownToggle"></span>
            </div>
          }
          className="searchDropdownItem">
          <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
          <Dropdown.Item as="button">Action</Dropdown.Item>
          <Dropdown.Item as="button">Another action</Dropdown.Item>
          <Dropdown.Item as="button">Something else</Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="searchCarFormButtonContainer" md={12}>
        <Button className="searchButton searchCarFormButton">
          <div className="d-flex align-items-center justify-content-center">
            <span className="searchButtonIcon"></span>
            <span>Показати 247 900 оголошень</span>
          </div>
        </Button>
      </div>
    </Form>
  );
};
