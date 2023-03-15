import React, {FC} from 'react';

import {MainButton} from "../MainButton/MainButton";
import './Header.scss'

const publicPath = process.env.PUBLIC_URL
const Header: FC = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={`${publicPath}/components/Header/Logo.svg`} alt="Logo"/>
      </div>
      <div className="header__buttons">
        <MainButton text="Users" callback={()=>{ return null}} />
        <MainButton text="Sign up" callback={()=>{return null}}/>
      </div>
    </header>
  );
};

export {Header};