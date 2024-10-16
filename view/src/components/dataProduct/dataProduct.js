import axios from 'axios';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import loc from '../../view/img/location.png';
import './dataProduct.scss';

const DataProduct = () => {
  const [locat, setLocation] = useState({ lat: 41.204380, lng: 74.766098 });
  const location = useLocation();
  const { id, name, productName, img, car, desc } = location.state || {};

  useEffect(() => {
    const getProduct = async () => {
      try {
        const result = await axios.get(`https://tulparkg-backend.vercel.app//getMaps/${id}`);
        setLocation({
          lat: parseFloat(result.data.latitude), // Ensure it's a number
          lng: parseFloat(result.data.longitude), // Ensure it's a number
        });
        console.log(result.data);
      } catch (err) {
        console.log("Error updating location:", err);
      }
    };

    // Call getProduct only once when component mounts
    getProduct();
  }, [id]); // Adding id to dependencies ensures it runs when id changes

  const { lat, lng } = locat;
  
  return (
    <div className="dataProduct">
      <div className="dataProduct__container">
        <div className="dataProduct__data">
            <div className="dataProduct__item">
              <img src={`data:image/jpeg;base64,${img}`} alt="" />
            </div>
            <div className="dataProduct__FN">
              <div className="dataProduct__costName">{name}</div>
              <div className="dataProduct__pName">{productName}</div>
              <div className="dataProduct__desc">{desc}</div>
              <div className="dataProduct__car">{car}</div>
            </div>
            <div className="dataProduct__location">
              <button className="dataProduct__location-guanzhou"><img src={loc} alt="location"  />Guangzhou</button>
              <button className="dataProduct__location-wurumchi"><img src={loc} alt="location"  />Wurumchi</button>
              <button className="dataProduct__location-chine"><img src={loc} alt="location"  />China’s border</button>
              <button className="dataProduct__location-Kyrgyzstan"><img src={loc} alt="location"  />Kyrgyzstan’s border</button>
            </div>
        </div>
        <div className="dataProduct__map">
        <YMaps query={{ apikey: '9323fbcd-9df0-4d4b-a80f-9d93b4eeaced' }}>
          <Map
            defaultState={{ center: [lat, lng], zoom: 10 }}
            width="100%"
            height="300px"
          >
            <Placemark geometry={[lat, lng]} />
          </Map>
        </YMaps>
      </div>
      </div>
      
    </div>
  );
};

export default DataProduct;
