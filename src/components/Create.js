import React from 'react'
import { useState } from 'react'
import env from '../env.json'

function Create() {
	const [url, setUrl] = useState()
	const [lineClass, setLineClass] = useState('hide')
	const [formClass, setFormClass] = useState('')
	const [textToCopy, setTextToCopy] = useState('')
	const copy = React.createRef()

	let sendData = obj => {
		setFormClass('hide')
		setLineClass('')
		fetch(env.urlBackend, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify(obj),
		})
			.then(response => response.json())
			.then(response => {
				if (response.result) {
					setUrl(env.url + '/' + response.url)
				}
			})
	}

	let loadDataFromForm = event => {
		event.preventDefault()
		let note = event.target.elements.note.value
		note = note.trim()
		if (note === '') {
			alert('Fill in the fields')
			return false
		}

		sendData({ note: note })
	}

	return (
		<div className='row justify-content-md-center '>
			<div className='col-12d '>
				<div className='text'>
					<form onSubmit={loadDataFromForm} className={formClass}>
						<label htmlFor=''>Enter a message</label>
						<textarea
							name='note'
							id='note'
							defaultValue='Test'
							className='form-control'
							ref={copy}
						></textarea>
						<p>
							<b>Attention!</b> The maximum length of a note is 500 characters.
						</p>
						<div className='form-group text-end'>
							<button type='submit' className='btn btn-success'>
								Create
							</button>
						</div>
					</form>
					<div className={lineClass}>
						<div className='alert alert-success' role='alert'>
							{url}
						</div>
						<p>
							<b>Attention!</b> You can view the note one time!
						</p>

						<div className='d-grid gap-2 d-md-flex justify-content-md-end'>
							<button
								onClick={() => window.location.reload()}
								className='btn btn-success'
							>
								Create new note
							</button>

							<button
								className='btn btn-success'
								onClick={() => navigator.clipboard.writeText(url)}
							>
								Copy to clipboard
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Create
