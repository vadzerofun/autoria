const Transmission = {
  0: 'Механічна',
  1: 'Автомат',
};

const getTransmission = (transmissionIndex) => {
  return Transmission[transmissionIndex] || 'Невідомо';
}

export default getTransmission;