// default
let logger = require('./logger.js')()

logger.heading('Start')
logger.error('damn!')
logger.info('note')
logger.success('OK')
logger.heading('Stop')

// filename opt
logger = require('./logger.js')({filename: 'filename.log'})

logger.heading('Start')
logger.error('damn!')
logger.info('note')
logger.success('OK')
logger.heading('Stop')

// no-console opt
logger = require('./logger.js')({transports: ['file'], filename: 'no-console.log'})

logger.heading('Start')
logger.error('damn!')
logger.info('note')
logger.success('OK')
logger.heading('Stop')

// no-file opt
logger = require('./logger.js')({transports: ['console'], filename: 'no-file.log'})

logger.heading('Start')
logger.error('damn!')
logger.info('note')
logger.success('OK')
logger.heading('Stop')
