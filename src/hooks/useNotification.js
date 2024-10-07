import { useEffect, useState, useRef } from 'react';

const useNotification = (title, options) => {
    const [isPermissionGranted, setIsPermissionGranted] = useState(Notification?.permission === 'granted');
    const [isOpened, setIsOpened] = useState(false);

    let notification = useRef(null);

    const doNotify = () => {
        if (isPermissionGranted) {
            notification.current = new Notification(title, options);
            setIsOpened(true);

            notification.current.onclick = () => {
                console.log('Notification was clicked');
                setIsOpened(false);
            };

            notification.current.onclose = (e) => {
                console.log('Notification was closed from the window', e);
                setIsOpened(false);
                if (typeof options?.onClose === 'function') {
                    options.onClose(e);
                }
            };
        }
    };

    const close = () => {
        if (notification.current) {
            notification.current.close();
            setIsOpened(false);
            console.log('Notification was closed manually from the page');
        }
    };

    useEffect(() => {
        if (!isPermissionGranted) {
            Notification.requestPermission()
                .then((status) =>
                    (setIsPermissionGranted(status === 'granted'))
            );
        }
    }, [isPermissionGranted]);

    return [doNotify, close, isOpened];
};

export default useNotification;
