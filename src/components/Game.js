import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {showHint, hideHint} from '../redux/modules/gameControl';
import MainScreen from './MainScreen';
import Sidebar from './Sidebar';
import Hint from './Hint';
import stateToHint from '../scenario/stateToHint';
import {sounds} from '../utils/AssetsLoader';

class Game extends React.Component {
	componentDidMount() {
		this.saveEffect.addEventListener('animationend', () => {
			this.saveEffect.classList.remove('animation');
		});
	}

	handleSave() {
		sounds['save'].play();
		this.saveEffect.classList.add('animation');
		localStorage.setItem('savedData', JSON.stringify(this.props.stateToSave))
	}

	render() {
		return (
			<div style={{
				position: 'relative',
				width: '100%',
				height: '100%'/*,
				cursor: `url(${stick}) 40 40, auto`*/
			}}>
				<div style={{
					display: 'flex',
					position: 'absolute',
					left: 0,
					top: 0,
					width: '100%',
					height: '100%'
				}}>
					<MainScreen />
					<Sidebar
						onSaveClick={this.handleSave.bind(this)}
						onHintClick={this.props.onHintClick}
					/>
				</div>
				{this.props.hint !== null && <Hint hint={this.props.hint} onHintCancel={this.props.onHintCancel} />}
				<div
					id="save-effect"
					style={{
						position: 'absolute',
						left: 0,
						top: 0,
						width: '100%',
						height: '100%',
						backgroundColor: 'transparent',
						pointerEvents: 'none'
					}}
					ref={saveEffect => this.saveEffect = saveEffect}
				></div>
			</div>
		);
	}
}

Game.propTypes = {
	selectedItem: PropTypes.string, // nullable
	stateToSave: PropTypes.object.isRequired,
	hint: PropTypes.string, // nullable
	onHintClick: PropTypes.func.isRequired,
	onHintCancel: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		selectedItem: state.selectedItem,
		stateToSave: state,
		hint: state.gameControl.isHintVisible ? stateToHint(state.status, state.items) : null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onHintClick: () => {
			sounds['button'].play();
			dispatch(showHint());
		},
		onHintCancel: () => {
			dispatch(hideHint());
		}
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Game);