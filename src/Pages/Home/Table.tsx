import React, { useState } from "react";

import store from "../../Utils/store";
import Modal from "../../Components/Modal";

export const tableConfig = {
  columns: 5,
  columnHeaders: ["Name", "Height", "Mass", "Gender", "Hair color"],
  columnKeys: ["name", "height", "mass", "gender", "hair_color"]
};

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
    document.body.style.overflow = "visible";
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            {tableConfig.columnHeaders.map((title, index) => (
              <th>
                {title}{" "}
                <button
                  onClick={() => store.sortData(tableConfig.columnKeys[index])}
                >
                  C
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {store.data.map((item: any) => {
            return (
              <tr>
                {tableConfig.columnKeys.map((key: string) => {
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
        delete row
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
