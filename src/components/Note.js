// http://localhost:3000/note/se4hv8x3mep9eceuqfqw9ils

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import env from '../env.json'

function Note() {
	let { noteURL } = useParams()
	const [noteText, setNoteText] = useState('')
	const [lineClass, setLineClass] = useState('hide')
	const [formClass, setFormClass] = useState('hide') // скрываем
	const [errorClass, setErrorClass] = useState('hide') // скрываем

	useEffect(() => {
		if (noteURL !== undefined) {
			fetch(env.urlBackend, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: JSON.stringify({ url: noteURL }),
			})
				.then(response => response.json())
				.then(response => {
					console.log(response)
					if (response.result) {
						setNoteText(response.note)
						setLineClass('')
						setFormClass('hide')
						setErrorClass('hide')
					} else if (!response.result) {
						setLineClass('hide')
						setFormClass('hide')
						setErrorClass('')
					}

					setTimeout(() => {}, 5000)
				})
		} else {
			setLineClass('hide')
			setFormClass('')
			setErrorClass('hide')
		}
	}, [])

	let getNote = event => {
		event.preventDefault()
		let url = event.target.elements.url.value
		url = url.trim()
		if (url === '') {
			alert('Fill in the fields')
			return false
		}
		noteURL = url
		window.location.href = env.url + '/' + url
	}

	let searchNote = () => {
		window.location.href = env.url
	}

	let home = () => {
		window.location.href = env.home
	}

	return (
		<div className='row'>
			<div className='col-12'>
				<div className='text'>
					<form action='' onSubmit={getNote} className={formClass}>
						<div className='form-group '>
							<label htmlFor='url'>Enter note's hash </label>
							<input type='text' name='url' id='url' className='form-control' />
						</div>
						<div className='form-group text-right '>
							<button type='submit' className='btn btn-success'>
								Find Note
							</button>
						</div>
					</form>
				</div>
				<div className={lineClass}>
					<div className='alert alert-success' role='alert'>
						<h4 className='alert-heading'>Note: {noteURL}</h4>
						<div>{noteText}</div>
						<hr />
						<p className='mb-0'>
							<b>Attention!</b> Copy the note. After the display, the note will
							be deleted!
						</p>
					</div>
					<div className='d-grid gap-2 d-md-flex justify-content-md-center '>
						<button onClick={searchNote} className='btn btn-success notes-btn'>
							Search another note
						</button>
						<button onClick={home} className='btn btn-success notes-btn'>
							Home
						</button>
					</div>
				</div>
				<div className={errorClass}>
					<div className='alert alert-danger' role='alert'>
						Note with this hash not found!
					</div>
					<div className='d-grid gap-2 d-md-flex justify-content-md-start'>
						<button onClick={searchNote} className='btn btn-success notes-btn'>
							Search another note
						</button>
						<button onClick={home} className='btn btn-success notes-btn'>
							Home
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Note
