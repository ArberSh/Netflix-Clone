import React from 'react'

interface HomePageProps {
  FirstName: string;
  LastName: string;
}

function HomePage({ FirstName, LastName }: HomePageProps) {
  return (
    <div>This is yourrrr ....{FirstName + ' ' + LastName}</div>
  )
}

export default HomePage;