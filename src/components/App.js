import React from 'react';
import ScreenSwitch from './ScreenSwitch';

const App = () => (
	<div style={{
		width: '100%'
	}}>
	  <h1>脱出ゲーム テスト</h1>
	  <div style={{
	  	paddingTop: 50,
	  	paddingBottom: 50,
	    backgroundColor: '#111111'
	  }}>
	    <ScreenSwitch />
	  </div>
	  <p>@yaa_maa_520</p>
	</div>
);

export default App;