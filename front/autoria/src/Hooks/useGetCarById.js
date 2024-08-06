// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const useGetCarById = (carId) => {
//   const [car, setCar] = useState(null);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCar = async () => {
//       await axios
//         .get(`${import.meta.env.VITE_REACT_API_URL}Cars/${carId}`)
//         .then((response) => {
//           setCar(response.data);
//           return response.data;                  
//         })
//         .then((carData)=>{
//           fetchUser(carData.userId);
//         })
//         .catch((error) => {
//           setError(error);
//         })
//         .finally(() => {
//           setLoading(false);          
//         });
//     };

//     const fetchUser = async (userId) => {
//       await axios
//         .get(`${import.meta.env.VITE_REACT_API_URL}User/${userId}`)
//         .then((response) => {
//           setUser(response.data);
//           console.log(response.data);          
//         })
//         .catch((errorUser) => {
//           setError(errorUser);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     };    

//     fetchCar();
//   }, [carId]);

//   return { car, user, loading, error };
// };

// export default useGetCarById;
import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetCarById = (carId) => {
  const [car, setCar] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarAndUser = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch car data
        const carResponse = await axios.get(`${import.meta.env.VITE_REACT_API_URL}Cars/${carId}`);
        const carData = carResponse.data;
        setCar(carData);

        // View car
        if (carData) {
          await axios.get(`${import.meta.env.VITE_REACT_API_URL}Cars/ViewCar?CarId=${carId}`);
        }

        // Fetch user data using car's userId
        if (carData.userId) {
          const userResponse = await axios.get(`${import.meta.env.VITE_REACT_API_URL}User/${carData.userId}`);
          setUser(userResponse.data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarAndUser();
  }, [carId]);

  return { car, user, loading, error };
};

export default useGetCarById;
