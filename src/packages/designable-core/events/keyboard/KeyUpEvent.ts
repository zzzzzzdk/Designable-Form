import { ICustomEvent } from '@/packages/designable-shared';
import { AbstractKeyboardEvent } from './AbstractKeyboardEvent';

export class KeyUpEvent extends AbstractKeyboardEvent implements ICustomEvent {
  type = 'key:up';
}
