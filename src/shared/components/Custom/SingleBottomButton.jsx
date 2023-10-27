import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'

// DOKU:

export default class SingleBottomButton extends Component {
	render() {
		const { icon, onClick, color } = this.props
		return (
			<div
				onClick={onClick}
				className={
					(color ? color : 'bg-primary') +
					' cursor-pointer shadow-smAll shadow-gray-500 w-16 h-16 rounded-full flex items-center justify-center text-white'
				}
			>
				<FontAwesomeIcon icon={icon} size="2xl" />
			</div>
		)
	}
}
