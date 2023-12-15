import React, { useState } from "react";
import { tableConfig } from "../Home/Table";
import store from "../../Utils/store";
import { TData } from "../../Types";

function AddRow() {
  const formObj: any = { id: 0 };
  tableConfig.columnKeys.forEach((key: string) => {
    formObj[key] = "";
  });
  const [formInput, setInput] = useState<TData>(formObj);
  const [valid, setValid] = useState(false);

  const validate = (obj: any): boolean => {
    for (const value in obj) {
      if (obj[value].trim() === "") return false;
      console.log(value);
    }
    return true;
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formObj: any = formInput;
    formObj[e.target.name] = e.target.value;
    setInput(formObj);
    setValid(validate({ ...formObj, id: "-1" }));
    console.log(valid);
  };

  return (
    <div>
      <h1>AddRow</h1>
      <form className="" onSubmit={() => store.addRow(formInput)}>
        {tableConfig.columnHeaders.map((title, index) => (
          <div className="">
            <label>{title}</label>
            <input
              name={tableConfig.columnKeys[index]}
              required
              onChange={(e) => onInput(e)}
            ></input>
          </div>
        ))}
        <button type="submit" disabled={!valid}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddRow;
