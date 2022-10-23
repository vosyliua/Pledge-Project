

import { createToken, customiseNavbar, loadPage, showMessage } from '../util.js'

export async function setup(node) {
	try {
        document.querySelector('header h1').innerText = 'Donate'
		console.log('LOGIN: setup')
		console.log(node)
		customiseNavbar(['home', 'register', 'login'])
        const text = node.getElementById('donationInput')
		text.addEventListener('keypress', isNumberKey)
        node.getElementById('donateButton').addEventListener('click', async function(){
            var x = document.getElementById('messageSupport').value
            var v = document.getElementById('donationInput').value
            await addDonation(x,v)
        })
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


async function addDonation(donationData, messageData){
    var currentdate = new Date(); 
    var datetime =   currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
    var username = localStorage.getItem('username')
    var causeId = localStorage.getItem('causeId')
    const data = {
        user: username,
        causeId: causeId,
        date: datetime,
        message:messageData,
        donation:donationData
    }
    console.log(data)

}