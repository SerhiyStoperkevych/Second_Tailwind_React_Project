import React, { useEffect, useState } from 'react'
import api from './api'
import BusinessCard from './BusinessCard'

interface Business {
  _id: string,
  name: string,
  address: string,
  description: string,
  category: string,
};

const BusinessList: React.FC = () => {

  const [businesses, setBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await api.get('/business');
        setBusinesses(response.data);
      } catch (error) {
        console.error("Failed to fetch businesses", error)
      }
    };

    fetchBusinesses();
  }, []);

  return (
    <div>
      {businesses.map((business) => (
        <BusinessCard key={business._id} business={business} />
      ))}
    </div>
  )
}

export default BusinessList
