import React from "react";
import { ICustomerData,ICustomer } from '../../model/Customer/ManageCustomer'
import { Table, Button, Modal, Form, Input, InputNumber  } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { FormInstance } from 'antd/lib/form';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../store/Store';
import { AnyAction, bindActionCreators } from 'redux';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import {Update,Delete,SearchByFilter,UpdateSearchFilter} from '../../modules/Customer/customer.action'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {ModalConfirm,IPropsModalConfirm} from '../utilities/modalConfirm'
import {ISearchCustomerByFilter} from '../../model/Customer/SearchCustomerByFilter'

interface PropsTable {
  customerData: ICustomerData
  Update?:Function
  Delete?:Function
  SearchByFilter?:Function
  UpdateSearchFilter?:Function
  searchFilter: ISearchCustomerByFilter;

}

interface IState {
  isModalVisible: boolean,
  Modal:ICustomer,
  TitleModal:string
  isModalConfirmVisible:boolean
  idDelete:string
  ModalConfirmDelete:IPropsModalConfirm

};


class CustomerTable extends React.Component<PropsTable, IState>
{
  constructor(props: PropsTable) {
    super(props);
    this.state = {
      isModalVisible: false,
      isModalConfirmVisible: false,
      idDelete:"",
      Modal:{
        address1:"",
        address2:"",
        address3:"",
        address4:"",
        age:null,
        firstName:"",
        id:null,
        postCode:"",
        surname:"",
        telephone:"",
        title:""
      },
      ModalConfirmDelete:
      {
          confirmLoading:false,
          modalText:"Are you sure for deleting this customer?",
          visible:false,
          title:"Delete customer"
      },
      TitleModal:"Edit Customer"
    };
  }
  private formRef = React.createRef<FormInstance>() ;

  showModalEdit= (record:ICustomer)=>{
    this.setState({ isModalVisible: true,TitleModal:"Edit Customer",Modal:record });
    setTimeout(() => this.formRef.current?.setFieldsValue({...record}), 0);
    
    //this.formRef.current?.setFieldsValue({...this.state.Modal});
  };

  handleOk = (record:any) => {
    const value = record;
    this.props.Update(value);
    this.setState({ isModalVisible: false });
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };

  showModal = () => {
    this.setState({ModalConfirmDelete:{...this.state.ModalConfirmDelete,visible:true}});
  };

  componentDidMount(): void {
    debugger
    this.props.SearchByFilter(this.props.searchFilter);   
  }
  
onPageChanged = async (page:number)=>{
    await this.props.UpdateSearchFilter({...this.props.searchFilter,Page:page})
    this.props.SearchByFilter(this.props.searchFilter);
}

  handleDelete =async  () => {
        await this.props.Delete(this.state.idDelete)
        await this.props.SearchByFilter(this.props.searchFilter);
        if (this.props.customerData.customers.length<=0 && this.props.searchFilter.Page>1)
        {
          await this.props.UpdateSearchFilter({...this.props.searchFilter,Page:this.props.searchFilter.Page-1})
          this.props.SearchByFilter(this.props.searchFilter);   
        }
        this.setState({ModalConfirmDelete:{...this.state.ModalConfirmDelete,visible:false}});
  };

