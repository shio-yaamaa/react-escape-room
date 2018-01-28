import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {showHint, hideHint} from '../redux/modules/gameControl';
import MainScreen from './MainScreen';
import Sidebar from './Sidebar';
import Hint from './Hint';
import stateToHint from '../scenario/stateToHint';
import {itemImages, sounds} from '../utils/AssetsLoader';
import {isMobileDevice} from '../utils/UserAgent';

class Game extends React.Component {
	componentDidMount() {
		// set the event listener for selectedItemImage if UA is not mobile
		if (!isMobileDevice()) {
			this.gameDiv.addEventListener('mouseenter', () => this.setSelectedItemImageVisibility(true));
			this.gameDiv.addEventListener('mouseleave', () => this.setSelectedItemImageVisibility(false));
			this.gameDiv.addEventListener('mousemove', event => this.moveSelectedItemImage(event));

			// set the initial position, visibility, and src of selectedItemImage (when loading the saved data)
      const moveSelectedItemImageOnLoad = event => {
        this.moveSelectedItemImage(event);
        this.gameDiv.removeEventListener('mouseenter', moveSelectedItemImageOnLoad);
      };
      this.gameDiv.addEventListener('mouseenter', moveSelectedItemImageOnLoad);
			this.selectedItemImage.src = this.props.selectedItem === null ? '' : itemImages[this.props.selectedItem].src;
			this.selectedItemImage.style.display = this.props.selectedItem === null ? 'none' : 'block';
		}

		this.saveEffect.addEventListener('animationend', () => {
			this.saveEffect.classList.remove('animation');
		});
	}

	componentWillReceiveProps(nextProps) {
		// set the visibility and src of selectedItemImage if the selected item has been changed
		if (isMobileDevice()) {
			return;
		}
		if (this.props.selectedItem !== nextProps.selectedItem) {
			if (nextProps.selectedItem === null) {
				this.selectedItemImage.style.display = 'none';
			} else {
				this.selectedItemImage.src = itemImages[nextProps.selectedItem].src;
				this.selectedItemImage.style.display = 'block';
			}
		}
	}

	setSelectedItemImageVisibility(isVisible) {
		if (isVisible) {
			if (this.props.selectedItem !== null) {
				this.selectedItemImage.style.display = 'block';
			}
		} else {
			this.selectedItemImage.style.display = 'none';
		}
	}

	moveSelectedItemImage(event) {
		this.selectedItemImage.style.top = event.clientY + 'px';
		this.selectedItemImage.style.left = event.clientX + 'px';
	}

	handleSave() {
		sounds['save'].play();
		this.saveEffect.classList.add('animation');
		localStorage.setItem('savedData', JSON.stringify(this.props.stateToSave))
	}

	render() {
		return (
			<div ref={gameDiv => this.gameDiv = gameDiv} style={{
					position: 'relative',
					width: '100%',
					height: '100%'
				}}
			>
				<div style={{
					display: 'flex',
					position: 'absolute',
					left: 0,
					top: 0,
					width: '100%',
					height: '100%'
				}}>
					<MainScreen onGameEnd={this.props.onGameEnd} />
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
				<img ref={selectedItemImage => this.selectedItemImage = selectedItemImage} style={{
					display: 'none',
					position: 'fixed',
					pointerEvents: 'none'
				}} alt="" />
			</div>
		);
	}
}

Game.propTypes = {
	selectedItem: PropTypes.string, // nullable
	stateToSave: PropTypes.object.isRequired,
	hint: PropTypes.string, // nullable
	onGameEnd: PropTypes.func.isRequired,
	onHintClick: PropTypes.func.isRequired,
	onHintCancel: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
	return {
		selectedItem: state.selectedItem,
		stateToSave: state,
		hint: state.gameControl.isHintVisible ? stateToHint(state.status, state.items) : null,
		onGameEnd: ownProps.onGameEnd
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
