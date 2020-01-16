import { Injectable } from '@angular/core';
import { Socket } from 'phoenix';
import { wsConnStr } from './shared/app-config';

@Injectable()
export class MessageRemindingService {
  socket: any;
  channelNewContract: any;
  channel: any;

  constructor() {
    this.setSocket();
  }

  setSocket() {
    this.socket = new Socket(wsConnStr, {
      logger: ((kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }),
      transport: WebSocket
    });
    this.socket.connect();

  }

  getChannel(channelStr) {
    const channel = this.socket.channel(channelStr, { token: localStorage.getItem("currentToken") })
    channel.join()
      .receive("ok", ({ messages }) => { console.log("##########catching up###########"); console.log(messages) })
      .receive("error", ({ reason }) => console.log("failed join", reason))
      .receive("timeout", () => console.log("Networking issue. Still waiting..."))
    this.channel = channel;
    return this.channel
  }

}

