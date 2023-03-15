import React, {FC} from 'react';

import {Form} from "./Form/Form";

const PostRequest: FC<{setRefetch:(a: boolean)=>any}> = ({setRefetch}) => {
  return (
    <section className="section__post">
      <h1 className="section__h1">Working with POST request</h1>
      <Form setRefetch={setRefetch}/>
    </section>
  );
};

export {PostRequest};