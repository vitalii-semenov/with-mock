import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table'

import mock from "./mock"
import FontIcon from 'material-ui/FontIcon'

const styles = {
    table: {
        backgroundColor: '#6B4C4C',
        color: 'black',
        borderCollapse: 'separate'
    },
    header: {
        textAlign: 'center',
        fontSize: '16px',
    },
    column: {
        cursor: 'pointer'
    },
    tableBodyWrapper: {
        height: 'auto',
        overflowY: 'hidden'
    },
    store: {
        position: 'relative'
    },
    city: {
        position: 'absolute',
        fontSize: '10px',
        right: '5px',
        top: '3px'
    }
}

class AssetsTable extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            assets: [],
            height: window.innerHeight + 'px'
        }

        this.onHeaderClickHandler = this.onHeaderClickHandler.bind(this)
    }


    componentDidMount() {
        mock
        .subscribe(val => {
                let newState = []
                if(!this.state.assets.length) {
                    newState.push(val)
                } else {
                    let ids = []
                    newState = this.state.assets.map((asset) => {
                        if (asset.id === val.id) {
                            ids.push(val.id)
                            return Object.assign({}, asset, val)
                        } else {
                            ids.push(asset.id)
                            return asset
                        }
                    })

                    if(!ids.includes(val.id)) newState.push(val)

                }

                this.setState({assets: newState})
            })
    }

    componentWillUnmount() {
        mock.unsubscribe()
    }

    onHeaderClickHandler(rowNumber, columnId) {
        alert("Test")
    }

    render() {
        const {assets} = this.state

        let assetKeys
        if(assets && assets.length) {
            assetKeys = assets.length ? Object.keys(assets[0]) : []
        }

        return (
            <div style={{fontFamily: 'Roboto'}}>
                {(!assets || !assets.length) ? "There is not assets yet" :
                    <Table
                        height={this.state.height}
                        style={styles.table}
                        bodyStyle={styles.tableBodyWrapper}
                    >
                        <TableHeader>
                            <TableRow key="mainHeader">
                                <TableHeaderColumn key="mainHeaderColumn"
                                                   colSpan="3"
                                                   style={styles.header}
                                >
                                    Assets Table
                                </TableHeaderColumn>
                            </TableRow>
                            <TableRow key="mainColumns">
                                {assetKeys.map((key, index) =>
                                    <TableHeaderColumn key={`${index}-tableColumns`}
                                                       onClick={this.onHeaderClickHandler}
                                    >
                                        {key}
                                    </TableHeaderColumn>
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            showRowHover={false}
                            stripedRows={true}
                        >
                            {assets.map((asset, indexRow) => (
                            <TableRow
                                key={`${indexRow}-contentRow`}
                            >
                                {Object.keys(asset).map((key, index) => {
                                    return <TableRowColumn
                                        key={`${indexRow}-${index}-content`}
                                        style={styles.column}
                                    >
                                        <p style={styles.store}>{asset[key].toString()}</p>
                                    </TableRowColumn>
                                }
                                )}
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                }
            </div>
        )
    }
}

//const mapDispatchToProps = (dispatch) => {
//    return {
//        setSelectedAssets: (assets) => {
//            dispatch(assetsActions.setSelectedAssets(assets))
//        }
//    }
//}
//
//const mapStateToProps = (state) => {
//    const {assets, selectedAssets}  = state
//
//    return {assets, selectedAssets}
//}

AssetsTable.propTypes = {
    selectedAssets: PropTypes.array,
    setSelectedAssets: PropTypes.func
}

AssetsTable.defaultProps = {}

export default AssetsTable
