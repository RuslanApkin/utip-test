import React, { useState } from "react";

import store, { tableConfig } from "../../Utils/store";
import Modal from "../../Components/Modal";
import "./Table.css";

function Table() {
  const [modal, setModal] = useState<{ show: boolean; id: number }>({
    show: false,
    id: -1
  });
  const deleteItem = (id: number) => {
    setModal({ show: true, id: id });
  };
  const closeModal = () => {
    setModal({ id: -1, show: false });
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
          {store.data.map((item: any) => {
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
