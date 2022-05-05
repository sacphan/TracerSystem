import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
/* Make the store available to all container 
components in the application without passing it explicitly */
import { Provider } from 'react-redux';
// Store type from Redux
import { Store, AnyAction } from 'redux';
import configureStore, { IAppState } from './store/Store';

interface IProps {
  store: Store<IAppState, AnyAction>;
}
/* 
Create a root component that receives the store via props
and wraps the App component with Provider, giving props to containers
*/
const Root: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <Provider store={props.store}>
      <App />
    </Provider>
  );
};
// Generate the store
const store = configureStore();

// Render the App
ReactDOM.render(<Root store={store} />, document.getElementById(
  'root'
));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
