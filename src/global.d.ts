declare namespace Api {
	interface Error {
		code: number
		httpCode: number
		msg: string
		err?: unknown
	}
}