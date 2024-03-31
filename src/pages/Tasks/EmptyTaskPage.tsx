import React from 'react'
import { Link } from 'react-router-dom'

export const EmptyTaskPage = () => {

	return (
		<div className='section'>
			<div className="container">
				<div className='full-center'>
					<div className='max-w-xl text-center'>
						<h2 className='mb-4'>There are no tasks yet</h2>
						<p className='mb-8'>You can create your own task</p>
						<Link to={"/tasks/create"} className='btn btn--primary btn--lg rounded w-full'>Create Task</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
