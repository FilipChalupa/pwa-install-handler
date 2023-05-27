export interface BeforeInstallPromptEvent extends Event {
	readonly userChoice: Promise<{
		outcome: 'accepted' | 'dismissed'
		platform: string
	}>

	prompt(): Promise<void>
}
