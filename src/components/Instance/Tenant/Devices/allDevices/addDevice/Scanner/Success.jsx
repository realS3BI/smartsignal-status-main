import React, { Component } from 'react'

import Context from '#context'
import { defaultFetch } from '#helper/Fetch API/request'

import checkToast from '#toast'
import EditDevices from '../../../Details/EditDevices'
import LoadingScreen from '#comp/LoadingScreen'
import { Navigate } from 'react-router-dom'

// DOKU:

export default class Success extends Component {
	static contextType = Context

	state = {
		loading: true,
		device: null,
		inputs: [],
		oneDevice: null,
		cancelInstallation: false,
	}

	AccessToken = this.context.auth.access_token

	changeEditInputs = (cancelInstallation) => {
		this.setState({ cancelInstallation })
	}

	parentLoadDevice = async () => {
		const myDevice = await defaultFetch(
			`${this.context.instance.api}/Device/${this.state.device.id}`,
			{
				method: 'GET',
				headers: {
					Authorization: this.AccessToken,
				},
			}
		)
		// TODO: Fehler, wenn nicht geladen werden konnte!
		this.setState({ device: myDevice })
		return myDevice
	}

	componentDidMount = async () => {
		const getDeviceId = await defaultFetch(
			`${this.context.instance.api}/Device`,
			{
				method: 'POST',
				headers: {
					Authorization: this.AccessToken,
					'Content-Type': 'application/json-patch+json',
				},
				// TODO: Auch in den "filter.js" einbauen.
				body: JSON.stringify({
					page: 0,
					pageSize: 100,
					filter: {
						condition: {
							'@operator': 'or',
							column: [
								{
									'@name': 'edid',
									'@operator': 'LIKE',
									'@value': this.props.params.newDeviceCode,
								},
								{
									'@name': 'serial',
									'@operator': 'LIKE',
									'@value': this.props.params.newDeviceCode,
								},
							],
						},
					},
				}),
			},
			() => checkToast(this.context.t, 13002)
		)

		if (getDeviceId && !getDeviceId?.devices) {
			checkToast(this.context.t, 13002)
			return
		}
		if (getDeviceId.devices.length === 0) {
			checkToast(this.context.t, 13005, getDeviceId, {
				edid: this.props.params.newDeviceCode,
			})
			return
		}

		const oneDevice = getDeviceId.devices[0]

		if (this.context.instance.banSearch.includes(oneDevice.typeId)) {
			checkToast(this.context.t, 13006)
			return
		}

		this.setState({
			device: oneDevice,
			loading: false,
		})
	}

	render() {
		if (this.state.loading) {
			return <LoadingScreen.Spinner className="mt-4" />
		}

		if (this.state.cancelInstallation) {
			return <Navigate to="../.." replace />
		}

		return (
			<EditDevices
				title={this.context.t('all.add.addDevice')}
				device={this.state.device}
				editInputs={true}
				parentLoadDevice={this.parentLoadDevice.bind(this)}
				changeEditInputs={this.changeEditInputs}
				newTenantId={this.props.params.tenantId}
			/>
		)
	}
}
