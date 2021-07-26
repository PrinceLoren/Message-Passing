function Main() {
	return (
		<div className='row justify-content-md-center'>
			<div className='col-12'>
				<div className='text'>
					<ul className='row button-list'>
						<li className='col-6'>
							<a href='/create' type='button' className='btn btn-success'>
								Create Note
							</a>
						</li>
						<li className='col-6'>
							<a href='/note' type='button' className='btn btn-success'>
								View Note
							</a>
						</li>
					</ul>
				</div>

				<div className='text'>
					<p>
						<b>Message Passing</b> – a service for exchanging notes. Create a
						note, send a link to the note, and your friend will be able to view
						it.
					</p>
					<p>
						<b>How to create a note? </b>
					</p>
					<ul>
						<li>Follow the link Create Note</li>
						<li>Enter the text and click Create</li>
						<li>Send the generated address to a friend</li>
					</ul>
					<p>
						<b>How to read a note?</b>
					</p>
					<ul>
						<li>Follow the link View Note</li>
						<li>Enter note's hash</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Main
