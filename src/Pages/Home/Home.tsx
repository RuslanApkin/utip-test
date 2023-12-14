import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import store from "../../Utils/store";
import Table from "./Table";

function Home() {
    const [isFetch, setFetch] = useState(false);

    const fetchData = async () => {
        setFetch(true);
        await store.fetchData("https://swapi.dev/api/people");
        setFetch(false);
    };
    return (
        <div>
            <h1>Table</h1>
            <button onClick={fetchData} disabled={isFetch}>
                {isFetch ? "fetching..." : "Fetch data"}
            </button>
            {store.data.length ? <Table /> : <p>No data</p>}
        </div>
    );
}

export default observer(Home);
