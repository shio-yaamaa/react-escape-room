import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {showHint, hideHint} from '../redux/modules/gameControl';
import MainScreen from './MainScreen';
import Sidebar from './Sidebar';
import Hint from './Hint';
import stateToHint from '../scenario/stateToHint';
import stateToItemImageIndex from '../scenario/stateToItemImageIndex';
import {itemImages, sounds} from '../utils/AssetsLoader';
import {isMobileDevice} from '../utils/UserAgent';
import {itemInHandImageSize} from '../constants/constants';

class Game extends React.Component {
	componentDidMount() {
		// set the event listener for selectedItemImage if UA is not mobile
		if (!isMobileDevice()) {
			this.gameDiv.addEventListener('mouseenter', () => this.setItemInHandImageVisibility(true));
			this.gameDiv.addEventListener('mouseleave', () => this.setItemInHandImageVisibility(false));
			this.gameDiv.addEventListener('mousemove', event => this.moveItemInHandImage(event));

			// set the initial position, visibility, and src of selectedItemImage (when loading the saved data)
      const moveItemInHandImageOnLoad = event => {
        this.moveItemInHandImage(event);
        this.gameDiv.removeEventListener('mouseenter', moveItemInHandImageOnLoad);
      };
      this.gameDiv.addEventListener('mouseenter', moveItemInHandImageOnLoad);
			this.itemInHandImageElement.src = this.props.itemInHandImage === null
        ? ''
        : itemImages[this.props.itemInHandImage].src;
			this.itemInHandImageElement.style.display = this.props.itemInHand === null ? 'none' : 'block';
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
		if (this.props.itemInHandImage !== nextProps.itemInHandImage) {
			if (nextProps.itemInHandImage === null) {
				this.itemInHandImageElement.style.display = 'none';
			} else {
				this.itemInHandImageElement.src = itemImages[nextProps.itemInHandImage].src;
				this.itemInHandImageElement.style.display = 'block';
			}
		}
	}

	setItemInHandImageVisibility(isVisible) {
		if (isVisible) {
			if (this.props.itemInHandImage !== null) {
				this.itemInHandImageElement.style.display = 'block';
			}
		} else {
			this.itemInHandImageElement.style.display = 'none';
		}
	}

	moveItemInHandImage(event) {
		this.itemInHandImageElement.style.top = event.clientY + 'px';
		this.itemInHandImageElement.style.left = event.clientX + 'px';
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
						onSaveClick={() => {
              if (!this.props.isInMotion) {
                this.handleSave.call(this);
              }
            }}
						onHintClick={() => {
              if (!this.props.isInMotion) {
                this.props.onHintClick()
              }
            }}
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
				<img
          ref={itemInHandImageElement => this.itemInHandImageElement = itemInHandImageElement}
          width={itemInHandImageSize}
          style={{
					  display: 'none',
					  position: 'fixed',
					  pointerEvents: 'none'
				  }}
          alt=""
        />
			</div>
		);
	}
}

Game.propTypes = {
	itemInHandImage: PropTypes.string, // nullable
	stateToSave: PropTypes.object.isRequired,
  isInMotion: PropTypes.bool.isRequired,
	hint: PropTypes.string, // nullable
	onGameEnd: PropTypes.func.isRequired,
	onHintClick: PropTypes.func.isRequired,
	onHintCancel: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
	return {
		itemInHandImage: state.selectedItem.itemInHand === null ? null : [
      state.selectedItem.itemInHand,
      stateToItemImageIndex(state.selectedItem.itemInHand, state.itemStatus)
    ].join('_'),
		stateToSave: state,
    isInMotion: state.gameControl.motion !== null,
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
