import { pwaInstallHandler } from 'https://unpkg.com/pwa-install-handler@latest?module'

const $button = document.querySelector('#installButton')
const $logOutput = document.querySelector('#logOutput ul')

const log = (message) => {
	const $logItem = document.createElement('li')
	const now = new Date()
	$logItem.textContent = `[${now.toLocaleTimeString()}.${now.getMilliseconds()}] ${message}`
	$logOutput.appendChild($logItem)
}

log('ℹ️ Application has started.')

pwaInstallHandler.addListener((canInstall) => {
	$button.style.visibility = canInstall ? 'inherit' : 'hidden'
	log(
		canInstall
			? '✔️ Application can be installed.'
			: '⚠️ Application cannot be installed.',
	)
})

$button.addEventListener('click', async () => {
	log('ℹ️ User requested application installation.')
	const result = await pwaInstallHandler.install()
	log(result ? '✔️ Application installed.' : '❌ Application not installed.')
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
