//import {sha256} from '../lib/sha256.min.js';
//import {jssha} from 'jssha';
import jsSHA from 'jssha';

const correctDialHash = '748064be03a08df81e31bd6f9e7e7c4cc9f84b4401b9a3c6e85b7ff816d3ba68';

const isDialNumberCorrect = (dialNumberArray) => {
	const shaObj = new jsSHA('SHA-256', 'TEXT');
	shaObj.update(dialNumberArray.join(''));
	return shaObj.getHash('HEX') === correctDialHash;
}

export default isDialNumberCorrect;