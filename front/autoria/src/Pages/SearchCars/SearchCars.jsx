import React, { useEffect, useState } from 'react';
import { Layout } from '../../Components/Layouts/Layout/Layout';
import { Col, Container, Row } from 'react-bootstrap';
import SearchCarsBar from '../../Components/CarForm/SearchCarsBar/SearchCarsBar';
import './SearchCars.css';
import { SearchCarsSortDropdown } from '../../Components/CarForm/SearchCarsForm/SearchCarsSortDropdown/SearchCarsSortDropdown';
import { SearchCarsForm } from '../../Components/CarForm/SearchCarsForm/SearchCarsForm';

export const SearchCars = () => {
  // formData
  const [formData, setFormData] = useState({
    types: [],
    bodies: [],
    gearBoxes: [],
    engine_types: [],
    occasions: [],
    mark: '',
    model: '',
    minYear: 0,
    maxYear: 0,
    minPrice: '',
    maxPrice: '',
    region: '',
    currency: -1,
    sortOption: 0,
    publishmentTime: 0
  });

  const sortOptions = ['Від дешевих до дорогих', 'Від дорогих до дешевих'];
  const publishmentTimeOptions = ['За весь час', 'За місяць', 'За тиждень'];

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // handleChange
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  // handleChangeTypes
  const handleChangeTypes = (value) => {
    setFormData((prev) => {
      const types = prev.types.includes(value)
        ? prev.types.filter((type) => type !== value) // Uncheck
        : [...prev.types, value]; // Check

      return { ...prev, types };
    });
  };

  // handleChangeBodies
  const handleChangeBodies = (value) => {
    setFormData((prev) => {
      const bodies = prev.bodies.includes(value)
        ? prev.bodies.filter((body) => body !== value) // Uncheck
        : [...prev.bodies, value]; // Check

      return { ...prev, bodies };
    });
  };

  // handleChangeGearboxes
  const handleChangeGearboxes = (value) => {
    setFormData((prev) => {
      const gearBoxes = prev.gearBoxes.includes(value)
        ? prev.gearBoxes.filter((gearBox) => gearBox !== value) // Uncheck
        : [...prev.gearBoxes, value]; // Check

      return { ...prev, gearBoxes };
    });
  };

  // handleChangeOccasion
  const handleChangeOccasion = (value) => {
    setFormData((prev) => {
      const occasions = prev.occasions.includes(value)
        ? prev.occasions.filter((occasion) => occasion !== value) // Uncheck
        : [...prev.occasions, value]; // Check

      return { ...prev, occasions };
    });
  };

  // handleChangeEngineTypes
  const handleChangeEngineTypes = (value) => {
    setFormData((prev) => {
      const engine_types = prev.engine_types.includes(value)
        ? prev.engine_types.filter((engineType) => engineType !== value) // Uncheck
        : [...prev.engine_types, value]; // Check

      return { ...prev, engine_types };
    });
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

  // resetFormData
  const resetFormData = () => {
    setFormData({
      types: [],
      bodies: [],
      gearBoxes: [],
      engine_types: [],
      occasions: [],
      mark: '',
      model: '',
      minYear: 0,
      maxYear: 0,
      minPrice: '',
      maxPrice: '',
      region: '',
      currency: -1,
      sortOption: 0,
      publishmentTime: 0
    });
  };

  return (
    <Layout>
      <Container>
        <section className="searchCarsSearch mb-4">
          <h1 className="fs-4 fw-bold">Пошук авто</h1>
          <Row>
            <Col xs={12} md={10}>
              <div className="searchCarsSearchOffersCount">300 000 пропозицій</div>
              <SearchCarsBar />
            </Col>
          </Row>
        </section>
        <section className="searchCarsMain">
          <div className="searchCarsSidebar">
            <SearchCarsForm
              formData={formData}
              handleChange={handleChange}
              handleFormattedNumberChange={handleFormattedNumberChange}
              handleChangeTypes={handleChangeTypes}
              handleChangeBodies={handleChangeBodies}
              handleChangeGearboxes={handleChangeGearboxes}
              handleChangeEngineTypes={handleChangeEngineTypes}
              handleChangeOccasion={handleChangeOccasion}
              resetFormData={resetFormData}
            />
          </div>
          <div className="searchCarsList">
            <div className="searchCarsListSort">
              <div className="searchCarsListSortItem">
                <span>Сортування:</span>
                <SearchCarsSortDropdown
                  name="sortOption"
                  options={sortOptions}
                  formDataValue={formData.sortOption}
                  handleChange={handleChange}
                />
              </div>
              <div className="searchCarsListSortItem">
                <span>Період подачі:</span>
                <SearchCarsSortDropdown
                  name="publishmentTime"
                  options={publishmentTimeOptions}
                  formDataValue={formData.publishmentTime}
                  handleChange={handleChange}
                />
              </div>
            </div>
          </div>
        </section>
      </Container>
    </Layout>
  );
};
