import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Form, Input, InputNumber } from 'antd';
import { FormInstance } from 'antd/lib/form';

export interface IFieldForm
{
    label:string
    name:string
    rule:any
    hidden?:boolean 
    readonly?:boolean
    type?:string
}

export interface IPropsAddItem {
    TitleModal: string,
    isModalVisible:boolean,
    handleOk?:Function
    handleCancel?:Function
    Modal?:any
    FieldForm:IFieldForm[]
    refAddItem:React.RefObject<FormInstance>
};

export class AddItem extends React.Component<IPropsAddItem>
{
    constructor(props: IPropsAddItem) {
        super(props);
        }



  render(): JSX.Element{

    let formItem =[];
    this.props.FieldForm.map((item)=>{
        formItem.push(<Form.Item
            label={item.label}
            name={item.name}
            rules={item.rule}
            hidden={item.hidden==true}                                      
          >
            {/* {item.type=='number'? <InputNumber></InputNumber>} */}
            <Input type={item.type}  readOnly={item.readonly==true}/>
          </Form.Item>)
    });
      return  (
    <>

      <Modal title={this.props.TitleModal} visible={this.props.isModalVisible} 
        okButtonProps={{form:'add-item', htmlType: 'submit'}}
        onCancel={()=>this.props.handleCancel()}>
          <Form
            ref={this.props.refAddItem}
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 15,
            }}
            name="additem"
            autoComplete="off"
            onFinish={()=>this.props.handleOk()}
            id='add-item'

          >
             {                 
                 formItem
             }           
          </Form>
        </Modal>
    </>
  )};

}
