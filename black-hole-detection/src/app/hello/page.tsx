'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Home() {
  const [images, setImages] = useState([])

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/gets-black-hole', {
        method: 'GET',
      })
      if (res.ok) {
        const imgUrl = await res.json()
        setImages(imgUrl)
      } else {
        // Handle error if needed
      }
    } catch (error) {
      // Handle error if fetch fails
      console.error('Failed to fetch images:', error)
    }
  }

  useEffect(() => {
    fetchImages()
  }, []) // Empty dependency array means this effect runs once after the initial render

  const uploadImage = async (e) => {
    // Your existing code for uploading images...
  }

  return (
    <div>
      {images.map((img, index) => (
        <div key={index}>
          <Image
            alt={`Image ${index}`}
            src={img.path}
            width={500}
            height={500}
          />
        </div>
      ))}
    </div>
  )
}
