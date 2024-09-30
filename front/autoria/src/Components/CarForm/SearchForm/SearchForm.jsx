import React, { useState } from 'react';
import { Button, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import { SearchFormDropdownMarks } from './SearchFormDropdownMarks/SearchFormDropdownMarks';
import './SearchForm.css';
import { SearchFormDropdownRegion } from './SearchFormDropdownRegion/SearchFormDropdownRegion';
import { useAddCarData } from '../../../Contexts/addCar.context';
import { SearchFormDropdownType } from './SearchFormDropdownType/SearchFormDropdownType';
import { SearchFormDropdownYear } from './SearchFormDropdownYear/SearchFormDropdownYear';
import { SearchFormDropdownPrice } from './SearchFormDropdownPrice/SearchFormDropdownPrice';
import { SearchFormDropdownCurrency } from './SearchFormDropdownCurrency/SearchFormDropdownCurrency';
import { SearchFormDropdownModel } from './SearchFormDropdownModel/SearchFormDropdownModel';

export const SearchForm = ({ marks, carsCount }) => {
  // context
  const selectData = useAddCarData();
  const { selectRegionsAndCities, selectCarType, selectYear, selectCurrencies } = selectData;

  // formData
  const [formData, setFormData] = useState({
    type: -1,
    mark: '',
    model: '',
    minYear: 0,
    maxYear: 0,
    minPrice: '',
    maxPrice: '',
    region: '',
    currency: -1,
  });

  // handleChange
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
    console.log(formData);
  };

  // handleChangeFromTo
  const handleChangeFromTo = (e) => {
    const { nameFrom, nameTo, valueFrom, valueTo } = e.target;

    setFormData({
      ...formData,
      [nameFrom]: valueFrom,
      [nameTo]: valueTo
    });
    console.log(formData);
  };

  // handleFormattedNumberChange
  const handleFormattedNumberChange = (e) => {
    const { name, value } = e.target;
    const numericalValue = value === '' ? '' : Number(value.replace(/\s+/g, ''));

    if (!isNaN(numericalValue) && isFinite(numericalValue) && numericalValue >= 0) {
      setFormData({
        ...formData,
        [name]: numericalValue
      });
    }
  };

  return (
    <Form className="searchCarForm">
      <div className="searchCarFormDropdowns">
        <SearchFormDropdownType
          types={selectCarType.map((item) => item.type)}
          formDataValue={formData.type}
          handleChange={handleChange}
        />
        <SearchFormDropdownMarks
          marksIds={marks.map((mark) => mark.id)}
          marksNames={marks.map((mark) => mark.name)}
          formDataValue={formData.mark}
          handleChange={handleChange}
        />
        <SearchFormDropdownModel
          formDataValue={formData.model}
          handleChange={handleChange}
        />
        <SearchFormDropdownRegion
          regions={selectRegionsAndCities.map((item) => item.region)}
          formDataValue={formData.region}
          handleChange={handleChange}
        />
        <SearchFormDropdownYear
          years={selectYear}
          formDataStart={formData.minYear}
          formDataEnd={formData.maxYear}
          handleChange={handleChange}
          handleChangeFromTo={handleChangeFromTo}
        />
        <div className="searchFormPriceGroup">
          <SearchFormDropdownPrice
            formDataStart={formData.minPrice}
            formDataEnd={formData.maxPrice}
            handleChange={handleFormattedNumberChange}
            handleChangeFromTo={handleChangeFromTo}
          />
          <SearchFormDropdownCurrency
            currencies={selectCurrencies}
            formDataValue={formData.currency}
            handleChange={handleChange}
          />
        </div>
      </div>
      <div className="searchCarFormButtonContainer" md={12}>
        <Button className="searchButton searchCarFormButton" href="/search-cars">
          <div className="d-flex align-items-center justify-content-center">
            <span className="searchButtonIcon"></span>
            <span>Показати {carsCount} оголошень</span>
          </div>
        </Button>
      </div>
    </Form>
  );
};
