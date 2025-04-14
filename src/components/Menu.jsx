import React from 'react'
import '../App.css';

const Menu = () => {
  return (
    <div className='Menu'>
        <ul>
            <li className="Menu-item">
                <a className="menu-link" href="/">
                    <i className="menu-icon tf-icons bx bx-home-circle"></i>
                    <div>
                        <h2>🏠  Home</h2>
                    </div>
                </a>
            </li>
        </ul>
    </div>
  );
}

export default Menu;