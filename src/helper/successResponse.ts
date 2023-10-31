class SuccessResponse {
	success: boolean
	extras?: Record<string, unknown>

	constructor(result?: Record<string, unknown>) {
		this.success = true
		this.extras = result ?? undefined
	}
}

export default SuccessResponse