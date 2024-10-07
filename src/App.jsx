import './App.css';
import useNotification from './hooks/useNotification.js';

function App() {
    const [doNotify, close, isOpened] = useNotification("Browser Notification", {
        body: "This is a notification example",
        onClose: (e) => {
            console.log("Notification was closed", e);
        },
        silent: true,
    });

    function handleTestNotify() {
        doNotify();
    }

    function handleCloseNotify() {
        close();
    }

    return (
        <div className={'container'}>
            <button onClick={handleTestNotify}>SHOW NOTIFICATION</button>
            <button onClick={handleCloseNotify} disabled={!isOpened}>
                CLOSE NOTIFICATION
            </button>
        </div>
    );
}

export default App;
