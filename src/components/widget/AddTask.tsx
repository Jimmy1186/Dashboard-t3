import React from "react";
import TextField from "@mui/material/TextField";


import DatePicker from "react-datepicker";

type taskType = {
  errors: any;
  setFieldValue: (dataName: string, data: Date) => void;
  handleChange: (props: any) => void;
  values: any;
};

function AddTask({ errors, setFieldValue, handleChange, values }: taskType) {
  return (
    <>
      <div className="bgPaper inputWrapper">
        <div className="inputBox">
          <p className="errormsg">{errors.task_name}</p>

          <TextField
          fullWidth
            id="outlined-basic"
            name="task_name"
            label="工事名"
            onChange={handleChange}
            variant="outlined"
          />
        </div>

        <div className="inputBox">
          <p className="errormsg">{errors.p}</p>
          <TextField
            fullWidth
            type="number"
            id="outlined-basic"
            name="p"
            label="坪数"
            onChange={handleChange}
            variant="outlined"
          />
        </div>

        <div className="inputBox">
          <p className="errormsg"> {errors.pValue}</p>
          <TextField
            fullWidth
            type="number"
            onChange={handleChange}
            name="pValue"
            label="坪單價"
          />
        </div>

        <div className="inputBox">
          <h3>開工日期</h3>
          <p className="errormsg">{errors.startDate}</p>
          <DatePicker
          placeholderText="2077/1/1"
            className="datePicker"
            selected={values.startDate}
            name="startDate"
            onChange={(date: any) => {
              setFieldValue("startDate", date);
            }}
          />
        </div>

        <div className="inputBox">
          <h3>完工日期</h3>
          <p className="errormsg">{errors.endDate}</p>
          <DatePicker
           placeholderText="1925/3/5"
            className="datePicker"
            selected={values.endDate}
            name="endDate"
            onChange={(date: any) => {
              setFieldValue("endDate", date);
            }}
          />
        </div>

        <div className="inputBox">
          <h3>開幕日</h3>
          <p className="errormsg">{errors.open}</p>
          <DatePicker
           placeholderText="1972/7/2"
            className="datePicker"
            selected={values.open}
            name="open"
            onChange={(date: any) => {
              setFieldValue("open", date);
            }}
          />
        </div>

        <div className="inputBox">
          <h3>做成日</h3>
          <p className="errormsg">{errors.createAt}</p>
          <DatePicker
            className="datePicker"
            selected={values.createAt}
            name="createAt"
            onChange={(date: any) => {
              setFieldValue("createAt", date);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default AddTask;
