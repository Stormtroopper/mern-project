import React from 'react'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'
function GoingBack({ destination = '/' }) {
    return (
        <div className="flex">
            <Link to={destination}>
                <BsArrowLeft className='text-2xl' />
            </Link>
        </div>
    )
}

export default GoingBack