import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CarCard } from '../../CarCard/CarCard';
import './DeleteCarModal.css';

export const DeleteCarModal = (props) => {
  // console.log(props.car);

  // deleteCar
  const deleteCar = () => {
    axios    
    .delete(import.meta.env.VITE_REACT_API_URL + `Cars/${props.car.id}`)
    .then(()=>{
      props.onHide();
      location.reload();
    }) 
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body className="d-flex flex-column gap-3">
        <h4>Попередження</h4>
        <p>Ви впевнені що хочете видалити дане оголошення?</p>
        <div style={{ width: '100%', maxWidth: '370px', alignSelf: 'center' }}>
          <CarCard car={props.car} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="button-font modalBtnWidth" onClick={deleteCar} variant="primary">
          Так
        </Button>
        <Button className="button-font modalBtnWidth" onClick={props.onHide} variant="primary">
          Ні
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
