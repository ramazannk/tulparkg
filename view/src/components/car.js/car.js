import axios from 'axios';
import { useEffect, useState } from 'react';
import loc from '../../view/img/location.png';
import './car.scss';

const Car = () => {
  const [locat, setLocation] = useState({ lat: 0, lng: 0 });
  const [product, setProduct] = useState([]);
  const [isConfurim, setIsConfurim] = useState(false); // Assuming you have this state
  const [carId, setCarId] = useState(null);

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          console.log("Location obtained:", latitude, longitude);
          resolve({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          reject(error);
        }
      );
    });
  };

  const upDate = async (id, lat, lng, isConfurim) => {
    try {
      await axios.post('http://localhost:4000/submit/car', { id, lat, lng, isConfurim });
      console.log("Location updated in database:", { id, lat, lng });
    } catch (err) {
      console.log("Error updating location:", err);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get('http://localhost:4000/homepage');
        setProduct(res.data); // Set product data
        if (res.data.length > 0) {
          setCarId(res.data[0].id); // Assuming first item has the car ID
        }
      } catch (err) {
        console.log("Error fetching product:", err);
      }
    };

    const updateLocation = async () => {
      try {
        const { lat, lng } = await getLocation();
        if (carId) {
          await upDate(carId, lat, lng, isConfurim);
        }
      } catch (err) {
        console.error("Failed to update location:", err);
      }
    };

    fetchProduct(); // Fetch product data first
    if (carId) {
      updateLocation(); // Only update location if carId exists
    }
  }, [isConfurim, carId]); // Depend on isConfurim and carId

  const gotProduct =()=>{
    setIsConfurim(true)
  }
  const Wish = () =>{
    return(
      <div className="wish">
        <h1>Спасибо за сотрудничество!<br/> Счиcтливово пути!</h1>
      </div>
    )
  }
  

  const View = () => {
    return product.map(item => (
      <div key={item.id}>
        <div className="car__pName">{item.productName}</div>
        <div className="car__desc">{item.desc}</div>
        <div className="car__car">{item.car}</div>
        <button className="car__config" onClick={gotProduct}>Подтверждаю</button>
      </div>
    ));
  };
  const content = isConfurim ? <Wish/> : <View/>
  return (
    <div className="car">
      <div className="car__container">
        {content}
      </div>
    </div>
  );
};

export default Car;
