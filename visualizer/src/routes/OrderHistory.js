import { FormControl, InputLabel, Select, MenuItem, Input, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetBoxes, selectRequestDataAlgorithm, setRequestDataAlgorithm, selectRequestDataMaxSizes, setRequestDataMaxSizes } from "../store/orderApiSlice/orderApiSlice";
import { DynamicFormReduxOrderApi } from "../view/DynamicForm/DynamicFormReduxOrderApi";

export function OrderHistory() {
    const algorithm = useSelector(selectRequestDataAlgorithm);
    const maxSizes = useSelector(selectRequestDataMaxSizes);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = () => {
        let numeralMaxSizes;
        try {
            numeralMaxSizes = parseInt(maxSizes);
        } catch (e) {
            alert("Max sizes has to be a number")
            return;
        }
        dispatch(setRequestDataMaxSizes(numeralMaxSizes));

        //dispatch(resetBoxes());
        // TODO navigate elsewhere
        // navigate("/boxes-loading");
    }

    return (<>
        <FormControl fullWidth sx={{ marginBottom: "1%" }}>
            <InputLabel id="demo-simple-select-label">Algorithm Strategy</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={algorithm}
                label="Algorithm Strategy"
                onChange={(event) => dispatch(setRequestDataAlgorithm(event.target.value))}
            >
                <MenuItem value={'LARGEST_AREA_FIT_FIRST'}>Largest Area Fit First</MenuItem>
                <MenuItem value={'BRUTEFORCE'}>Brute Force</MenuItem>
            </Select>
        </FormControl>

        <>
            <Typography>Maximal number of different sizes:</Typography>
            <Input value={maxSizes} onChange={(event) => dispatch(setRequestDataMaxSizes(event.target.value))} />
        </>

        <DynamicFormReduxOrderApi title={"Specify Bins"} onSubmit={onSubmit} />
    </>);
}