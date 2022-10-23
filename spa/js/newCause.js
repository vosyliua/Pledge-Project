/* home.js */

import { customiseNavbar, file2DataURI, loadPage, router, showMessage } from '../util.js'

export async function setup(node) {
	console.log('HOME: setup')
	try {
		console.log(node)
		customiseNavbar(['home', 'logout', ]) // navbar if logged in
		const token = localStorage.getItem('authorization')
		console.log(token)
        node.querySelector('input[type="file"]').addEventListener('change', await displayImage)
        node.querySelector('form').addEventListener('submit', await addCause)
		if(token === null) customiseNavbar(['home', 'register', 'login']) //navbar if logged out
	} catch(err) {
		console.error(err)
	}
}

async function displayImage(event){
    const files = event.target.files
    const file = files[0]
    console.log(file)
    if (file){
        const data = await file2DataURI(file)
        document.getElementById('image').src = data
    }
}

async function addCause(event) {
    
    event.preventDefault()
	console.log('form submitted')

	const formData = new FormData(event.target)
	const data = Object.fromEntries(formData.entries())
    var x = data.money
    console.log(x)
    
    if(x.match(/[^0-9]/)) {
        alert("?")
        return;
    }
    
    const photo = document.getElementById('avatar')
    const files = photo.files
    console.log(files)
    if(files[0]){
            const file = files[0]
            console.log(file)
            const picture = await file2DataURI(file)
            data.photo = picture
            console.log(data.photo + " IN IF FOR PICTURE")
    }
     var currentdate = new Date(); 
    var datetime =   currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
    data.date = datetime
    data.username = localStorage.getItem('username')
    data.money = parseInt(data.money)
    const options = {
		method: 'POST',
		headers: {
            'Authorization': localStorage.getItem('authorization'),
			'Content-Type': 'application/vnd.api+json'
		},
		body: JSON.stringify(data)
	}
    const response = await fetch('api/addCause', options)
    if(response.status == 200){
        console.log("Added")
    }else{
        console.log("not added")
    }
}
