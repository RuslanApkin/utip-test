import React, { useState } from "react";

import store, { tableConfig } from "../Store/store";
import Modal from "./Modal";
import "./Table.css";
import Pagination from "./Pagination";
import { TData } from "../Types";

const Table = () => {
  const [modal, setModal] = useState<{ show: boolean; id: number }>({
    show: false,
    id: -1
  });

  const [page, setPage] = useState(0);

  const deleteItem = (id: number) => {
    setModal({ show: true, id: id });
  };
  const closeModal = () => {
    setModal({ id: -1, show: false });
  };
  const getRows = (page: number): TData[] => {
    return store.data.slice(
      page * tableConfig.rpp,
      (page + 1) * tableConfig.rpp
    );
  };
  return (
    <div className="tableWrapper">
      <table>
        <thead>
          <tr>
            {tableConfig.rows.map(({ title, key }) => (
              <th>
                <button
                  onClick={() => store.sortData(key)}
                  className={
                    "theader" +
                    (store.sortedBy === key ? " theader--sorted" : "")
                  }
                >
                  {title}
                </button>
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {getRows(page).map((item: any) => {
            return (
              <tr>
                {tableConfig.rows.map(({ key }) => {
                  return <td>{item[key]}</td>;
                })}
                <td>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="tDeleteBtn"
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        onClick={() => {
          store.clearData();
        }}
        className="btn"
      >
        Clear
      </button>
      <Pagination
        page={page}
        setPage={setPage}
        pages={Math.floor((store.count - 1) / tableConfig.rpp) + 1}
      />
      <Modal onClose={() => closeModal()} show={modal.show}>
        <p className="deleteModalP">Delete row?</p>
        <div className="modalBtnWrapper">
          <button onClick={() => closeModal()} className="btn">
            Cancel
          </button>
          <button
            onClick={() => {
              store.removeRow(modal.id);
              closeModal();
            }}
            className="btn"
          >
            Yes
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Table;
