import React from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function SessionManagement() {
  const navigate = useNavigate();

  return (
    <>
    <div>SessionManagement</div>
    <Button onClick={()=>{navigate("session=status")}}>Click Me</Button>
    </>
  )
}
