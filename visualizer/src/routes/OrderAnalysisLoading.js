import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectResponse } from "../store/orderApiSlice/orderApiSlice";
import { Button } from '@mui/material';

export function OrderAnalysisLoading(props) {
    const response = useSelector(selectResponse);
    const navigate = useNavigate();
    
    let content = null;
    if (response.loading) {
        content = <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}>
            <CircularProgress size={100}/> 
            <Typography sx={{margin: "1%"}}>Loading Order Analysis</Typography>
        </div>;
    } else if (response.data) {
        if (!response.data.success) {
            content = <>
                <Typography sx={{margin: 3}}>An error occured when trying to analyse the order history.</Typography>
                
                <Button variant="contained" onClick={() => navigate("/bin-input")} sx={{margin: 3}}>
                    Back to input
                </Button>
                
                <Button variant="contained" onClick={() => navigate("/")} sx={{margin: 3}}>
                    Back to home
                </Button>
            </>
        } else {
            content = <h1>Redirect</h1>
            // TODO navigate
        }
    } else if (response.error) {
        content = <>{`Error occurred: ${response.error}`}</>;
    } else {
        content = <>
                <Typography>Invalid State</Typography>
                <Button variant="contained" onClick={() => navigate("/")}>
                    Back to home
                </Button>
            </>
    }

    return content;
}   