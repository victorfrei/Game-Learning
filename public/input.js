
    export default function CreateKeyboardListener(document,socket) {
        const state = {
            observers: []
        }

        function subscribe(observerFunction) {
            state.observers.push(observerFunction);
        }

        function notifyAll(command) {
            console.log(`<-KeyboardListener-> Notificando ${state.observers.length} ${state.observers.length == 1 ? "observador" : "observadores"}!`)
            for (const observerFunction of state.observers) {
                observerFunction(command)
            }
        }

        document.addEventListener('keydown', handleKeyboard);

        function handleKeyboard(event) {
            let KeyPressed = event.key;

            const command = {
                player: socket.id,
                KeyPressed
            }

            notifyAll(command);

        }

        return {
            subscribe,
            notifyAll
        }
    }