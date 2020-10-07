import React, {useRef, useState, useEffect} from 'react';
import './App.css';

function App() {
    const ws = useRef(null);
    const [sendMessage, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        ws.current = new WebSocket("ws://0.0.0.0:8080/chat");
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");
        ws.current.onmessage = e => {
            setMessages( messages => [...messages,e.data]);
            const message = JSON.parse(e.data);
            console.log("e", message);
        };

        return () => {
            ws.current.close();
        };
    }, []);


    return (
        <div className="App">
            <p>
                {JSON.stringify(messages)}
            </p>
            <input value={sendMessage} onChange={e => setMessage(e.target.value)}/>
            <button onClick={() => {
                ws.current.send(sendMessage);
                setMessages( messages => [...messages,`You said: ${sendMessage}`]);
                setMessage('');
            }}>
                send
            </button>
        </div>
    );
}

export default App;
