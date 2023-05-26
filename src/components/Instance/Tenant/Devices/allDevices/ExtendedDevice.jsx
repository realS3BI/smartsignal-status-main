import { faImage, faEye } from '@fortawesome/free-solid-svg-icons'
// import { faImage,faEye } from '@fortawesome/pro-light-svg-icons'
import { faExclamationCircle } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Context } from '../../../../../shared/context'
import ConnectionBars from '../../../../../shared/components/ConnectionBars'

/**
 * React component that show an extended view of data on the overview
 *
 * @component
 * @example
 * <ExtendedDevice/>
 */
export default class ExtendedDevice extends Component {
	/**
	 * @typedef {Object} Context
	 * @property {Function} t
	 */
	static contextType = Context

	// TODO: Gateway berücksichtigen (Und Sortierung?)

	/**
	 * Checks if a value is null or '0' and returns the appropriate result.
	 * @param {any} value - The value to be checked.
	 * @returns {any} - If the value is '0' or null, returns undefined. Otherwise, returns the original value.
	 */
	ifNull = (value) => {
		if (value === '0' || value === null) {
			return
		} else {
			return value
		}
	}

	render() {
		const { t } = this.context
		const { device, alarm, alarmText } = this.props
		const attr = device.attributes

		return (
			<div className="text-center px-2 sm:px-8 text-sm sm:text-base mt-1 pb-4 space-y-2">
				{device.typeId !== 1 && <ConnectionBars attr={attr} />}
				<div className="font-bold">{device.serial}</div>
				<div className="flex w-full justify-between items-center">
					<div className="border border-gray-800 dark:border-gray-500 w-28 h-10 rounded-md flex items-center justify-center">
						{attr.app_status}
					</div>
					<div className="text-right truncate">
						<div className="first-letter:uppercase">
							{device.type.split('_')[1]}
						</div>
						<div>
							{new Date(attr.last_timestamp).toLocaleString(
								undefined
							)}
						</div>
					</div>
				</div>
				<div>{this.ifNull(attr.comment)}</div>
				<div className="flex justify-between">
					<NavLink to={'device/' + device.id}>
						<div className="bg-gray-100 dark:bg-gray-700 border border-gray-800 dark:border-gray-500 w-28 h-10 rounded-md flex items-center justify-center">
							<FontAwesomeIcon icon={faEye} />
							<span className="md:mb-0.5 ml-2">
								{t('devices.extended.details')}
							</span>
						</div>
					</NavLink>
					<div className="bg-gray-100 dark:bg-gray-700 border border-gray-800 dark:border-gray-500 w-28 h-10 rounded-md flex items-center justify-center">
						<FontAwesomeIcon icon={faImage} />
						<span className="md:mb-0.5 ml-2">
							{t('devices.extended.picture')}
						</span>
					</div>
				</div>
				{alarm && (
					<div className="flex items-center p-1 border border-red-600 text-left border-dashed rounded-sm font-bold text-red-600">
						<div>
							<FontAwesomeIcon
								icon={faExclamationCircle}
								size="lg"
							/>
						</div>
						<div className="ml-2">{alarmText}</div>
					</div>
				)}
			</div>
		)
	}
}
