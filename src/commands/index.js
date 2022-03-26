import Logger from 'js-logger';
import { fetchLinkNeoFeed } from '../actions';

class Commands {
  dispatch = null;
  static instance = null;

  static getInstance(dispatch) {
    Logger.info('Commands::getInstance');
    if (Commands.instance === null) {
      Commands.instance = new Commands();
    }

    if (dispatch) {
      Commands.instance.init(dispatch);
    }

    return Commands.instance;
  }

  constructor() {
    Logger.info('Commands::ctor');

    this.dispatch = null;
    this.feedUrl = this.feedUrl.bind(this);
  }

  init(dispatch) {
    Logger.info('Commands::init', dispatch);
    this.dispatch = dispatch;

    Logger.info('Commands::init2', this.dispatch);
  }

  feedUrl(url) {
    Logger.info('Commands::feedUrl', this.dispatch);
    return this.dispatch(fetchLinkNeoFeed(url));
  }
}

export const createCommands = (dispatch) => {
  // commands.init(dispatch);
  // return commands;
  return Commands.getInstance(dispatch);
};
