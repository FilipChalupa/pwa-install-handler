import { BeforeInstallPromptEvent } from './BeforeInstallPromptEvent'

type CanInstallCallback = (
	canInstall: boolean,
	install?: () => Promise<boolean>
) => void

class PwaInstallHandler {
	private event: BeforeInstallPromptEvent | null = null
	private callbacks: CanInstallCallback[] = []

	constructor() {
		if (typeof window === 'undefined') {
			return
		}

		window.addEventListener('beforeinstallprompt', (event) => {
			event.preventDefault()
			this.updateEvent(event as BeforeInstallPromptEvent)
		})

		window.addEventListener('appinstalled', () => {
			this.updateEvent(null)
		})
	}

	/**
	 * Triggers install prompt.
	 */
	public install = async (): Promise<boolean> => {
		if (this.event) {
			this.event.prompt()
			return await this.event.userChoice.then(({ outcome }) => {
				this.updateEvent(null)
				return outcome === 'accepted' || true
			})
		} else {
			throw new Error('Not allowed to prompt.')
		}
	}

	/**
	 * Returns internal `BeforeInstallPromptEvent`.
	 */
	public getEvent() {
		return this.event
	}

	/**
	 * Tells whether the app is ready to be installed.
	 */
	public canInstall() {
		return this.event !== null
	}

	private updateEvent(event: BeforeInstallPromptEvent | null) {
		if (event === this.event) {
			return
		}
		this.event = event
		this.callbacks.forEach((callback) => callback(this.canInstall()))
	}

	/**
	 * Adds listener with a callback which is called when installability state changes.
	 */
	public addListener(callback: CanInstallCallback): void {
		callback(this.canInstall())
		this.callbacks.push(callback)
	}

	/**
	 * Removes listener.
	 */
	public removeListener(callback: CanInstallCallback): void {
		this.callbacks = this.callbacks.filter(
			(otherCallback) => callback !== otherCallback
		)
	}
}

export const pwaInstallHandler = new PwaInstallHandler()
