import React from 'react';
import ScreenSwitch from './ScreenSwitch';
import {wholeScreenWidth, screenHorizontalMargin} from '../constants/constants';
import {backgroundBlack} from '../constants/colors';

const App = () => (
	<div style={{
		width: '100%'
	}}>
	  <h1>脱出ゲーム テスト</h1>
	  <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      minWidth: `${wholeScreenWidth + screenHorizontalMargin * 2}px`,
	    backgroundColor: backgroundBlack
	  }}>
	    <ScreenSwitch />
	  </div>
	  <p>@yaa_maa_520</p>
	</div>
);

export default App;
