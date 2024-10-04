import { YMaps, Map, Placemark } from 'react-yandex-maps';
import axios from 'axios';
import { useEffect, useState, useRef} from 'react';
import { useLocation } from 'react-router-dom';
import loc from '../../view/img/location.png';
import './car.scss';

const Car = () => {
  const location = useLocation();
  const[locat, setLocation] = useState({lat: 0, lng: 0})
  const { id, name, productName, img, car, desc } = location.state || {};

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          console.log("Location obtained:", latitude, longitude);
          resolve({ lat: latitude, lng: longitude }); // Resolve with coordinates
        },
        (error) => {
          console.error("Error getting location:", error);
          reject(error); // Reject if there's an error
        }
      );
    });
  };

  const upDate = async (lat, lng) => {
    try {
      await axios.post(`http://localhost:4000/submit/car/${id}`, { lat, lng });
      console.log("Location updated in database:", { lat, lng });
    } catch (err) {
      console.log("Error updating location:", err);
    }
  };

  useEffect(() => {
    const updateLocation = async () => {
      try {
        const { lat, lng } = await getLocation(); // Wait for the location
        await upDate(lat, lng); // Then update the database
      } catch (err) {
        console.error("Failed to update location:", err);
      }
    };
    updateLocation(); // Call the async function
  }, [id]);

  
  if (!id) {
    return <div>No data available</div>;
  }

  return (
    <div className="car">
      <div className="car__container">
        <div className="car__item">
          <img src={`data:image/jpeg;base64,${img}`} alt="" />
        </div>
        <div className="car__FN">
          <div className="car__costName">{name}</div>
          <div className="car__pName">{productName}</div>
          <div className="car__desc">{desc}</div>
          <div className="car__car">{car}</div>
        </div>
        <div className="car__location">
          <button><img src={loc} alt="location" className="car__guanzhou" />Guangzhou</button>
          <button><img src={loc} alt="location" className="car__wurumchi" />Wurumchi</button>
          <button><img src={loc} alt="location" className="car__chine" />China’s border</button>
          <button><img src={loc} alt="location" className="car__Kyrgyzstan" />Kyrgyzstan’s border</button>
        </div>
      </div>
      <div className="car__map">
        {/* <button onClick={getProduct}>click me</button> */}
        <YMaps query={{ apikey: '9323fbcd-9df0-4d4b-a80f-9d93b4eeaced' }}>
          <Map
            defaultState={{ center: [locat.lat, locat.lng], zoom: 10 }}
            width="100%" height="400px"
          >
            <Placemark geometry={[locat.lat, locat.lng]} />
          </Map>
        </YMaps>
      </div>
    </div>
  );
}

export default Car;
// 9323fbcd-9df0-4d4b-a80f-9d93b4eeaced 