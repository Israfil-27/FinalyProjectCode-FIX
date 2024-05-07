import React from 'react'
import { FaStarHalfAlt } from 'react-icons/fa'
import { FaRegStar, FaStar } from 'react-icons/fa6'
import "./Rating.scss"

const Rating: React.FC<{value:number,text:string}> = ({value,text}) => {
  return (
    <div className='start-rating'>
      <div className="stars">
      <span>{ value >=1 ? <FaStar /> : value >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar /> }</span>
      <span>{ value >=2 ? <FaStar /> : value >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar /> }</span>
      <span>{ value >=3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar /> }</span>
      <span>{ value >=4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar /> }</span>
      <span>{ value >=5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar /> }</span>
      </div>
      <p className='rating-text'>{text && text}</p>
    </div>
    
  )
}

export default Rating
