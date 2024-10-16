import SING from "../../view/img/SING.png"
import menu from "../../view/img/menu.png"
import { useState } from "react"
import { NavLink  } from "react-router-dom"

import "./menu.scss"

// import "../buttons.scss"


const Menu = () => {
    const[isActive, setisActive] = useState(false)

    const activeBanana = () =>{
        setisActive(!isActive)
    }

    const Mobile = () => {
        return(
            <div className="menu__mobile">
                <ul className="menu__mobile-item">
                    <button className="menu__mobile-close" onClick={activeBanana}>x</button>
                    <li className="menu__mobile-items">
                        <NavLink  className={({isActive}) => isActive ? "menu__mobile-link active" : "menu__mobile-link"} to='/car'>МАШИНА</NavLink>
                    </li>
                    <li className="menu__mobile-items">
                        <NavLink  className={({isActive}) => isActive ? "menu__mobile-link active" : "menu__mobile-link"} to='/'>КЛИЕНТ</NavLink>
                    </li>
                </ul>
            </div>
        )
    }

    const content = isActive ? <Mobile/> : null

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
                <img    
                    src={menu} 
                    alt="menu" 
                    className={isActive ? "menu__banana menu__banana-hidden" : "menu__banana"}
                    onClick={activeBanana}
                    />
                <a href="#" className="menu__sing">
                    <img src={SING} alt="sing"/>
                </a>
                
            </div>
            {content}
        </div>
    )
}
export default Menu