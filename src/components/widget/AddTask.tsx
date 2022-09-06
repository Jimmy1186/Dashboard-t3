import React from "react";
import TextField from "@mui/material/TextField";

import DatePicker from "react-datepicker";
import { taskType } from "../../types/task";

type tType = {
  errors: any;
  setFieldValue: (dataName: string, data: Date) => void;
  handleChange: (props: any) => void;
  values: taskType;
};

function AddTask({ errors, setFieldValue, handleChange, values }: tType) {
  // console.log(values)
  return (
    <>
      <div className="bgPaper inputWrapper">
        <div className="inputBox">
        <p className="errormsg">{errors.id}</p>
          <h3>表單編號</h3>
          <TextField
            label="XX-XXX"
            name="id"
            value={values.id}
            onChange={handleChange}
            variant="outlined"
          />
        </div>
        <div className="inputBox">
          <h3>工事名</h3>
          <p className="errormsg">{errors.task_name}</p>
          <TextField
            fullWidth
            id="outlined-basic"
            value={values.task_name}
            name="task_name"
            label="工事名"
            onChange={handleChange}
            variant="outlined"
          />
        </div>

        <div className="inputBox">
          <h3>坪数</h3>
          <p className="errormsg">{errors.p}</p>
          <TextField
            fullWidth
            type="number"
            id="outlined-basic"
            value={values.p}
            name="p"
            label={values.p}
            onChange={handleChange}
            variant="outlined"
          />
        </div>

        <div className="inputBox">
          <h3>坪單價</h3>
          <p className="errormsg"> {errors.pValue}</p>
          <TextField
            fullWidth
            type="number"
            onChange={handleChange}
            value={values.pValue}
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
          <p className="errormsg">{errors.openDate}</p>
          <DatePicker
            placeholderText="1972/7/2"
            className="datePicker"
            selected={values.openDate}
            name="openDate"
            onChange={(date: any) => {
              setFieldValue("openDate", date);
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
