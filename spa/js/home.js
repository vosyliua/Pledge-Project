
/* home.js */

import { customiseNavbar,loadPage } from '../util.js'

export async function setup(node) {
	console.log('HOME: setup')
	try {
		console.log(node)
		document.querySelector('header h1').innerText = 'All Available Causes'
		customiseNavbar(['home', 'foo', 'logout', 'newCause']) // navbar if logged in
		const token = localStorage.getItem('authorization')
		console.log(token)
		if(token === null) customiseNavbar(['home', 'register', 'login']) //navbar if logged out
		// add content to the page
		await addContent(node)
	} catch(err) {
		console.error(err)
	}
}


async function addContent(node) {
	const options = {
		method: 'GET',
		headers: {
            'Authorization': localStorage.getItem('authorization'),
			'Content-Type': 'application/vnd.api+json'
		},
	}
	const response = await fetch('api/getCauses',options)
	const data = await response.json()
	const dataArray = data.data
	console.log(dataArray)
	dataArray.forEach(cause =>{
		var image = document.createElement('img')
		var title = document.createElement('h2')
		var fundTarget = document.createElement('h2')
		var amountPledged = document.createElement('h2')
		var deadline = document.createElement('h2')
		var detailsButton = document.createElement('button')
		image.setAttribute('id','causeImg')
		title.setAttribute('id','titleCauses')
		fundTarget.setAttribute('id','causesTarget')
		amountPledged.setAttribute('id','pledgedCauses')
		deadline.setAttribute('id','deadlineCauses')
		detailsButton.setAttribute('class','detailsButton')
		detailsButton.setAttribute('id',cause.id)
		image.src = `/uploads/${cause.photo}`
		image.style.width = "150px"
		image.style.height = "150px"
		title.innerText = cause.title
		fundTarget.innerText = cause.money+"€"
		amountPledged.innerText = cause.money+"€"
		deadline.innerText = cause.deadline
		detailsButton.innerText = "Details"
		var wrapper = node.getElementById('causesWrapper')
		detailsButton.addEventListener('click', ()=>{
			localStorage.setItem('causeId', detailsButton.id )
			loadPage('details')
		})
		wrapper.appendChild(image)
		wrapper.appendChild(title)
		wrapper.appendChild(fundTarget)
		wrapper.appendChild(amountPledged)
		wrapper.appendChild(deadline)
		wrapper.appendChild(detailsButton)



	})

	
}
