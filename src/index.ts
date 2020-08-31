import BeforeInstallPromptEvent from './BeforeInstallPromptEvent'

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
	}

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

	public getEvent() {
		return this.event
	}

	public canInstall() {
		return Boolean(this.event)
	}

	private updateEvent(event: BeforeInstallPromptEvent | null) {
		this.event = event
		this.callbacks.forEach((callback) => callback(Boolean(event)))
	}

	public addListener(callback: CanInstallCallback): void {
		callback(Boolean(this.event))
		this.callbacks.push(callback)
	}

	public removeListener(callback: CanInstallCallback): void {
		this.callbacks = this.callbacks.filter((cb) => callback !== cb)
	}
}

const pwaInstallHandler = new PwaInstallHandler()

export default pwaInstallHandler
