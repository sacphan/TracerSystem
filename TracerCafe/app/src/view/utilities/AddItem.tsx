import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Form, Input } from 'antd';

export interface IFieldForm
{
    label:string
    name:string
    rule:any
    hidden?:boolean 
    readonly?:boolean
}

export interface IPropsAddItem {
    TitleModal: string,
    isModalVisible:boolean,
    handleOk?:Function
    handleCancel?:Function
    Modal?:any
    FieldForm:IFieldForm[]
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
            <Input  readOnly={item.readonly==true}/>
          </Form.Item>)
    });
      return  (
    <>

      <Modal title={this.props.TitleModal} visible={this.props.isModalVisible} 
        okButtonProps={{form:'add-item', htmlType: 'submit'}}
        onCancel={()=>this.props.handleCancel()}>
          <Form
            //ref={this.formRef}
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
