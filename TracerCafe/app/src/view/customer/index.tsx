import React from "react";
import CustomerTable from './customerTable'
import { ICustomer, ICustomerData } from "../../model/Customer/ManageCustomer";
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../store/Store';
import { AnyAction, bindActionCreators } from 'redux';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { SearchByFilter,CreateCustomer } from '../../modules/Customer/customer.action'
import Search from '../utilities/search'
import { ISearchCustomerByFilter } from '../../model/Customer/SearchCustomerByFilter'
import { Row, Col, Button } from 'antd'
import { IFieldForm, AddItem } from '../utilities/AddItem'
import { PlusCircleOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import { ErrorObject } from "../../constanst";
import { NotificationActionTypes } from "../../modules/Notification/notification.type";

export interface ICustomersProps extends WithTranslation {
    customerData?: ICustomerData;
    SearchByFilter?: Function;
    searchFilter?: ISearchCustomerByFilter
    CreateCustomer?:Function
    dispatchAction?:Function
}

class ManageCustomer extends React.Component<ICustomersProps, any>
{
    constructor(props: ICustomersProps) {
        super(props)
        this.state = {
            ModalAddCustomer:
            {
                isModalVisible: false,
                TitleModal: "Add Customer"
            }
        }
    }
    private refAddItem = React.createRef<FormInstance>();

    handleSearch = () => {
        this.props.SearchByFilter(this.props.searchFilter);
    };

    handleShowAddModal = () => {
        this.setState({ ModalAddCustomer: { ...this.state.ModalAddCustomer, isModalVisible: true } })
    }

    handleCancelAddModal = () => {
        this.setState({ ModalAddCustomer: { ...this.state.ModalAddCustomer, isModalVisible: false } })
    }

    handleOkAddModal =async () => {
        const newCustomer:ICustomer =this.refAddItem.current.getFieldsValue()
        var result = await this.props.CreateCustomer(newCustomer);

        this.props.dispatchAction({
            type:result.code==ErrorObject.SUCCESS ? NotificationActionTypes.SUCCESS:NotificationActionTypes.ERROR,
            message: result.message,
            title: "Create Customer"
          })
          if (result.code==ErrorObject.SUCCESS)
          {
            await this.props.SearchByFilter(this.props.searchFilter);
            const emptyValue:ICustomer = {
                firstName:'',
                address1:'',
                address2:'',
                address3:'',
                address4:'',
                id:'',
                title:'',
                age:0,
                telephone:'',
                postCode:'',
                surname:''
            };
            this.refAddItem.current.setFieldsValue(emptyValue);

          }       
        this.setState({ ModalAddCustomer: { ...this.state.ModalAddCustomer, isModalVisible: !(result.code==ErrorObject.SUCCESS) } })
    }
    render(): JSX.Element {
        const IFieldFormAddCustomer: IFieldForm[] =
            [
                {
                    label: 'Title',
                    name: 'title',
                    rule:
                        [
                            {
                                required: true,
                                message: 'Please input your title!'
                            }
                        ]
                },
                {
                    label: 'First Name',
                    name: 'firstName',
                    rule:
                        [
                            {
                                required: true,
                                message: 'Please input your first name!'
                            }
                        ]
                },
                {
                    label: 'Surname',
                    name: 'surname',
                    rule:
                        [
                            {
                                required: true,
                                message: 'Please input your surname!'
                            }
                        ]
                },
                {
                    label: 'Address1',
                    name: 'address1',
                    rule:
                        [
                            {
                                required: true,
                                message: 'Please input your address1!'
                            }
                        ]
                },
                {
                    label: 'Address2',
                    name: 'address2',
                    rule:
                        [
                            {
                                required: false,
                                message: 'Please input your address2!'
                            }
                        ]
                },
                {
                    label: 'Address3',
                    name: 'address3',
                    rule:
                        [
                            {
                                required: false,
                                message: 'Please input your address3!'
                            }
                        ]
                },
                {
                    label: 'Address4',
                    name: 'address4',
                    rule:
                        [
                            {
                                required: false,
                                message: 'Please input your address4!'
                            }
                        ]
                },
                {
                    label: 'PostCode',
                    name: 'postCode',
                    rule:
                        [
                            {
                                required: true,
                                message: 'Please input your postcode!'
                            }
                        ]
                },
                {
                    label: 'Telephone',
                    name: 'telephone',
                    rule:
                        [
                            {
                                required: true,
                                message: 'Please input your telephone!'
                            }
                        ]
                },
                {
                    label: 'Age',
                    name: 'age',
                    rule:
                        [
                            {
                                required: true,
                                message: 'Please input your age!'
                            }
                        ],
                    type:'number'
                }
            ]
        return (
            <>
                <Row>
                    <Col span={12}>
                        <Search onPressSearch={() => this.handleSearch} searchCustomerByFilter={this.props.searchFilter}></Search>
                    </Col>
                    <Col span={12}>
                        <Button
                            type="primary"
                            icon={<PlusCircleOutlined />}
                            size="small"
                            style={{ width: 90, marginRight: 8, height: 32 }}
                            onClick={() => this.handleShowAddModal()}
                        >
                            Add
                        </Button>
                        <AddItem
                            FieldForm={IFieldFormAddCustomer}
                            TitleModal={this.state.ModalAddCustomer.TitleModal}
                            isModalVisible={this.state.ModalAddCustomer.isModalVisible}
                            handleCancel={this.handleCancelAddModal}
                            handleOk={this.handleOkAddModal}
                            refAddItem={this.refAddItem} ></AddItem>
                    </Col>
                </Row>

                <CustomerTable customerData={this.props.customerData} searchFilter={this.props.searchFilter}></CustomerTable>
            </>
        );
    }
}
const mapStateToProps = ({ customerState }: IAppState): {} => {
    return {
        searchFilter: { ...customerState.searchFilter },
        customerData: { ...customerState.customerData }
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>): {} => {
    return bindActionCreators({
        SearchByFilter,
        CreateCustomer,
        dispatchAction: (data: any) => ({ ...data })
    }, dispatch)
}
export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(ManageCustomer))
