import React, { useEffect, useState } from "react";

const tableConfig = {
    columns: 5,
    columnHeaders: ["Name", "Height", "Mass", "Gender", "Hair color"],
    columnKeys: ["name", "height", "mass", "gender", "hair_color"]
};

type TData = {
    count: number;
    next: string;
    prev: string;
    results: Array<any>;
};

function Home() {
    const [data, setData] = useState<TData>();
    const [isFetch, setFetch] = useState(false);
    const fetchData = async () => {
        setFetch(true);
        await fetch(`https://swapi.dev/api/people`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    );
                }
                return response.json();
            })
            .then((fetched) => setData(fetched))
            .catch((err) => {
                console.log(err.message);
            });
        setFetch(false);
    };
    return (
        <div>
            <h1>Table</h1>
            <button onClick={fetchData} disabled={isFetch}>
                Fetch data
            </button>
            {data ? (
                <>
                    <table>
                        <thead>
                            <tr>
                                {tableConfig.columnHeaders.map((title) => (
                                    <th>{title}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.results.map((item) => {
                                return (
                                    <tr>
                                        {tableConfig.columnKeys.map((key) => {
                                            return <td>{item[key]}</td>;
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <button
                        onClick={() => {
                            setData(undefined);
                        }}
                    >
                        Clear
                    </button>
                </>
            ) : isFetch ? (
                <p>fetching...</p>
            ) : (
                <p>No data</p>
            )}
        </div>
    );
}

export default Home;
