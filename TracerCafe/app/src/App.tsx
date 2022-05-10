import React from "react";
import { IAppState } from './store/Store';
import './App.css';
import ManageCustomer from './view/customer';
import { Layout, Menu, Breadcrumb,notification } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { AnyAction, bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {  withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import {INotificationState} from './modules/Notification/notification.reducer'
import {NOTIFICATION_TIMEOUT} from './constanst'
import { NotificationActionTypes } from './modules/Notification/notification.type';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;



interface IProps  {
  notificationState?: INotificationState;
}

export class App extends React.Component<IProps, any>  {

  UNSAFE_componentWillReceiveProps(nextProps: IProps): void {
    const type = nextProps.notificationState.type;
    const config = {
      message: nextProps.notificationState.title,
      description:
        nextProps.notificationState.description,
      duration: NOTIFICATION_TIMEOUT
    }
    debugger
    switch (type) {
      case NotificationActionTypes.ERROR:
        //config.message = NotificationActionTypes.ERROR;
        notification.error(config)
        break;
      case NotificationActionTypes.SUCCESS:
        //config.message = NotificationActionTypes.SUCCESS;
        notification.success(config)
        break;
      case NotificationActionTypes.WARNING:
        //config.message = NotificationActionTypes.WARNING;
        notification.warning(config)
        break;
      default:
        break;
    }


  }

  render():JSX.Element{
  return (
    <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
            <Menu.Item key="1">option1</Menu.Item>
            <Menu.Item key="2">option2</Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
             <ManageCustomer ></ManageCustomer>
        </Content>
      </Layout>
    </Layout>
  </Layout>
   

  );
}
}


const mapStateToProps = (store: IAppState): {} => {
  return {
    notificationState: store.notificationState
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>): {} => {
  return bindActionCreators({
  }, dispatch)
};

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(App));