const Occasion = {
  0: 'Передній',
  1: 'Задній',
  2: 'Повний',
};

const getOccasion = (occasionIndex) => {
  return Occasion[occasionIndex] || 'Невідомо';
}

export default getOccasion;