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
  
 & > h2 {
     color:#125C13;
     font-size: 30px;
     
 }
 & > h2:hover{
   transform: scale(1.07);
   color: #269b28;
 }

`;

export const Button = styled.button`
width:30%;
background-color: #60c520;
padding: 5px 7px;
color: white;
border-radius: 15px;
font-size:16px;
border: none;
margin:10px;

&:hover{
    transform: scale(1.05);
    box-shadow: 3px 3px 3px #60c520 ;
    border-bottom: 1px solid white;
}
`;