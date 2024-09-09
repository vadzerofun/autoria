import React, { useState } from 'react';
import './Subscriptions.css';
import { CabinetLayout } from '../../../Components/Layouts/CabinetLayout/CabinetLayout';

export const Subscriptions = () => {  
  return (
    <CabinetLayout>
      <section className="d-flex flex-column gap-4">
        <h2 className="fs-3 fw-semibold text-primary">Ваші підписки</h2>
        
      </section>
    </CabinetLayout>
  );
};
