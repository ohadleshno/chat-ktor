import React from 'react';
import styled from "styled-components";

function Chat({messages, setMessages, ws}) {

    const [currentMessage, setCurrentMessage] = React.useState('');
    const sendMessage = (e) => {
        e.preventDefault();
        ws.current.send(currentMessage);
        setMessages([...messages, `You said: ${currentMessage}`]);
        setCurrentMessage('');
    };

    return (
        <Wrapper>
            <Messages>
                {messages.map((message, i) => <Message key={i}> {message} </Message>)}
            </Messages>
            <CurrentMessageSection onSubmit={sendMessage}>
                <CurrentMessageInput value={currentMessage} onChange={e => setCurrentMessage(e.target.value)}/>
                <button onClick={sendMessage}>
                    send
                </button>
            </CurrentMessageSection>
        </Wrapper>
    );
}

export default Chat;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  flex-direction: column;
`;

const Message = styled.div`
  width: 80%;
  padding: 1em;
  margin-top: 1em;
  margin-left: 1em;
  background-color: #66961d;
  border: 1px solid  #80bc24;
  color: white;
  border-radius: 5px;
`;

const Messages = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CurrentMessageSection = styled.form`
  display: flex;
`;

const CurrentMessageInput = styled.input`
  border: 1px solid green;
  background-color: white;
  color: black;
  flex: 1;
  font-size: 1.2em;
  border-radius: 5px;
`;

