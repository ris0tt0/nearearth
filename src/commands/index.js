import Logger from 'js-logger';
import { fetchLinkNeoFeed } from '../actions';

class Commands {
  dispatch = null;
  static instance = null;

  static getInstance(dispatch) {
    Logger.info('👀 Commands::getInstance');
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
    this.feedNasaUrl = this.feedNasaUrl.bind(this);
    this.feedItemId = this.feedItemId.bind(this);
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

  feedNasaUrl(url) {
    Logger.info('Commands::feedNasaUrl', url);

    return Promise.resolve();
  }

  feedItemId(id) {
    Logger.info('Commands::feedItemId', id);

    return Promise.resolve();
  }
}

export const createCommands = (dispatch) => Commands.getInstance(dispatch);
