import React, { FormEvent, useState } from "react";
import store, { tableConfig } from "../../Store/store";
import Modal from "../../Components/Modal";
import { useNavigate } from "react-router-dom";
import "./AddRow.css";

const AddRow = () => {
  const formObj: any = { id: -1 };
  tableConfig.rows.forEach(({ key }) => {
    formObj[key] = "";
  });
  const [formInput, setInput] = useState(formObj);
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
      <h1>Add Row</h1>
      <form
        className="addRowForm"
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
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
          <div className="inputWrapper">
            <label>{title}</label>
            <input
              name={key}
              required
              onChange={(e) => onInput(e)}
              type={type}
              className="input"
            ></input>
          </div>
        ))}
        <button type="submit" disabled={!valid} className="btn addBtn">
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
};

export default AddRow;
