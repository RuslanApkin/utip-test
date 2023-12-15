import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import store from "../../Utils/store";
import Table from "./Table";

function Home() {
  const [isFetch, setFetch] = useState(false);
  const [fetching, setFetching] = useState(0);
  const fetchingStates = ["fetching.  ", "fetching.. ", "fetching..."];

  useEffect(() => {
    if (isFetch)
      setTimeout(() => {
        setFetching((prevState) => (prevState + 1) % 3);
      }, 500);
    console.log(fetchingStates[fetching]);
  }, [isFetch, fetching]);

  const fetchData = async () => {
    setFetch(true);
    await store.fetchData("https://swapi.dev/api/people");
    setFetch(false);
  };
  return (
    <div>
      <h1>Table</h1>
      <button onClick={fetchData} disabled={isFetch}>
        {isFetch ? fetchingStates[fetching] : "Fetch data"}
      </button>
      {store.data.length ? <Table /> : <p>No data</p>}
    </div>
  );
}

export default observer(Home);
