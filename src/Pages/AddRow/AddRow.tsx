import React, { useState } from "react";
import store, { tableConfig } from "../../Utils/store";
import { TData } from "../../Types";
import Modal from "../../Components/Modal";
import { Navigate, useNavigate } from "react-router-dom";

function AddRow() {
  const formObj: any = { id: -1 };
  tableConfig.rows.forEach(({ key }) => {
    formObj[key] = "";
  });
  const [formInput, setInput] = useState<TData>(formObj);
  const [valid, setValid] = useState(false);
  const [success, setSuccess] = useState(false);
  let navigate = useNavigate();

  const validate = (obj: any): boolean => {
    for (const value in obj) {
      if (obj[value].trim() === "") return false;
    }
    return true;
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formObj: any = formInput;
    formObj[e.target.name] = e.target.value;
    setInput(formObj);
    setValid(validate({ ...formObj, id: "-1" }));
  };

  return (
    <div>
      <h1>AddRow</h1>
      <form
        className=""
        onSubmit={(e) => {
          e.preventDefault();
          store.addRow(formInput);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            navigate("/");
          }, 2000);
        }}
      >
        {tableConfig.rows.map(({ title, key, type }) => (
          <div className="">
            <label>{title}</label>
            <input
              name={key}
              required
              onChange={(e) => onInput(e)}
              type={type}
            ></input>
          </div>
        ))}
        <button type="submit" disabled={!valid}>
          Submit
        </button>
      </form>
      <Modal
        show={success}
        onClose={() => {
          setSuccess(false);
          navigate("/");
        }}
      >
        Row added
      </Modal>
    </div>
  );
}

export default AddRow;
