const CarType = {
  0: 'Легкова',
  1: 'Вантажна',
  2: 'Мікроавтобус',
  3: 'Позашляховик',
  4: 'Вантажівка',
  5: 'Фургон'
};

const getCarType = (carTypeIndex) => {
  return CarType[carTypeIndex] || 'Невідомий тип';
}

export default getCarType;