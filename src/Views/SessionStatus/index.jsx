import React from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function SessionStatus() {
  const navigate = useNavigate();

  return (
    <>
    <div>SessionStatus</div>
    <Button onClick={()=>{navigate("/")}}>Click Me</Button>
    </>
  )
}
