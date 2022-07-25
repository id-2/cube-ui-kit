import { useContext, useEffect } from 'react';
import { useEvent } from '../../../../_internal';
import { CubeNotifyApiPropsWithID } from '../types';
import { NotificationsContext } from '../NotificationsContext';

export function useNotificationsObserver(
  callback: (notification: CubeNotifyApiPropsWithID) => void,
) {
  const { addOnDismissListener } = useContext(NotificationsContext) ?? {};
  const callbackEvent = useEvent(callback);

  useEffect(
    () => addOnDismissListener?.(callbackEvent),
    [addOnDismissListener],
  );
}
