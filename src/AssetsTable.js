import React, {PureComponent} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

import mock from './mock';
import {ExchangePopup} from './components/ExchangePopup/ExchangePopup';
import {connect} from 'react-redux';
import {setAssets, setPopupVisibility} from './redux/assets/actions';

class AssetsTable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      assets: [],
      currencies: [],
      selectedAsset: {},
      height: window.innerHeight + 'px',
    };
  }

  componentDidMount() {
    mock.subscribe(val => {
      let newState = [];
      if (!this.state.assets.length) {
        newState.push(val);
      } else {
        let ids = [];
        newState = this.state.assets.map((asset) => {
          if (asset.id === val.id) {
            ids.push(val.id);
            return Object.assign({}, asset, val);
          } else {
            ids.push(asset.id);
            return asset;
          }
        });

        if (!ids.includes(val.id)) newState.push(val);

      }
      const currencies = [...new Set(newState.filter(asset => asset.type === 'Currency').map(asset => asset.assetName))];
      this.setState({assets: newState, currencies: currencies});
      this.props.setAssets(newState);
    });
  }

  componentWillUnmount() {
    mock.unsubscribe();
  }

  render() {
    const {assets, selectedAsset, currencies} = this.state;
    const {setPopupVisibility, popupVisibility} = this.props;

    let assetKeys;
    if (assets && assets.length) {
      assetKeys = assets.length ? Object.keys(assets[0]) : [];
    }

    return (
        <div style={{fontFamily: 'Roboto'}}>
          {popupVisibility && <ExchangePopup
              asset={selectedAsset}
              currencies={currencies}
          />}
          {(!assets || !assets.length) ? 'There is not assets yet' :
              <DataTable
                  value={assets}
                  rowHover={true}
                  onRowClick={(e) => this.setState({selectedAsset: e.data}, () => setPopupVisibility(true))}>
                {assetKeys.map((key, index) =>
                    <Column key={index} header={key} field={key} sortable/>,
                )}
              </DataTable>
          }
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAssets: (assets) => dispatch(setAssets(assets)),
    setPopupVisibility: (isVisible) => dispatch(setPopupVisibility(isVisible)),
  };
};

const mapStateToProps = (state) => ({
  assets: state.selectedAssets.assets,
  popupVisibility: state.selectedAssets.popupVisibility,
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetsTable);
