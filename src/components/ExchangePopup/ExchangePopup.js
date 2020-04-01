import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './ExchangePopup.module.css';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {setPopupVisibility} from '../../redux/assets/actions';
import {renderSuccessPopup} from '../SuccessPopup/SuccessPopup';

export const ExchangePopup = ({asset, currencies}) => {
  const [count, setCount] = useState();
  const [currency, setCurrency] = useState('');
  const [estimateVal, setEstimateVal] = useState('');

  const allAssets = useSelector(state => state.selectedAssets.assets);

  const dispatch = useDispatch();

  const action = (action) => {
    dispatch(setPopupVisibility(false));
    renderSuccessPopup({
      action: action,
      type: asset.type,
      count: count,
      currency: currency,
      price: action === 'buy' ? (asset.price * count).toFixed(2) : estimateVal,

    })
  }

  const estimatePrice = () => {
    return count ? (asset.price * count).toFixed(2) : '';
  };

  const convertedValue = (val) => {
    const value = allAssets.find(el => el.assetName === val).price;
    const res = (asset.price / value).toFixed(2)
    setEstimateVal(res)
  };

  const currenciesList = currencies && currencies.filter(el => el !== asset.assetName).map(el => ({
    label: el,
    value: el,
  }));

  console.log(currenciesList);

  return (
      <div className="container">
        {asset.type === 'Stock' ?
            <div className={'inputGroup'}>
              <div className={'inputItem'}>
            <span className="p-float-label">
                <InputText id="name" value={asset.assetName} disabled/>
                <label htmlFor="name">Asset Name</label>
            </span>
              </div>
              <div className={'inputItem'}>
            <span className="p-float-label">
                <InputText id="count" value={count} onChange={(e) => setCount(e.target.value)}/>
                <label htmlFor="count">Count</label>
            </span>
              </div>
              <div>
                <h3>Estimate price:</h3>
                <span>{estimatePrice()}$</span>
              </div>
              <div className={'buttonContainer'}>
                <Button label={'Buy'} onClick={() => action('buy')}/>
              </div>
            </div> :
            <div className={'inputGroup'}>
              <div className={'inputItem'}>
                <span className="p-float-label">
                    <InputText id="name" value={asset.assetName} disabled/>
                    <label htmlFor="name">Asset Name</label>
                </span>
              </div>
              <div className={'inputItem'}>
                <Dropdown optionLabel="label" value={currency}
                          options={currenciesList}
                          onChange={(e) => {
                            setCurrency(e.value)
                            convertedValue(e.value)
                          }}
                          placeholder="Select a Currency"/>
              </div>

              <div>
                <h3>Converting price:</h3>
                <span>{estimateVal}$</span>
              </div>
              <div className={'buttonContainer'}>
                <Button label={'Convert'} onClick={() => action('convert')}/>
              </div>
            </div>}
      </div>
  );
};

