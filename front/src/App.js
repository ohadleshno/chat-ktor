import React, {useRef, useState, useEffect} from 'react';
import RoomSelect from "./RoomSelect";
import Chat from "./Chat";
import './App.css'
import styled from "styled-components";

function App() {
    const ws = useRef(null);
    const [room, setRoom] = useState("Aba");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (ws.current !== null) {
            ws.current.close();
        }
        ws.current = new WebSocket(`ws://0.0.0.0:8080/chat/${room}`);
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");
        ws.current.onmessage = e => {
            setMessages(messages => [...messages, e.data]);
            const message = JSON.parse(e.data);
            console.log("e", message);
        };

        return () => {
            ws.current.close();
        };
    }, [room]);


    return (
        <Wrapper>
            <RoomSelect room={room} selectRoom={(room) => {
                setRoom(room);
                setMessages([]);
            }}/>
            <Chat messages={messages} ws={ws} setMessages={setMessages}/>
        </Wrapper>
    );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
