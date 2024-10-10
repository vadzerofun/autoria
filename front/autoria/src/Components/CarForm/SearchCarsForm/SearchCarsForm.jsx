import React from 'react';
import { useAddCarData } from '../../../Contexts/addCar.context';
import './SearchCarsForm.css';
import { Button, Form } from 'react-bootstrap';

export const SearchCarsForm = ({
  marks,
  formData,
  selectData,
  handleChange,
  handleFormattedNumberChange,
  handleChangeTypes,
  handleChangeBodies,
  handleChangeGearboxes,
  handleChangeEngineTypes,
  handleChangeOccasion,
  resetFormData
}) => {
  
  const {
    selectRegionsAndCities,
    selectCarType,
    selectYear,
    selectCurrencies,
    selectTransmissionType,
    selectEngineType,
    selectOccasion
  } = selectData;

  return (
    <Form className="searchCarsForm">
      <div className="searchCarsFormItem">
        <span className="searchCarsFormItemTitle">Тип транспорту</span>
        {selectCarType.map((carType, index) => (
          <Form.Check
            type="checkbox"
            id={`carType-${index}`}
            label={<>{carType.type}</>}
            value={index}
            checked={formData.types.includes(index.toString())}
            onChange={(e) => handleChangeTypes(e.target.value)}
          />
        ))}
      </div>
      {formData.types.length > 0 && (
        <div className="searchCarsFormItem searchCarsFormBodies">
          <span className="searchCarsFormItemTitle">Тип кузова</span>
          {selectCarType
            .filter((carType, index) => formData.types.includes(index.toString()))
            .reduce((acc, carType) => {
              return acc.concat(carType.bodies);
            }, [])
            .map((body, bodyIndex) => (
              <Form.Check
                key={bodyIndex}
                type="checkbox"
                id={`body-${bodyIndex}`}
                label={<>{body}</>}
                value={body}
                checked={formData.selectedBodies?.includes(body)}
                onChange={(e) => handleChangeBodies(e.target.value)}
              />
            ))}
        </div>
      )}
      <div className="searchCarsFormItem">
        <span className="searchCarsFormItemTitle">Коробка передач</span>
        {selectTransmissionType.map((transmissionType, index) => (
          <Form.Check
            type="checkbox"
            id={`transmissionType-${index}`}
            label={<>{transmissionType}</>}
            value={index}
            checked={formData.gearBoxes.includes(index.toString())}
            onChange={(e) => handleChangeGearboxes(e.target.value)}
          />
        ))}
      </div>
      <div className="searchCarsFormItem">
        <span className="searchCarsFormItemTitle">Паливо</span>
        {selectEngineType.map((engineType, index) => (
          <Form.Check
            type="checkbox"
            id={`engineType-${index}`}
            label={<>{engineType}</>}
            value={index}
            checked={formData.engine_types.includes(index.toString())}
            onChange={(e) => handleChangeEngineTypes(e.target.value)}
          />
        ))}
      </div>
      <div className="searchCarsFormItem">
        <span className="searchCarsFormItemTitle">Привід</span>
        {selectOccasion.map((occasion, index) => (
          <Form.Check
            type="checkbox"
            id={`occasion-${index}`}
            label={<>{occasion}</>}
            value={index}
            checked={formData.occasions.includes(index.toString())}
            onChange={(e) => handleChangeOccasion(e.target.value)}
          />
        ))}
      </div>
      {/* <Button className="searchCarsFormButton">
        <div className="d-flex align-items-center justify-content-center">Застосувати</div>
      </Button> */}
      <Button
        className="searchCarsFormButtonReset"
        variant="outline-darkgray"
        onClick={resetFormData}>
        <div className="d-flex align-items-center justify-content-center">Очистити все</div>
      </Button>
    </Form>
  );
};
