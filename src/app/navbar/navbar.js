import Link from 'next/link'
import React from 'react'

function navbar() {
  return (
    <div className="navbar   ">

    <Link href="./" >Home</Link>
    
    <Link href="./addschool">Add School</Link>
      
    </div>
    
    //  navbar
  )
}

export default navbar
