import React from 'react';
import {render} from 'react-dom';
import './SuccessPopup.css';
import {Button} from 'primereact/button';

const SuccessPopup = ({obj, cancel}) => {
  return (
      <div className={'container'}>
        <div className={'inputGroup'}>
          <h3>{`You successfully ${obj.action} ${obj.type}`}</h3>
          {obj.type === 'buy' ? <div>
            Count: {obj.count}
            TotalPrice: {obj.price}
          </div> : <div>
            <div>Currency: {obj.currency}</div>
            <div>Price: {obj.price}</div>
          </div>}
          <div className={'buttonContainer'}>
            <Button label={'OK'} onClick={cancel}/>

          </div>
        </div>
      </div>
  );
};

export const renderSuccessPopup = (obj) => {
  const cancel = () => render(null, document.getElementById('popup'));
  render(<SuccessPopup
      obj={obj}
      cancel={cancel}
  />, document.getElementById('popup'));
};
