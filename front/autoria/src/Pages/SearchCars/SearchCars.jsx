import React, { useEffect, useState } from 'react';
import { Layout } from '../../Components/Layouts/Layout/Layout';
import { Col, Container, Row } from 'react-bootstrap';
import SearchCarsBar from '../../Components/CarForm/SearchCarsBar/SearchCarsBar';
import './SearchCars.css';
import { SearchCarsSortDropdown } from '../../Components/CarForm/SearchCarsForm/SearchCarsSortDropdown/SearchCarsSortDropdown';
import { SearchCarsForm } from '../../Components/CarForm/SearchCarsForm/SearchCarsForm';
import { useAddCarData } from '../../Contexts/addCar.context';
import { Link, useSearchParams } from 'react-router-dom';
import useLoadSearchCars from '../../Hooks/useLoadSearchCars';
import { FavoriteCarCardBig } from '../../Components/CarCards/FavoriteCarCardBig/FavoriteCarCardBig';
import { getUserIdFromToken } from '../../Services/authService';
import useToken from '../../Hooks/useToken';
import { FavoriteCarCard } from '../../Components/CarCards/FavoriteCarCard/FavoriteCarCard';

export const SearchCars = () => {
  // showOffcanvas
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const displayOffcanvas = () => {
    setShowOffcanvas(true);
  };
  // user, token
  const { token, setToken } = useToken();
  const [userId, setUserId] = useState(getUserIdFromToken(token));

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

  // Initialize useSearchParams
  const [searchParams, setSearchParams] = useSearchParams();

  // useEffect to update URL search params
  useEffect(() => {
    const updateSearchParams = (data) => {
      const params = {};

      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            params[key] = value.join(',');
          }
        } else if (value !== '' && value !== 0 && value !== -1) {
          params[key] = value;
        }
      });

      // Set new searchParams (it will update the URL)
      setSearchParams(params);
    };

    // Trigger the update whenever formData changes
    updateSearchParams(formData);
  }, [formData, setSearchParams]);

  // context
  const selectData = useAddCarData();

  const sortOptions = ['Від дешевих до дорогих', 'Від дорогих до дешевих'];
  const publishmentTimeOptions = ['За весь час', 'За місяць', 'За тиждень'];

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const { cars, marks, loading, error } = useLoadSearchCars();
  console.log(cars);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // set marks
  cars.forEach((car) => {
    car.make = marks.find((mark) => mark.id === car.makeId)?.name;
  });

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

  // handleBadgeRemove
  const handleBadgeRemove = (filterKey) => {
    setFormData((prevData) => ({
      ...prevData,
      [filterKey]: filterKey === 'minYear' || filterKey === 'maxYear' ? 0 : '' // Reset specific single-value filters
    }));
  };

  const handleArrayBadgeRemove = (filterKey, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [filterKey]: prevData[filterKey].filter((item) => item !== value) // Remove the specific value from array
    }));
  };

  return (
    <Layout>
      <Container>
        <section className="searchCarsSearch mb-4">
          <h1 className="fs-4 fw-bold">Пошук авто</h1>
          <Row>
            <Col xs={12} md={10}>
              <div className="searchCarsSearchOffersCount">300 000 пропозицій</div>
              <SearchCarsBar
                formData={formData}
                selectData={selectData}
                handleBadgeRemove={handleBadgeRemove}
                handleArrayBadgeRemove={handleArrayBadgeRemove}
              />
            </Col>
          </Row>
        </section>
        <section className="searchCarsMain">
          <div className="searchCarsSidebar">
            <SearchCarsForm
              formData={formData}
              selectData={selectData}
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
            <div className="searchCarsListCars">
              {cars                
                .map((car, index) => (
                  <Link to={`/cars/${car.id}`} className="noFontStyle" key={`cars-${index}`}>
                    <FavoriteCarCard
                      car={car}
                      userId={userId}
                      displayOffcanvas={displayOffcanvas}
                    />
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </Container>
    </Layout>
  );
};
