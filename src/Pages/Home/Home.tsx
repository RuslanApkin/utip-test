import React, { useEffect, useState } from 'react'

function Home() {
    const [data, setData] = useState();
    const fetchData = () => {

    }
    return (
    <div>
        <h1>Table</h1>
        <button>Fetch data</button>
        {
            data ? <table></table> : <p>No data"</p>
            }
    </div>
  )
}

export default Home