import React, {FC} from 'react';

import {MainButton} from "../MainButton/MainButton";

const publicPath = process.env.PUBLIC_URL
const WelcomeScreen: FC = () => {
  return (
    <section className='section__welcome'>
      <img className='section__welcome-bg' src={`${publicPath}/components/WelcomeScreen/welcomeBg.png`} alt="welcomeBg"/>
      <div className="section__welcome_desc">
        <h1>Test assignment for front-end developer</h1>
        <p>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they{"'"}ll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
        <MainButton text="Sign up" callback={()=>{return null}} />
      </div>
    </section>
  );
};

export {WelcomeScreen};