import { useLocation } from 'react-router-dom'
import './user.scss'
import loc from '../../view/img/location.png';


const User = () => {
    const location = useLocation();
    const {name, productName, img, desc, car} = location.state || {}
    
    return(
        <div className="user">
            <div className="user__container">
                <div className="user__item">
                    <img src={`data:image/jpeg;base64,${img}`} alt="" />
                </div>
                <div className="user__FN">
                    <div className="user__costName">{name}</div>
                    <div className="user__pName">{productName}</div>
                    <div className="user__desc">{desc}</div>
                    <div className="user__car">{car}</div>
                </div>
                <div className="user__location">
                    <button><img src={loc} alt="location" className="user__guanzhou" />Guangzhou</button>
                    <button><img src={loc} alt="location" className="user__wurumchi" />Wurumchi</button>
                    <button><img src={loc} alt="location" className="user__chine" />China’s border</button>
                    <button><img src={loc} alt="location" className="user__Kyrgyzstan" />Kyrgyzstan’s border</button>
                </div>
            </div>
        </div>
    )
}

export default User;