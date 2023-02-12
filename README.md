# PWA install handler

Handling PWA installation prompt made easier. [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Window/onbeforeinstallprompt)

## Installation

```sh
npm install pwa-install-handler
```

## Usage

### HTML

```html
<button id="installButton" style="display: none;">Install</button>
```

### JavaScript

```javascript
import { pwaInstallHandler } from 'pwa-install-handler'

const $button = document.querySelector('#installButton')

pwaInstallHandler.addListener((canInstall) => {
	$button.style.display = canInstall ? 'inline-block' : 'none'
})

$button.addEventListener('click', () => {
	pwaInstallHandler.install()
})
```

### React

For more information see [react-use-pwa-install](https://www.npmjs.com/package/react-use-pwa-install).

### Screencast

![UI example](https://raw.githubusercontent.com/FilipChalupa/pwa-install-handler/HEAD/screencast.gif)

### Demo

Check [website](https://filipchalupa.cz/pwa-install-handler/) or [code](https://github.com/FilipChalupa/pwa-install-handler/tree/main/demo).

## Methods

```typescript
pwaInstallHandler.install: () => Promise<boolean>
```

```typescript
pwaInstallHandler.addListener: (
	(
		callback: (canInstall: boolean) => void,
		install?: () => Promise<boolean>
	) => void
) => void
```

```typescript
pwaInstallHandler.removeListener: (
	(
		callback: (canInstall: boolean) => void,
		install?: () => Promise<boolean>
	) => void
) => void
```

```typescript
pwaInstallHandler.canInstall: () => boolean
```

```typescript
pwaInstallHandler.getEvent: () => BeforeInstallPromptEvent | null
```

## Notes

You PWA must meet some requirements to be installable. Without that the `canInstall` will always be `false`. The requirements are browser specific. You can read more about it [here (MDN)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Installable_PWAs#Requirements) and [here (web.dev)](https://web.dev/install-criteria/).

Some browsers don't support custom install button. These will have `canInstall` always set to `false` too. For more information check [BeforeInstallPromptEvent support](https://caniuse.com/#feat=mdn-api_beforeinstallpromptevent).
