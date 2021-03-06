import { EventEmitter } from 'events';
import {register} from '../dispatchers/app-dispatcher.jsx';

const EVENT_CHANGE = 'CHANGE';

export default class DefaultStore extends EventEmitter {

  constructor() {
    super();
  }

  subscribe(actionSubscribe) {
    this._dispatchToken = register(actionSubscribe());
  }

  get dispatchToken() {
    return this._dispatchToken;
  }

  emitChange() {
    this.emit(EVENT_CHANGE);
  }

  addChangeListener(cb) {
    console.log('addChangeListener',cb)
    this.on(EVENT_CHANGE, cb)
  }

  removeChangeListener(cb) {
    console.log('removeChangeListener',cb)
    this.removeListener(EVENT_CHANGE, cb);
  }
}