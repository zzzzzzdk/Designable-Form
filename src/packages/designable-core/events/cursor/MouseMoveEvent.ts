import { ICustomEvent } from '@/packages/designable-shared';
import { AbstractCursorEvent } from './AbstractCursorEvent';

export class MouseMoveEvent
  extends AbstractCursorEvent
  implements ICustomEvent
{
  type = 'mouse:move';
}
