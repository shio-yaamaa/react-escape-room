import {connect} from 'react-redux';
import {save, showHint, cancelHint} from '../redux/modules/gameControl'
import Game from '../components/Game';

const mapStateToProps = state => {
	return {
		isSaved: state.gameControl.isSaved,
		hint: state.gameControl.hint
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSaveClick: () => {
			dispatch(save());
		},
		onHintClick: () => {
			dispatch(showHint());
		},
		onHintCancel: () => {
			dispatch(cancelHint());
		}
	}
};

const GameContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Game);

export default GameContainer;