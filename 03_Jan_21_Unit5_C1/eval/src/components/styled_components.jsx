import styled from "styled-components"

export const Input = styled.input`
padding: 0.5em;
margin: 0.5em;
width: 80%;
color: #009b00;
background: papayawhip;
border: none;
border-radius: 3px;

`;

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  border: 5px solid #CAC1B9;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const Div1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  width: 30%;
  border: 5px solid #CAC1B9;
  border-radius: 10px;
  overflow-y: scroll;  
 & > li {
   color: #ffae17;
   margin-left:10px;
 }
 &> li:hover {
   color: white;
   padding:5px;
   background-color: #ffa600;
   border-radius: 5px;
 }

`;