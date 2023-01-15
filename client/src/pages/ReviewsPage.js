import React, { useContext } from 'react'
import UserContext from '../context/AuthContext'

export default function ReviewsPage({restaurants, allUsers, allReviews, getAllUsers, getAllReviews}) {
    // console.log(allReviews)
    // console.log(restaurants)

    const currentUser = useContext(UserContext)

    console.log(currentUser)

  return (
    <div>
        
    </div>
  )
}
