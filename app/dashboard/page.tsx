'use client'

import { useEffect, useState } from "react";
import StatDisplayCard from "../components/StatDisplayCard";

export default function Dashboard() {

  const [data, setData] = useState(null);
  const [error, setError] = useState<Response>();

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('/api/spotify/top-artists', {
          method: 'GET'
        })
        if (!response.ok) {
          setError(response)
        }
        const data = await response.json();
        setData(data)
        console.log(data)
    }
    fetchData();
  }, [])

  return (
    <>
      <div className="flex">
        <StatDisplayCard title="Streams" content="34" footer="tracks played" iconPath="..." />
      </div>
    </>
  )
}
