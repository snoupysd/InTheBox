import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { selectResponse } from "../store/orderApiSlice/orderApiSlice";
import { Item } from "../helper/styleHelper";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


export function OrderAnalysisResult() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (<>
        <div style={{ display: 'grid', gridTemplateColumns: '10% 10% 10%', columnGap: "35%" }}>
            <h1>Order Analysis Result</h1>
            <Button variant="contained" onClick={() => navigate("/")}>Back Home</Button>

        </div>

    </>);
}