import React, {FC} from 'react';

import {MainButtonInterface} from "../../interface/components/MainButton/MainButtonInterface";

const MainButton: FC<MainButtonInterface> = ({text, disabled= false, callback}) => {
  return (
    <button type="submit" onClick={callback} disabled={disabled} className={disabled ? "button__main button__disabled" : 'button__main'  }>{text}</button>
  );
};

export {MainButton};