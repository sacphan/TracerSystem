import React from 'react';
import {ISearchCustomerByFilter} from '../../model/Customer/SearchCustomerByFilter'
import {SearchOutlined} from '@ant-design/icons';
import {Button, Input, Row, Col} from 'antd';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../store/Store';
import { AnyAction, bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import {UpdateSearchFilter} from '../../modules/Customer/customer.action'
import { connect } from 'react-redux';
import 'antd/dist/antd.css';

export interface IPropsSearch {
    searchCustomerByFilter:ISearchCustomerByFilter
    onPressSearch?:Function
    UpdateSearchFilter?:Function
};

class Search extends React.Component<IPropsSearch,any>
{

    constructor(props: IPropsSearch) {
        super(props);
        }

    onChange =async  (e: React.ChangeEvent<HTMLInputElement>)=>{
        await this.props.UpdateSearchFilter({...this.props.searchCustomerByFilter,Keyword:e.target.value})
    }
        
    render(): JSX.Element{
        return  (
        <>
        <Row>
            <Col span={8} >
                <Input           
                placeholder={'Search'}
                style={{width: 188, marginBottom: 8, display: 'block'}}
                onPressEnter={this.props.onPressSearch()}
                onChange={(e)=>this.onChange(e)}
                />
            </Col>
            <Col span={2}>
                <Button 
                type="primary"
                icon={<SearchOutlined/>}
                size="small"
                style={{width: 90, marginRight: 8, height:32}}
                onClick={this.props.onPressSearch()}
                >
                Search
                </Button>
            </Col>
        </Row>               
        </>
    )};

}
const mapStateToProps = ({ customerState }: IAppState): {} => {
    return {
       
    };
 };
 
 const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>): {} => {
    return bindActionCreators({   
        UpdateSearchFilter
    }, dispatch)
 }

 export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Search))
