import {connect} from 'react-redux';
import {save, showHint, hideHint} from '../redux/modules/gameControl';
import Game from '../components/Game';
import stateToHint from '../scenario/stateToHint';

const mapStateToProps = state => {
	return {
		selectedItem: state.selectedItem,
		isSaved: state.gameControl.isSaved,
		hint: state.gameControl.isHintVisible ? stateToHint(state.status, state.items) : null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSaveClick: () => {
			console.log('save is clicked');
			dispatch(save());
		},
		onHintClick: () => {
			dispatch(showHint());
		},
		onHintCancel: () => {
			dispatch(hideHint());
		}
	}
};

const GameContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Game);

export default GameContainer;