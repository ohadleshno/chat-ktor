import React, {useRef, useState, useEffect} from 'react';
import './App.css';

function App() {
    const ws = useRef(null);
    const [room,setRoom] = useState("room1");
    const [sendMessage, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if(ws.current !== null){
            ws.current.close();
        }
        ws.current = new WebSocket(`ws://0.0.0.0:8080/chat/${room}`);
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
    }, [room]);


    return (
        <div className="App">
            <input value={room} onChange={e => setRoom(e.target.value)}/>

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
