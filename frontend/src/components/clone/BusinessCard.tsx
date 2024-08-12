import React from 'react'
import { Link } from 'react-router-dom'

interface Business {
    _id: string,
    name: string,
    address: string,
    description: string,
    category: string,
}

const BusinessCard: React.FC<{ business: Business }> = ({ business }) => {
  return (
    <div>
      <h2>{business.name}</h2>
      <p>{business.address}</p>
      <p>{business.description}</p>
      <p>{business.category}</p>
      <Link to={`/business/${business._id}`}>View Details</Link>
    </div>
  )
}

export default BusinessCard;
