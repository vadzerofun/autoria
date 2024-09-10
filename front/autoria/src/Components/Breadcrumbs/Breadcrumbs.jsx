import React from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Container } from 'react-bootstrap';
import './Breadcrumbs.css';

// Map to provide custom names for the breadcrumbs
const crumbNames = {
  home: 'Головна',
  cabinet: 'Особистий кабінет',
  'add-car': 'Створити оголошення',
  'edit-car': 'Редагувати оголошення',
  balance: 'Поповнити баланс',
  'edit-profile': 'Моя анкета'
};

export const Breadcrumbs = () => {
  // location
  const location = useLocation();

  if (location.pathname === '/') return <></>;
  

  // currentLink
  let currentLink = '';

  // crumbs
  const crumbs = location.pathname
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb, index) => {
      currentLink += `/${crumb}`;

      const crumbName = crumbNames[crumb];

      return (
        <>
          {crumbName && (
            <Breadcrumb.Item href={currentLink} key={`${crumb}-${index}`}>
              {crumbName}
            </Breadcrumb.Item>
          )}
        </>
      );
    });

  return (
    <Container>
      <Breadcrumb className="breadcrumbContainer">
        <Breadcrumb.Item href="/" key={`home-crumb`}>
          {crumbNames['home']}
        </Breadcrumb.Item>
        {crumbs}
      </Breadcrumb>
    </Container>
  );
};
