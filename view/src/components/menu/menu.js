import SING from "../../view/img/SING.png"
import { NavLink  } from "react-router-dom"

import "./menu.scss"
// import "../buttons.scss"


const Menu = () => {
    return(
        <div className="menu">
            <div className="menu__container">
                <a href="#" className="menu__logo">TulparKG</a>
                <ul className="menu__item">
                    <li className="menu__items">
                        <NavLink  className={({isActive}) => isActive ? "menu__link active" : "menu__link"} to='/car'>МАШИНА</NavLink>
                    </li>
                    <li className="menu__items">
                        <NavLink  className={({isActive}) => isActive ? "menu__link active" : "menu__link"} to='/'>КЛИЕНТ</NavLink>
                    </li>
                </ul>
                <a href="#" className="menu__sing">
                    <img src={SING} alt="sing"/>
                </a>
            </div>
        </div>
    )
}
export default Menu