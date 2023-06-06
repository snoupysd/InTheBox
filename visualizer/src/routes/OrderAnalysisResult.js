import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { selectResponse } from "../store/orderApiSlice/orderApiSlice";


import { Item } from "../helper/styleHelper";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


export function OrderAnalysisResult() {
    const response = useSelector(selectResponse);
    const data = response.data
    const navigate = useNavigate();

    if (!data || !data.binRecommandations || data.binRecommandations.length === 0) {
        return <div>No data available.</div>;
    }

    return (<>
        <Typography sx={{ fontSize: "2rem", fontWeight: "700" }}>Order Analysis Result</Typography>
        <div>
            {data.binRecommandations.map((recommendation, index) => (
                <div key={index}>
                    {recommendation && (
                            <>
                            <h2>Using {index} different sizes</h2>
                            <ul>
                                {recommendation.bins.map((bin, binIndex) => (
                                    <li key={binIndex}>
                                        <h3>Bin {binIndex}</h3>
                                        <p>x: {bin.x}</p>
                                        <p>y: {bin.y}</p>
                                        <p>z: {bin.z}</p>
                                    </li>
                                ))}
                            </ul>
                            </>
                    )}

                </div>

            ))}
        </div>
        <Button variant="contained" onClick={() => navigate("/")}>Back Home</Button>
    </>);
}