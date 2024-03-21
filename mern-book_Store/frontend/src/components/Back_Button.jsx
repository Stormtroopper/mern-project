import React from 'react'
import { Link } from 'react-router-dom';
import { ArrowLeftSquare } from 'lucide-react';
const Back_Button=({ destination = '/' })=> {
  return (
    <div className='flex'>
    <Link
      to={destination} 
    >
      <ArrowLeftSquare className='text-2xl ' />
    </Link>
  </div>
  )
}

export default Back_Button