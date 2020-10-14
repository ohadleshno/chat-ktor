import React from 'react';
import styled from "styled-components";


const rooms = ["Aba", "Ganuv", "Stolen"]

function RoomSelect({room, selectRoom,}) {

    return (
        <Wrapper>
            <h1>Select Room</h1>
            {rooms.map(i => <RoomSelectButton2 isActive={room === i} key={i} onClick={() => selectRoom(i)}>
                {i}
            </RoomSelectButton2>)}
        </Wrapper>
    );
}

export default RoomSelect;

const Wrapper = styled.div`
  width: 10%;
  padding: 1em;
  color:white;
  background-color: #3369ff;
`;

const RoomSelectButton = styled.button`
display:inline-block;
padding:0.5em 3em;
border:0.16em solid #FFFFFF;
margin:0 0.3em 0.3em 0;
box-sizing: border-box;
text-decoration:none;
font-family:'Roboto',sans-serif;
font-weight:400;
background-color: ${({isActive}) => isActive ? `green` : 'unset'};
color:#FFFFFF;
text-align:center;
transition: all 0.15s;
width: 100%;
  
  
  &:hover
  {
  color:#DDDDDD;
  border-color:#DDDDDD;

  }
`;

const RoomSelectButton2 = styled.button`
display:inline-block;
padding:0.7em 1.4em;
outline: none;
border: none;
width: 100%;
font-size: 1.2em;
margin:0.4em 0.3em 0.3em 0;
border-radius:0.15em;
box-sizing: border-box;
text-decoration:none;
font-weight:400;
font-family: 'Montserrat', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
color:#FFFFFF;
background-color: ${({isActive}) => isActive ? `rgba(0, 0, 0, 0.17)` : 'unset'};

box-shadow:inset 0 -0.6em 0 -0.35em rgba(0,0,0,0.17);
text-align:center;
position:relative;
&:hover{
 background-color: rgba(0,0,0,0.17);
}
`
