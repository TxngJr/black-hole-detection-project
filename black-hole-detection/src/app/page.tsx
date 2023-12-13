'use client'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Button from '@/components/Button';
import AleartMessage from '@/components/AleartMessage';
import TableLatLng from '@/components/TableLatLng';

interface holdImages {
  _id: string
  path?: string
  position?: {
    lat?: number
    lng?: number
  }
}

interface positionHold {
  lat?: number
  lng?: number
}

export default function Home() {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAYo9E_FaMLIjTtPbqO4UGCcCgJm9P3xc0"
  })

  const [holdImages, setHoldImages] = useState<holdImages[]>([
    {
      _id: "null",
      path: "null",
      position: {
        lat: 0,
        lng: 0
      }
    }
  ])
  const [holdImage, setHoldImage] = useState<holdImages | any>("")
  const [message, setMessage] = useState<string>("")
  const [table, setTable] = useState<boolean>(false)

  const onLoad = useCallback(function callback(map: object | any) {
    const bounds = new google.maps.LatLngBounds();
    bounds.extend({ lat: 15.2448, lng: 104.8473 })
    map.fitBounds(bounds);
  }, [])

  const fetchHoldImages = async () => {
    try {
      const res = await fetch('/api/gets-black-hole', {
        method: 'GET',
      })
      const data = await res.json()

      if (res.status != 200) {
        setMessage(data.message)
        setHoldImages([
          {
            _id: "",
            path: "",
            position: {
              lat: 0,
              lng: 0
            }
          }
        ])
        return
      }
      setHoldImages(data)
    } catch (error) {
      return
    }
  }

  const deleteHoldImage = async (path: string) => {
    try {
      const res = await fetch(`/api/delete-black-hole?path=${path}`, {
        method: 'GET',
      })
      const data = await res.json();
      setHoldImage("")
      setMessage(data.message)
      fetchHoldImages()
    } catch (error) {
      return
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchHoldImages()
    }, 3000);
    return () => clearInterval(interval);
  }, [])

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={{
          width: '100vw',
          height: '100vh'
        }}
        onLoad={onLoad}
      >
        <div style={{
          position: 'absolute',
          bottom: '50px',
          left: '20px',
        }}>
          <Button
            onClick={() => setTable(!table)}
            backgroundColor={table ? "#f44336" : "#03adfc"}
            fontSize="24px"
            buttonText={table ? "Close" : "Open Table"}
          />
        </div>
        {table &&
          <TableLatLng
            holds={holdImages}
          />}
        {message &&
          <AleartMessage message={message} />
        }
        {holdImages?.map((holdImage: holdImages | any) => (
          <Marker
            key={holdImage?._id}
            position={holdImage!.position}
            onClick={() => { setHoldImage(holdImage) }}
          />
        ))}
        {holdImage && (
          <div className="modal-overlay" onClick={() => setHoldImage("")}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <Button
                onClick={() => deleteHoldImage(holdImage._id)}
                backgroundColor="#f44336"
                fontSize="24px"
                buttonText="Delete"
              />
              <Image
                alt={`Image ${holdImage._id}`}
                src={`data:image/png;base64,${holdImage.path}`}
                width={500}
                height={500}
                onClick={() => setHoldImage("")}
              />
              <div style={{ display: "flex", position: "fixed", width: 500, justifyContent: "center" }}>
                <h1 style={{ color: "#000000", marginRight: 250 }}>lat {holdImage.position.lat}</h1>
                <h1 style={{ color: "#000000" }}>lng {holdImage.position.lng}</h1>
              </div>
              <button onClick={() => setHoldImage("")}>Close</button>
            </div>
          </div>
        )}
      </GoogleMap>
      <style jsx>{`

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.2);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Style for the modal content */
        .modal-content {
          background-color: white;
          padding: 20px;
          border-radius: 5px;
          text-align: center;
        }
      `}</style>
    </div>
  ) : <></>
}