import React, { useState } from 'react';
import axios from 'axios';
import '../AddCarForm/AddCarForm.css';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useAddCarData } from '../../../Contexts/addCar.context';
import { DragAndDropUpload } from '../DragAndDropUpload/DragAndDropUpload';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { formatNumber } from '../../../Services/formatService';
import { CarTypeDropdown } from '../CarTypeDropdown/CarTypeDropdown';
import useLoadAddCarFormData from '../../../Hooks/useLoadAddCarFormData';

export const EditCarForm = ({ carData, token }) => {
  // useNavigate
  const navigate = useNavigate();

  // context
  const selectData = useAddCarData();
  const {
    selectCarType,
    selectYear,
    selectEngineType,
    selectOccasion,
    selectTransmissionType,
    selectState,
    selectRegionsAndCities
  } = selectData;
  // console.log(selectCarType);

  // formData
  const [formData, setFormData] = useState(carData);
  console.log(formData);

  // load data for form
  const { marks, loading, error } = useLoadAddCarFormData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // handleChange
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
    // console.log(formData);
    // console.log(e.target.files);
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

  // handleFilesAdded
  const handleFilesAdded = (files) => {
    setFormData((prevData) => ({
      ...prevData,
      ImageFiles: [...prevData.ImageFiles, ...files]
    }));
  };

  // Format the number for display
  const formattedMileage = formatNumber(formData.Mileage);
  const formattedPrice = formatNumber(formData.Price);

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(formData);

    const formDataToSend = new FormData();

    // Append required
    formDataToSend.append('id', formData.id);
    formDataToSend.append('Type', formData.Type);
    formDataToSend.append('Body', formData.Body);
    formDataToSend.append('MakeId', formData.MakeId);
    formDataToSend.append('Model', formData.Model);
    formDataToSend.append('Year', formData.Year);
    formDataToSend.append('Mileage', formData.Mileage);
    formDataToSend.append('Price', formData.Price);
    formDataToSend.append('Сurrency', formData.Сurrency);
    formDataToSend.append('Engine_type', formData.Engine_type);
    formDataToSend.append('Occasion', formData.Occasion);
    formDataToSend.append('Carrying_capacity_ton', formData.Carrying_capacity_ton);
    formDataToSend.append('Number_of_seats', formData.Number_of_seats);
    formDataToSend.append('Road_accident', formData.Road_accident);
    formDataToSend.append('Owners_number', formData.Owners_number);
    formDataToSend.append('Wanted', formData.Wanted);
    formDataToSend.append('Car_number', formData.Car_number);
    formDataToSend.append('Car_vin_code', formData.Car_vin_code);
    formDataToSend.append('Region', formData.Region);
    formDataToSend.append('Description', formData.Description);
    formDataToSend.append('State', formData.State);
    formDataToSend.append('SellerName', formData.SellerName);
    formDataToSend.append('SellerPhone', formData.SellerPhone);

    // Append optional
    if (formData.Engine_capacity || formData.Engine_capacity === 0) {
      // 0, 1, 2 ... (double)
      formDataToSend.append('Engine_capacity', formData.Engine_capacity);
    }
    if (formData.Transmission_type || formData.Transmission_type === 0) {
      // 0, 1, 2 ... (int)
      formDataToSend.append('Transmission_type', formData.Transmission_type);
    }
    if (formData.Color) {
      formDataToSend.append('Color', formData.Color);
    }
    if (formData.City) {
      formDataToSend.append('City', formData.City);
    }
    if (formData.SellerPhoneExtra) {
      formDataToSend.append('SellerPhoneExtra', formData.SellerPhoneExtra);
    }

    // Append image files if they exist
    if (formData.ImageFiles && formData.ImageFiles.length > 0) {
      for (let i = 0; i < formData.ImageFiles.length; i++) {
        formDataToSend.append('ImageFiles', formData.ImageFiles[i]);
      }
    }

    axios
      .post(import.meta.env.VITE_REACT_API_URL + `Cars/EditCar`, formDataToSend)
      .then(() => {
        window.location = window.location;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <section className="addCarContainer">
        <Form onSubmit={handleSubmit} className="addCarForm">
          <h1 className="addCarFirstHeader fs-2 fw-bold">Редагувати оголошення</h1>
          <Form.Group controlId="addCarFormCarType" className="mb-4">
            {/* <Form.Label>Select an option</Form.Label> */}
            {/* <Form.Select onChange={handleChange} name="Type" value={formData.Type}>
              {selectCarType.map((carType, index) => (
                <option value={index} key={`carType-${index}`}>
                  {carType.type}
                </option>
              ))}
            </Form.Select> */}
            <CarTypeDropdown
              selectCarType={selectCarType}
              formDataType={formData.Type}
              handleChange={handleChange}
            />
          </Form.Group>
          <h2 className="fs-2 fw-bold mb-4">Оголошення</h2>
          <Form.Group controlId="addCarFormCarBody" className="mb-4">
            <Form.Label className="fs-5 fw-semibold">Кузов</Form.Label>
            <Form.Select onChange={handleChange} name="Body" value={formData.Body}>
              <option value="">Вибрати</option>
              {selectCarType
                .find((value, index, obj) => index == formData.Type)
                ?.bodies.map((carBody, index) => (
                  <option value={carBody} key={`carBody-${index}`}>
                    {carBody}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          <div className="addCarFormDivider mb-4"></div>
          <div className="addCarFormFields">
            <Form.Group controlId="addCarFormCarMake" className="mb-4">
              <Form.Label className="fs-5 fw-semibold">Марка</Form.Label>
              <Form.Select onChange={handleChange} name="MakeId" value={formData.MakeId}>
                <option value="">Вибрати</option>
                {marks.map((mark, index) => (
                  <option value={mark.id} key={`mark-${index}`}>
                    {mark.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="addCarFormCarModel" className="mb-4">
              <Form.Label className="fs-5 fw-semibold">Модель</Form.Label>
              <Form.Control
                type="text"
                name="Model"
                value={formData.Model}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
          <div className="addCarFormDivider mb-4"></div>
          <div className="addCarFormFields">
            <Form.Group controlId="addCarFormCarYear" className="mb-4">
              <Form.Label className="fs-5 fw-semibold">Рік</Form.Label>
              <Form.Select onChange={handleChange} name="Year" value={formData.Year}>
                <option value="">Вибрати</option>
                {selectYear.map((year, index) => (
                  <option value={year} key={`year-${index}`}>
                    {year}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="addCarFormCarMileage" className="mb-4">
              <Form.Label className="fs-5 fw-semibold">Пробіг</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="Mileage"
                  value={formattedMileage}
                  onChange={handleFormattedNumberChange}
                />
                <InputGroup.Text>КМ</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>
          <div className="addCarFormPrice">
            <Form.Group controlId="addCarFormCarPrice" className="mb-4">
              <Form.Label className="fs-5 fw-semibold">Ціна</Form.Label>
              <Form.Control
                type="text"
                name="Price"
                value={formattedPrice}
                onChange={handleFormattedNumberChange}
              />
            </Form.Group>
            <Form.Group controlId="addCarFormCarСurrency" className="mb-4">
              <Form.Select onChange={handleChange} name="Сurrency" value={formData.Сurrency}>
                <option value="0">$</option>
                <option value="1">€</option>
                <option value="2">₴</option>
              </Form.Select>
            </Form.Group>
          </div>
          <h2 className="fs-2 fw-bold mb-4">Параметри</h2>
          <div className="addCarFormFields">
            <Form.Group
              controlId="addCarFormCarEngine_type"
              className="mb-4"
              value={formData.Engine_type}>
              <Form.Label className="fs-5 fw-semibold">Паливо</Form.Label>
              <Form.Select onChange={handleChange} name="Engine_type" value={formData.Engine_type}>
                <option value="">Вибрати</option>
                {selectEngineType.map((type, index) => (
                  <option value={index} key={`Engine_type-${index}`}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {formData.Engine_type != 5 && (
              <Form.Group controlId="addCarFormCarEngine_capacity" className="mb-4">
                <Form.Label className="fs-5 fw-semibold">Об’єм двигуна, л</Form.Label>
                <Form.Control
                  type="text"
                  name="Engine_capacity"
                  value={formData.Engine_capacity}
                  onChange={handleFormattedNumberChange}
                />
              </Form.Group>
            )}
          </div>
          <div className="addCarFormFields">
            <Form.Group controlId="addCarFormCarOccasion" className="mb-4">
              <Form.Label className="fs-5 fw-semibold">Привід</Form.Label>
              <Form.Select onChange={handleChange} name="Occasion" value={formData.Occasion}>
                <option value="">Вибрати</option>
                {selectOccasion.map((type, index) => (
                  <option value={index} key={`Occasion-${index}`}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {formData.Engine_type != 5 && (
              <Form.Group controlId="addCarFormCarTransmission_type" className="mb-4">
                <Form.Label className="fs-5 fw-semibold">Коробка передач</Form.Label>
                <Form.Select
                  onChange={handleChange}
                  name="Transmission_type"
                  value={formData.Transmission_type}>
                  <option value="">Вибрати</option>
                  {selectTransmissionType.map((type, index) => (
                    <option value={index} key={`Transmission_type-${index}`}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}
          </div>
          <div className="addCarFormFields">
            <Form.Group controlId="addCarFormCarCarrying_capacity_ton" className="mb-4">
              <Form.Label className="fs-5 fw-semibold">Вантажопідйомність</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="Carrying_capacity_ton"
                  value={formData.Carrying_capacity_ton}
                  onChange={handleFormattedNumberChange}
                />
                <InputGroup.Text>Т</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>
          <div className="addCarFormDivider mb-4"></div>
          <div className="addCarFormFields">
            <Form.Group controlId="addCarFormCarState" className="mb-4">
              <Form.Label className="fs-5 fw-semibold">Стан</Form.Label>
              <Form.Select onChange={handleChange} name="State" value={formData.State}>
                <option value="">Вибрати</option>
                {selectState.map((state, index) => (
                  <option value={index} key={`state-${index}`}>
                    {state}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="addCarFormCarColor" className="mb-4">
              <Form.Label className="fs-5 fw-semibold">Колір</Form.Label>
              <Form.Control
                type="text"
                name="Color"
                value={formData.Color}
                onChange={handleChange}
                placeholder="Не обов’язково"
              />
            </Form.Group>
          </div>
          <div className="addCarFormFields">
            <Form.Group controlId="addCarFormCarNumber_of_seats" className="mb-4">
              <Form.Label className="fs-5 fw-semibold">Кількість посадочних місць</Form.Label>
              <Form.Control
                type="number"
                name="Number_of_seats"
                value={formData.Number_of_seats}
                onChange={handleFormattedNumberChange}
              />
            </Form.Group>
            <Form.Group controlId="addCarFormCarRoad_accident" className="mb-4">
              <Form.Label className="fs-5 fw-semibold">Участь в ДТП</Form.Label>
              <Form.Select
                onChange={handleChange}
                name="Road_accident"
                value={formData.Road_accident}>
                <option value="">Вибрати</option>
                <option value="Так, був в ДТП">Так, був в ДТП</option>
                <option value="Ні, не був в ДТП">Ні, не був в ДТП</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div className="addCarFormFields">
            <Form.Group
              controlId="addCarFormCarOwners_number"
              className="mb-4"
              value={formData.Owners_number}>
              <Form.Label className="fs-5 fw-semibold">Кількість власників</Form.Label>
              <Form.Control
                type="number"
                name="Owners_number"
                value={formData.Owners_number}
                onChange={handleFormattedNumberChange}
              />
            </Form.Group>
            <Form.Group controlId="addCarFormCarWanted" className="mb-4">
              <Form.Label className="fs-5 fw-semibold">Стан в розшуку</Form.Label>
              <Form.Select onChange={handleChange} name="Wanted" value={formData.Wanted}>
                <option value={''}>Вибрати</option>
                <option value={true}>В розшуку</option>
                <option value={false}>Не в розшуку</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div className="addCarFormFields">
            <Form.Group controlId="addCarFormCarCar_number" className="mb-4">
              <Form.Label className="fs-5 fw-semibold">Держномер авто</Form.Label>
              <Form.Control
                type="text"
                name="Car_number"
                value={formData.Car_number}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="addCarFormCarCar_vin_code" className="mb-4">
              <Form.Label className="fs-5 fw-semibold">VIN-код</Form.Label>
              <Form.Control
                type="text"
                name="Car_vin_code"
                value={formData.Car_vin_code}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
          <div className="addCarFormDivider mb-4"></div>
          <div className="addCarFormFields">
            <Form.Group controlId="addCarFormCarRegion" className="mb-4">
              <Form.Label className="fs-5 fw-semibold">Область</Form.Label>
              <Form.Select onChange={handleChange} name="Region" value={formData.Region}>
                <option value="">Вибрати</option>
                {selectRegionsAndCities.map((item, index) => (
                  <option value={item.region} key={`Region-${index}`}>
                    {item.region}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="addCarFormCarCity" className="mb-4">
              <Form.Label className="fs-5 fw-semibold">Місто</Form.Label>
              <Form.Select
                onChange={handleChange}
                name="City"
                disabled={!formData.Region ? true : false}
                value={formData.City}>
                <option value="">Не обов'язково</option>
                {selectRegionsAndCities
                  .find((value, index, obj) => value.region === formData.Region)
                  ?.cities.map((city, index) => (
                    <option value={city} key={`City-${index}`}>
                      {city}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </div>
          <h2 className="fs-2 fw-bold mb-4">Опис</h2>
          <div className="addCarFormDescriptionFields">
            <Form.Group controlId="addCarFormCarTitle" className="mb-4">
              <Form.Control
                type="text"
                value={
                  marks.find(mark=>mark.id === formData.MakeId) &&
                  formData.Model &&
                  `${marks.find(mark=>mark.id === formData.MakeId)?.name} ${formData.Model}`
                }
                placeholder="Титул оголошення"
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="addCarFormDescription" className="mb-4">
              <Form.Control
                as="textarea"
                rows={10}
                name="Description"
                value={formData.Description}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
          <h2 className="fs-2 fw-bold mb-4">Контакти</h2>
          <div className="addCarFormFields">
            <Form.Group controlId="addCarFormCarSellerPhone" className="mb-4">
              <Form.Label className="fs-5 fw-semibold">Телефон</Form.Label>
              <Form.Control
                type="text"
                name="SellerPhone"
                value={formData.SellerPhone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="addCarFormCarSellerName" className="mb-4">
              <Form.Label className="fs-5 fw-semibold">Ваше ім'я</Form.Label>
              <Form.Control
                type="text"
                name="SellerName"
                value={formData.SellerName}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
          <div className="addCarFormFields">
            <Form.Group controlId="addCarFormCarSellerPhoneExtra" className="mb-4">
              <Form.Label className="fs-5 fw-semibold">Дод. телефон</Form.Label>
              <Form.Control
                type="text"
                name="SellerPhoneExtra"
                value={formData.SellerPhoneExtra}
                onChange={handleChange}
                placeholder="Не обов’язково"
              />
            </Form.Group>
          </div>
          <h2 className="fs-2 fw-bold mb-4">Фото</h2>
          <div className="addCarFormPhotos">
            <DragAndDropUpload
              onFilesAdded={handleFilesAdded}
              images={formData.ImageFiles}
              dbImages={formData.ImagesPath}
              carId={formData.id}
              setFormData={setFormData}
            />
          </div>
          <Button variant="primary" type="submit" className="addCarFormBtn">
            Редагувати оголошення
          </Button>
        </Form>
      </section>
    </Container>
  );
};
