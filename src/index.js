import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './redux/rootReducer';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import './utils/AssetsLoader';

let store = createStore(rootReducer);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();