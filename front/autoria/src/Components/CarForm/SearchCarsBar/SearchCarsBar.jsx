import React from 'react';
import { Button, Form, Badge } from 'react-bootstrap';
import './SearchCarsBar.css';
import { CrossIcon } from '../../Icons/CrossIcon/CrossIcon';

function SearchCarsBar({
  formData,
  selectData,
  handleBadgeRemove,
  handleArrayBadgeRemove,
  handleChange,
  handleSearchClick,
}) {
  // const badges = Array(3).fill('Легкові'); // Array with 10 elements
  const transformedData = {
    types: selectData.selectCarType,
    gearBoxes: selectData.selectTransmissionType,
    engine_types: selectData.selectEngineType,
    occasions: selectData.selectOccasion
  };
  // console.log(transformedData['types'][0]);

  return (
    <Form>
      <div className="searchCarsBarFormContainer">
        <div className="searchCarsBarSearchBar">
          <div className="searchCarsBarBadges">
            {/* {badges.map((badgeText, index) => (
              <Badge variant="primary" key={index}>
                <span className="searchCarsBarBadgeText">{badgeText}</span>
                <span className="searchCarsBarBadgeIcon">
                  <CrossIcon color="#fff" width={24} height={24} />
                </span>
              </Badge>
            ))} */}
            {/* Render array-based badges (like types, bodies, etc.) */}
            {['types', 'bodies', 'gearBoxes', 'engine_types', 'occasions'].map((filterKey) =>
              formData[filterKey].map((badgeText, index) => (
                <Badge variant="primary" key={`${filterKey}-${index}`}>
                  <span className="searchCarsBarBadgeText">{`${
                    filterKey === 'types'
                      ? transformedData[filterKey][badgeText].type
                      : filterKey === 'bodies'
                      ? badgeText
                      : transformedData[filterKey][badgeText]
                  }`}</span>
                  <button
                    type="button"
                    onClick={() => handleArrayBadgeRemove(filterKey, badgeText)}
                    className="searchCarsBarBadgeIcon">
                    <CrossIcon color="#fff" width={24} height={24} />
                  </button>
                </Badge>
              ))
            )}
          </div>
          <Form.Control
            type="text"
            placeholder=""
            value={formData.searchString}
            onChange={handleChange}
            name="searchString"
          />
        </div>
        <Button className="searchCarsBarButton" variant="outline-primary" onClick={handleSearchClick}>
          Уточнити пошук
        </Button>
      </div>
    </Form>
  );
}

export default SearchCarsBar;
