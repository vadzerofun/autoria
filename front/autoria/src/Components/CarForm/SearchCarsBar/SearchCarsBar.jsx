import React from 'react';
import { Button, Form, Badge } from 'react-bootstrap';
import './SearchCarsBar.css';
import { CrossIcon } from '../../Icons/CrossIcon/CrossIcon';

function SearchCarsBar() {
  const badges = Array(3).fill('Легкові'); // Array with 10 elements
  return (
    <Form>
      <div className="searchCarsBarFormContainer">
        <div className="searchCarsBarSearchBar">
          <div className="searchCarsBarBadges">
            {badges.map((badgeText, index) => (
              <Badge variant="primary" key={index}>
                <span className="searchCarsBarBadgeText">{badgeText}</span>
                <span className="searchCarsBarBadgeIcon">
                  <CrossIcon color="#fff" width={24} height={24} />
                </span>
              </Badge>
            ))}
          </div>
          <Form.Control type="text" placeholder="" />
        </div>
        <Button className="searchCarsBarButton" variant="outline-primary">
          Уточнити пошук
        </Button>
      </div>
    </Form>
  );
}

export default SearchCarsBar;
