import React from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import DatePicker from "react-datepicker";
import { taskType } from "../../types/task";
import { FormControlLabel } from "@mui/material";

type tType = {
  coe: boolean;
  errors: any;
  setFieldValue: (dataName: string, data: Date) => void;
  handleChange: (props: any) => void;
  values: taskType;
};

function AddTask({ errors, setFieldValue, handleChange, values, coe }: tType) {
  return (
    <>
      <div className="bgPaper">
        <div className="inputBox">
          <p className="errormsg">{errors.id}</p>
          <h3>表單編號</h3>
          <TextField
            label="XX-XXX"
            name="id"
            value={values.id}
            onChange={handleChange}
            variant="outlined"
            disabled={!coe}
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
            label="坪数"
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
            id="outlined-basic"
            value={values.pValue}
            name="pValue"
            label="坪單價"
            onChange={handleChange}
            variant="outlined"
          />
        </div>

        <div className="inputBox">
          <h3>工程</h3>
          <p className="errormsg"> {errors.adapt}</p>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="adapt"
            value={values.adapt}
            onChange={handleChange}
          >
            <FormControlLabel value="新店" control={<Radio />} label="新店" />
            <FormControlLabel value="改裝" control={<Radio />} label="改裝" />
          </RadioGroup>
        </div>

        <div className="inputBox">
          <h3>開工日期</h3>
          <p className="errormsg">{errors.startDate}</p>
          <DatePicker
            placeholderText="2077/1/1"
            className="datePicker"
            selected={values.startDate}
            name="startDate"
            onChange={(date: Date) => {
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
            onChange={(date: Date) => {
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
            onChange={(date: Date) => {
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
            onChange={(date: Date) => {
              setFieldValue("createAt", date);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default AddTask;