  handleCancelModalDelete = () => {
    this.setState({ModalConfirmDelete:{...this.state.ModalConfirmDelete,visible:false}});
  };
  render(): JSX.Element {
    const columns = [
      {
        title: 'No',
        dataIndex: 'No',
        key: 'no',
        render: (value: any, record: any, index: number): JSX.Element => {
          return (<>{(index + 1 + (this.props.customerData.page - 1) * 5)}</>)
        }
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
      },
      {
        title: 'Surname',
        dataIndex: 'surname',
        key: 'surname',
      },
      {
        title: 'Address1',
        dataIndex: 'address1',
        key: 'address1',
      },
      {
        title: 'Address2',
        dataIndex: 'address2',
        key: 'address2',
      },
      {
        title: 'Address3',
        dataIndex: 'address3',
        key: 'address3',
      },
      {
        title: 'Address4',
        dataIndex: 'address4',
        key: 'address4',
      },
      {
        title: 'PostCode',
        dataIndex: 'postCode',
        key: 'postCode',
      },
      {
        title: 'Telephone',
        dataIndex: 'telephone',
        key: 'telephone',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Action',
        key: 'Action',
        render: (record: any) => {        
          return (
          <>
            <Button icon={<EditOutlined onClick={()=>this.showModalEdit(record)} />} size='middle' />
            <Button danger icon={<DeleteOutlined onClick={() =>{
              this.showModal();
              this.setState({idDelete : record.id}) 
            }} />} size='middle' />
          </>
        )}
      }
    ];
    const paging = {
      current: this.props.customerData.page,
      pageSize: 5,
      total: this.props.customerData.totalCustomer,
      onChange: this.onPageChanged
    };
    return (
      <>
        <Table dataSource={this.props.customerData.customers} columns={columns} pagination={paging}  />
        <Modal title={this.state.TitleModal} visible={this.state.isModalVisible} 
        okButtonProps={{form:'edit-customer-form', htmlType: 'submit'}}
        onCancel={this.handleCancel}>
          <Form
            ref={this.formRef}
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 15,
            }}
            name="editCustomerForm"
            autoComplete="off"
            onFinish={this.handleOk}
            id='edit-customer-form'
          >
            <Form.Item
              label="Title"
              name="id"
              rules={[
                {
                  required: true,
                  message: 'Please input your id!',
                },
              ]}
              hidden
              
              
            >
              <Input value={this.state.Modal.id} readOnly/>
            </Form.Item>

            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Please input your title!',
                },
              ]}
            >
              <Input value={this.state.Modal.title}/>
            </Form.Item>

            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: 'Please input your firstname!',
                },
              ]}
            >
              <Input value={this.state.Modal.firstName}/>
            </Form.Item>
            <Form.Item
              label="Surname"
              name="surname"
              rules={[
                {
                  required: true,
                  message: 'Please input your surname!',
                },
              ]}
            >
              <Input value={this.state.Modal.surname}/>
            </Form.Item>
            <Form.Item
              label="Address1"
              name="address1"
              rules={[
                {
                  required: true,
                  message: 'Please input your address1!',
                },
              ]}
              
            >
              <Input value={this.state.Modal.address1}
                     />
            </Form.Item>
            <Form.Item
              label="Address2"
              name="address2"
              rules={[
                {
                  required: false,
                  message: 'Please input your address2!',
                },
              ]}
            >
              <Input value={this.state.Modal.address2}/>
            </Form.Item>
            <Form.Item
              label="Address3"
              name="address3"
              rules={[
                {
                  required: false,
                  message: 'Please input your address3!',
                },
              ]}
            >
              <Input value={this.state.Modal.address3}/>
            </Form.Item>
            <Form.Item
              label="Address4"
              name="address4"
              rules={[
                {
                  required: false,
                  message: 'Please input your address4!',
                },
              ]}
            >
              <Input value={this.state.Modal.address4} />
            </Form.Item>
            <Form.Item
              label="PostCode"
              name="postCode"
              rules={[
                {
                  required: true,
                  message: 'Please input your postcode!',
                },
              ]}
            >
              <Input value="{this.state.Modal.postCode}" />
            </Form.Item>
            <Form.Item
              label="Telephone"
              name="telephone"
              rules={[
                {
                  required: true,
                  message: 'Please input your telephone!',
                },
              ]}
            >
              <Input value={this.state.Modal.telephone}/>
            </Form.Item>
            <Form.Item
              label="Age"
              name="age"
              rules={[
                {
                  required: true,
                  message: 'Please input your age!',
                },
              ]}
           
            >
              <InputNumber  value={this.state.Modal.age}/>
            </Form.Item>
            {/* <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item> */}
          </Form>
        </Modal>
        <ModalConfirm 
        title={this.state.ModalConfirmDelete.title}
        visible={this.state.ModalConfirmDelete.visible} 
        handleOk={()=>this.handleDelete} 
        handleCancel={()=>this.handleCancelModalDelete}
        confirmLoading={this.state.ModalConfirmDelete.confirmLoading}
        modalText = {this.state.ModalConfirmDelete.modalText}
        ></ModalConfirm>
      </>
   
    )
  }
}

const mapStateToProps = ({ customerState }: IAppState): {} => {
  return {
      customerData: customerState.customerData||[]
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>): {} => {
  return bindActionCreators({   
      Update,
      Delete,
      SearchByFilter,
      UpdateSearchFilter
  }, dispatch)
}

export default withTranslation()(connect(mapStateToProps,mapDispatchToProps)(CustomerTable))

