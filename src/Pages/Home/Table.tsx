import React, { useState } from "react";

import store, { tableConfig } from "../../Utils/store";
import Modal from "../../Components/Modal";
import "./Table.css";
import Pagination from "../../Components/Pagination";
import { TData } from "../../Types";

function Table() {
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
    <>
      <table>
        <thead>
          <tr>
            {tableConfig.rows.map(({ title, key }) => (
              <th
                onClick={() => store.sortData(key)}
                className={
                  "theader" + (store.sortedBy === key ? " theader--sorted" : "")
                }
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getRows(page).map((item: any) => {
            return (
              <tr>
                {tableConfig.rows.map(({ key }) => {
                  return <td>{item[key]}</td>;
                })}
                <button onClick={() => deleteItem(item.id)}>delete</button>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        onClick={() => {
          store.clearData();
        }}
      >
        Clear
      </button>
      <Pagination
        page={page}
        setPage={setPage}
        pages={Math.floor((store.count - 1) / tableConfig.rpp) + 1}
      />
      <Modal onClose={() => closeModal()} show={modal.show}>
        <span>delete row</span>
        <button onClick={() => closeModal()}>Cancel</button>
        <button
          onClick={() => {
            store.removeRow(modal.id);
            closeModal();
          }}
        >
          Yes
        </button>
      </Modal>
    </>
  );
}

export default Table;
