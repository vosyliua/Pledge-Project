
/* routes.js */

import { Router } from 'oak'

import { extractCredentials, dataURLtoFile } from 'util'
import { login, register } from 'accounts'
import { addCause, getCauses, getCauseById } from './modules/causes.js'

const router = new Router()

// the routes defined here
router.get('/', async context => {
	console.log('GET /')
	context.response.headers.set('Content-Type', 'text/html')
	const data = await Deno.readTextFile('spa/index.html')
	context.response.body = data
})
router.post('/api/addCause', async context => {
	const body  = await context.request.body()
	const data = await body.value
	if(await addCause(data)){
		context.response.status = 200
		context.response.body = JSON.stringify({ status: 'success', msg: 'cause created' })
	}else
	{
		context.response.status = 409
		context.response.body = JSON.stringify({ status: 'false', msg: 'cause already exists' })
	}
	
})


router.get('/api/causes/:causeid', async context => {
	const token = context.request.headers.get('Authorization')
	context.response.headers.set('Content-Type', 'application/json')
	try {
		const credentials = extractCredentials(token)
		const verify = await login(credentials)
		const data = context.params.causeid
		const cause = await getCauseById(data);
		context.response.body = {status:'success',data:cause}
	} catch(err) {
		err.data = {
			code: 401,
			title: '401 Unauthorized',
			detail: err.message
		}
		throw err
	}
})

router.get('/api/getCauses', async context => {
	const token = context.request.headers.get('Authorization')
	context.response.headers.set('Content-Type', 'application/json')
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const verifyCredentials = await login(credentials)
		const data = await getCauses()
		context.response.body = JSON.stringify({status:'succes', data: data})
	} catch(err) {
		err.data = {
			code: 401,
			title: '401 Unauthorized',
			detail: err.message
		}
		throw err
	}
})
router.get('/api/accounts', async context => {
	console.log('GET /api/accounts')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	context.response.headers.set('Content-Type', 'application/json')
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const username = await login(credentials)
		console.log(`username: ${username}`)
		context.response.body = JSON.stringify(
			{
				data: { username }
			}, null, 2)
	} catch(err) {
		err.data = {
			code: 401,
			title: '401 Unauthorized',
			detail: err.message
		}
		throw err
	}
})

router.post('/api/accounts', async context => {
	console.log('POST /api/accounts')
	const body  = await context.request.body()
	const data = await body.value
	console.log(data)
	await register(data)
	context.response.status = 201
	context.response.body = JSON.stringify({ status: 'success', msg: 'account created' })
})

router.post('/api/files', async context => {
	console.log('POST /api/files')
	try {
		const token = context.request.headers.get('Authorization')
		console.log(`auth: ${token}`)
		const body  = await context.request.body()
		const data = await body.value
		console.log(data)
		dataURLtoFile(data.base64, data.user)
		context.response.status = 201
		context.response.body = JSON.stringify(
			{
				data: {
					message: 'file uploaded'
				}
			}
		)
	} catch(err) {
		err.data = {
			code: 500,
			title: '500 Internal Server Error',
			detail: err.message
		}
		throw err
	}
})

export default router

