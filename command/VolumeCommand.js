const log = require('../logger');
const timer = require('../helpers/timer');
const BaseCommand = require('./BaseCommand');

module.exports = class VolumeCommand extends BaseCommand {
  constructor(name, options) {
    super(name, options)
  }

  _runInternal() {
    return timer(1000)
      .then(() => log.info(`volume created: '${this.name}'`));
  }

  cleanUp() {
    return timer(5000)
      .then(() => log.info(`volume removed: '${this.name}'`));
  }
};