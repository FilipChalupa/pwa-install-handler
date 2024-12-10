import { pwaInstallHandler } from 'https://unpkg.com/pwa-install-handler@latest?module'

const $button = document.querySelector('#installButton')
const $logOutput = document.querySelector('#logOutput ul')

const log = (message) => {
	const $logItem = document.createElement('li')
	const now = new Date()
	$logItem.textContent = `[${now.toLocaleTimeString()}.${now.getMilliseconds()}] ${message}`
	$logOutput.prepend($logItem)
}

pwaInstallHandler.addListener((canInstall) => {
	$button.style.visibility = canInstall ? 'inherit' : 'hidden'
	log(canInstall ? '✔️ App can be installed.' : '⚠️ App cannot be installed.')
})

$button.addEventListener('click', async () => {
	const result = await pwaInstallHandler.install()
	log(result ? '✔️ App installed.' : '❌ App not installed.')
})

if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('service-worker.js')
		.then(() => {
			log('✔️ Service worker registered.')
		})
		.catch(() => {
			log('❌ Service worker registration failed.')
		})
}
