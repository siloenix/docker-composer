const log = require('../logger');
const BaseCommand = require('./BaseCommand');
const docker = require('../docker/client');


class ServiceCommand extends BaseCommand {
  constructor(name, options) {
    super(name, options)
  }

  /**
   * 1) pulls image
   * 2) creates container
   * 3) runs container
   * */
  async _runInternal() {
    const {image} = this.options;
    await docker.pull(image);

    log.info(`Creating container: '${this.name}' (${image})`);
    const container = await docker.createContainer({
      'AttachStdin': false,
      'AttachStdout': false,
      'AttachStderr': false,
      'OpenStdin': false,
      'StdinOnce': false,
      'Cmd': [],
      'Image': image,
      'name': this.name
    });
    this.container = container;

    log.info(`Starting container: '${this.name}' (${image})`);
    await container.start();

    log.info(`Service created: '${this.name}' (${image})`);
  }

  async cleanUp() {
    if (this.container) {
      await this.container.stop();
      await this.container.remove();
      log.info(`Service removed: '${this.name}'`)
    }
  }
}

module.exports = ServiceCommand;