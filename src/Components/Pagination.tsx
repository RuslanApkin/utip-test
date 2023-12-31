import React, { FC, SetStateAction, useEffect, useState } from "react";

import "./Pagination.css";

interface IPagination {
  page: number;
  setPage: React.Dispatch<SetStateAction<number>>;
  pages: number;
}

const Pagination: FC<IPagination> = ({ page, setPage, pages }) => {
  const [pageValue, setPValue] = useState(page + 1 + "");
  const [error, setError] = useState(false);
  useEffect(() => {
    setPValue(page + 1 + "");
  }, [page]);
  return pages > 1 ? (
    <div className="paginationSpacing">
      {pages < 5 ? (
        Array.from(Array(pages).keys()).map((val) => (
          <button
            onClick={() => setPage(val)}
            className={
              "btn paginationSpacing" + (val === page ? " pageBtn--active" : "")
            }
          >
            {val + 1}
          </button>
        ))
      ) : (
        <>
          <button onClick={() => setPage(0)} className="btn paginationSpacing">
            {"<<"}
          </button>
          <button
            onClick={() => (page - 1 >= 0 ? setPage(page - 1) : {})}
            className="btn paginationSpacing"
          >
            {"<"}
          </button>
          <input
            type="number"
            max={pages}
            className={
              "input paginationSpacing pageInput" +
              (error ? " pageInput--error" : "")
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.code === "Enter")
                if (
                  Number(pageValue) - 1 >= 0 &&
                  Number(pageValue) - 1 < pages
                ) {
                  setPage(Number(pageValue) - 1);
                } else {
                  setError(true);
                  setTimeout(() => {
                    setError(false);
                  }, 1000);
                }
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPValue(e.target.value);
            }}
            value={pageValue}
          />
          <span className="paginationSpacing">of {pages}</span>
          <button
            onClick={() => (page + 1 < pages ? setPage(page + 1) : {})}
            className="btn paginationSpacing"
          >
            {">"}
          </button>
          <button
            onClick={() => setPage(pages - 1)}
            className="btn paginationSpacing"
          >
            {">>"}
          </button>
        </>
      )}
    </div>
  ) : (
    <></>
  );
};

export default Pagination;
