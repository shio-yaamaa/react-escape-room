import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './redux/rootReducer';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

let store = createStore(rootReducer);

// require assets
const requireAll = (context) => {
	console.log(context.keys());
  context.keys().forEach(context);
}
requireAll(require.context('./assets/images', true, /\.png$/));
requireAll(require.context('./assets/sounds', false, /\.mp3$/));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
