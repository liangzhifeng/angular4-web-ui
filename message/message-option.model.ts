/**
 * Message Item
 */

import {MessageType} from './message-type.enum';

export interface MessageItem {
  content: string;
  type: MessageType;
}
