import News1 from '../../assets/images/news/news-01.jpeg';
import News2 from '../../assets/images/news/news-02.jpeg';
import News3 from '../../assets/images/news/news-03.jpeg';
import News4 from '../../assets/images/news/news-04.jpeg';

const arrNews = [
  {
    imgURL: News1,
    title: 'Новий Audi SQ7 2026 вперше показали наживо.',
    likes: Array.from(Array(11378).keys()),
    date: formatDate(new Date())
  },
  {
    imgURL: News2,
    title: 'Новий Audi SQ7 2026 вперше показали наживо.',
    likes: Array.from(Array(5301).keys()),
    date: formatDate(new Date())
  },
  {
    imgURL: News3,
    title: 'Новий Audi SQ7 2026 вперше показали наживо.',
    likes: Array.from(Array(3495).keys()),
    date: formatDate(new Date())
  },
  {
    imgURL: News4,
    title: 'Новий Audi SQ7 2026 вперше показали наживо.',
    likes: Array.from(Array(25433).keys()),
    date: formatDate(new Date())
  },
];

export default arrNews;

function formatDate(date) {
  // Extract components
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();

  // Format date as "HH:MM DD.MM.YYYY"
  return `${hours}:${minutes} ${day}.${month}.${year}`;
}
