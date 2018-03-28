/**
 * Message display on the bottom
 */

import { Component, OnInit, HostBinding } from '@angular/core';
import { MessageItem } from './message-option.model';
import { MessageType } from './message-type.enum';
import { MessageService } from './message.service';
import { messageDuration } from '../constants';

@Component({
  selector: 'gh-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @HostBinding('class.opened') opened: boolean = false;

  @HostBinding('class.error')
  get error(): boolean {
    return this.messageType === MessageType.ERROR;
  }

  @HostBinding('class.success')
  get success(): boolean {
    return this.messageType === MessageType.SUCCESS;
  }

  private messageQueue: MessageItem[] = [];
  private messageDuration: number = messageDuration;

  messageTypeEnum = MessageType;
  messageContent = '';
  messageType: MessageType = MessageType.ERROR;

  constructor(private messageService: MessageService) {
    this.messageService.errorObservable
      .subscribe((message) => {
        this.queueMessage({
          content: message,
          type: MessageType.ERROR
        });
      });

    this.messageService.successObservable
      .subscribe((message) => {
        this.queueMessage({
          content: message,
          type: MessageType.SUCCESS
        });
      });
  }

  getIcon() {
    if (this.messageType === MessageType.SUCCESS) {
      return 'check';
    } else {
      return 'error';
    }
  }

  // put message in queue
  queueMessage(message: MessageItem) {
    this.messageQueue.push(message);
    this.showMessage();
  }

  // show message queue by order
  showMessage() {
    if (!this.messageQueue.length || this.opened) {
      return;
    }

    const message = this.messageQueue.shift();
    this.messageContent = message.content;
    this.messageType = message.type;
    this.opened = true;

    setTimeout(() => {
      this.opened = false;
      this.showMessage();
    }, this.messageDuration);
  }

}
