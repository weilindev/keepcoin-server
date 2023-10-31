import winston from 'winston'
import path from 'path'
import 'winston-daily-rotate-file'

const logfolder = path.resolve(__dirname, '../../logs')

const transports = [
	new winston.transports.DailyRotateFile({
		level: 'warn',
		filename: 'app-%DATE%.log',
		dirname: `${logfolder}/error`,
		datePattern: 'YYYY-MM-DD',
		zippedArchive: true,
		maxSize: '10m',
		maxFiles: '30d',
	})
]

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.printf(log => {
			if (log.message instanceof Object) {
				return `${log.timestamp} ${log.level} - ${JSON.stringify(log.message)}`
			}
			return `${log.timestamp} ${log.level} - ${log.message}`
		}),
	),
	transports: transports
})

if (process.env.NODE_ENV !== 'production') {
	logger.add(new winston.transports.DailyRotateFile({
		filename: 'app-%DATE%.log',
		dirname: `${logfolder}/combined`,
		datePattern: 'YYYY-MM-DD',
		zippedArchive: true,
		maxSize: '20m',
		maxFiles: '30d',
	}))
	logger.add(new winston.transports.Console({
		format: winston.format.printf(log => {
			if (log.message instanceof Object) {
				return `${log.level} - ${JSON.stringify(log.message)}`
			}
			return `${log.level} - ${log.message}`
		}),
	}))
}

export default logger