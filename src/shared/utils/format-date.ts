export function formatDate(date: number) {
	const dateToShow = Date.now() - date
	const year = new Date(dateToShow).getFullYear()
	const month = new Date(dateToShow).getMonth()
	const day = new Date(dateToShow).getDate()
	return `${day}-${month}-${year}`
}
