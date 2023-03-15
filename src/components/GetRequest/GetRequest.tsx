import React, {FC} from 'react';

import {Users} from "./Users/Users";

const GetRequest: FC<{ refetch:boolean }> = ({refetch}) => {
  return (
    <section className="section__get">
      <h1 className="section__h1">Working with GET request</h1>
      <Users refetch={refetch}/>
    </section>
  );
};

export {GetRequest};