import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable()
export class PusherProvider {
  constructor() {
    const pusher = new Pusher('PUSHER_KEY', {
      cluster: 'ap1',
    });
    this.channel = pusher.subscribe('vote-channel');
  }
  channel;
  public init() {
    return this.channel;
  }
}
