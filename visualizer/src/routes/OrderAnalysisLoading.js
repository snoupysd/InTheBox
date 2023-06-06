import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectResponse } from "../store/orderApiSlice/orderApiSlice";
import { Button } from "@mui/material";

export function OrderAnalysisLoading(props) {
    const response = useSelector(selectResponse);
    const navigate = useNavigate();

    // important to put navigation logic inside useEffect
    // navigation logic shouldn't be inside rendering functiong
    React.useEffect(() => {
        if (response.data && response.data.success) {
            navigate("/orderAnalysis-result");
        }
    }, [response.data, navigate]);

    let content = null;
    if (response.loading) {
        content = (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress size={100} />
                <Typography sx={{ margin: "1%" }}>Loading Order Analysis</Typography>
            </div>
        );
    } else if (response.data) {
        if (!response.data.success) {
            content = (
                <>
                    <Typography sx={{ margin: 3 }}>
                        An error occurred when trying to analyze the order history.
                    </Typography>

                    <Button
                        variant="contained"
                        onClick={() => navigate("/order-history")}
                        sx={{ margin: 3 }}
                    >
                        Back to input
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => navigate("/")}
                        sx={{ margin: 3 }}
                    >
                        Back to home
                    </Button>
                </>
            );
        }
    } else if (response.error) {
        content = <>Error occurred: {response.error}</>;
    } else {
        content = (
            <>
                <Typography>Invalid State</Typography>
                <Button variant="contained" onClick={() => navigate("/")}>
                    Back to home
                </Button>
            </>
        );
    }

    return content;
}
