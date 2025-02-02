const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const fs = require('fs');

// Ensure log directory exists
if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
    format: combine(timestamp(), logFormat),
    transports: [
        new transports.File({ filename: 'logs/auth.log', level: 'info' }),
        new transports.File({ filename: 'logs/error.log', level: 'error' })
    ]
});

// Stream for morgan
logger.stream = {
    write: (message) => logger.info(message.trim())
};

module.exports = logger;
