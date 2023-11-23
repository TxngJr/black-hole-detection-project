'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [images, setImages] = useState([])

  const uploadImage = async (e: any) => {
    const imageFile = e.target.files[0]

    const res = await fetch('/api/upload-black-hole', {
      method: 'POST',
      body: imageFile
    })

    const imgUrl = await res.json()
    setImages([...images, imgUrl] as any)
  }

  return (
    <div>
      <input
        type="file"
        onChange={uploadImage}
      />

      {images.map(img => (
        <Image
          alt={img}
          src={img}
          width={500}
          height={500}
        />
      ))}

    </div>
  )
}