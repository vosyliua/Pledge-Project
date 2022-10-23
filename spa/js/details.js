import { customiseNavbar, file2DataURI, loadPage, router, showMessage } from '../util.js'

export async function setup(node) {
	try {
		customiseNavbar(['home', 'logout'])
        await showSpecific(node)
	} catch(err) { 
		console.error(err)
	}
}


export async function showSpecific(node){
    const causeId = localStorage.causeId
    const url = `/api/causes/${causeId}`
    console.log(url)
    const options = {
        method: 'GET',
        headers: {
            'Content-Type' : ' application/vnd.api+json',
            'Authorization' : localStorage.getItem('authorization')
        }
    }
    const response = await fetch(url,options)
    const data = await response.json()
    console.log(data)
    var photo = data.data[0].photo
    var date = data.data[0].createdDate.split('@')
    document.querySelector('header h1').innerText = "Details For Cause "+data.data[0].title
    node.getElementById('mainTitle').innerText = data.data[0].title
    node.getElementById('mainImg').src = `/uploads/${photo}`
    node.getElementById('mainCreated').innerText = data.data[0].username+" is organizing this cause"
    node.getElementById('dateCreated').innerText = "Created On " + date[0]
    node.getElementById('mainDesc').innerText = data.data[0].description
    node.getElementById('sidebarMoney').innerText = data.data[0].money+ "€ Raised"
    node.getElementById('sidebarDeadline').innerText ="The Deadline is on " + data.data[0].deadline
    
}
