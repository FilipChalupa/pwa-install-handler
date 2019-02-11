type CanInstallCallback = (canInstall: boolean) => void
type InstallEvent = Event | null

class Install {
	private event: InstallEvent = null
	private callbacks: CanInstallCallback[] = []

	constructor() {
		window.addEventListener('beforeinstallprompt', (event) => {
			event.preventDefault()
			this.updateEvent(event)
		})
	}

	public prompt() {
		// @ts-ignore
		this.event.prompt()
		// @ts-ignore
		this.event.userChoice.then(() => {
			this.updateEvent(null)
		})
	}

	private updateEvent(event: InstallEvent) {
		this.event = event
		this.callbacks.forEach((callback) => callback(Boolean(event)))
	}

	public addListener(callback: CanInstallCallback) {
		callback(Boolean(this.event))
		this.callbacks.push(callback)
	}
}

const install = new Install()

export default install
