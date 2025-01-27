/* eslint-disable @typescript-eslint/no-var-requires */
const shell = require('shelljs');

// Copiar a pasta inteira
shell.cp('-R', 'src/modules/mail/templates', 'dist/src/modules/mail');
