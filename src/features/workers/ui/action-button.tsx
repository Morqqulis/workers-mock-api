import { Button } from 'primereact/button'
import { useDialogStore } from '../model/store'

export function ActionButton() {
	const { isOpen, setIsOpen } = useDialogStore()

	return <Button icon='pi pi-plus' severity='info' onClick={() => setIsOpen(!isOpen)} />
}
