

import { createToken, customiseNavbar, loadPage, showMessage } from '../util.js'

export async function setup(node) {
	try {
        document.querySelector('header h1').innerText = 'Donate'
		console.log('LOGIN: setup')
		console.log(node)
		customiseNavbar(['home', 'register', 'login'])
        const text = node.getElementById('donationInput')
		text.addEventListener('keypress', isNumberKey)
	} catch(err) {
		console.error(err)
	}
}


function isNumberKey(evt) {
    console.log(evt)
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if ((charCode < 48 || charCode > 57))
        return false;

    return true;
}
