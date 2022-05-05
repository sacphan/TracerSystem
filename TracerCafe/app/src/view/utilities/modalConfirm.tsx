import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';

export interface IPropsModalConfirm {
    visible: boolean,
    confirmLoading:boolean,
    modalText:string
    title:string

    handleOk?:Function
    handleCancel?:Function
};

export class ModalConfirm extends React.Component<IPropsModalConfirm>
{
    constructor(props: IPropsModalConfirm) {
        super(props);
        }

 

  render(): JSX.Element{
      return  (
    <>
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        onOk={this.props.handleOk()}
        confirmLoading={this.props.confirmLoading}
        onCancel={this.props.handleCancel()}
      >
        <p>{this.props.modalText}</p>
      </Modal>
    </>
  )};

}
