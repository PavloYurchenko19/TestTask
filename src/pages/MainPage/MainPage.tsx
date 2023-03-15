import React, {FC, useState} from 'react';

import {GetRequest, Header, PostRequest, WelcomeScreen} from '../../components';

import './MainPage.scss'

const MainPage: FC = () => {
  const [refetch, setRefetch] = useState<boolean>(false)
  return (
    <div className='main__page section'>
      <Header/>
      <WelcomeScreen/>
      <GetRequest refetch={refetch}/>
      <PostRequest setRefetch={setRefetch}/>
    </div>
  );
};

export {MainPage};