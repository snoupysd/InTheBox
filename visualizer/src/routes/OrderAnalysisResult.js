import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { selectResponse } from "../store/orderApiSlice/orderApiSlice";

import { Typography, Card, CardActions, CardContent, CardMedia, Grid, Container, Button } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useState } from 'react'


export function OrderAnalysisResult() {
    const response = useSelector(selectResponse);
    const data = response.data
    const navigate = useNavigate();
    const [numberBoxes, setNumberBoxes] = useState(1);


    if (!data || !data.binRecommandations || data.binRecommandations.length === 0) {
        return <Box sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Typography sx={{ fontSize: "2rem", fontWeight: "700" }} align="center" color="textPrimary" gutterBottom>
                No Data Available
            </Typography>
            <Button variant="contained" onClick={() => navigate("/")} sx={{ marginTop: '20px'}}>Back Home</Button>
        </Box>;
    }

    // case data available
    const binRecommandations = response.data.binRecommandations
    const currentRecommandation = binRecommandations[numberBoxes]

    return (<>
        <Box
            sx={{
                backgroundColor: 'background.paper',
            }}>
            <Container maxWidth="md" >
                <Typography sx={{ fontSize: "2rem", fontWeight: "700" }} align="center" color="textPrimary" gutterBottom>
                    Order Analysis Result
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    text here?
                </Typography>
                <Box
                    sx={{
                        marginTop: '40px',
                    }}>
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item>
                            <Button variant="contained" onClick={() => setNumberBoxes(numberBoxes - 1)} disabled={numberBoxes <= 1}>
                                {"<<"}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4">Using {numberBoxes} size{numberBoxes > 1 ? "s" : ""} </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={() => setNumberBoxes(numberBoxes + 1)} disabled={numberBoxes >= binRecommandations.length - 1}>
                                {">>"}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
        <Container sx={{ padding: '20px 0' }} maxWidth="md">
            <Grid container spacing={4}>
                {currentRecommandation.bins.map((bin, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card
                            xs={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                            <CardMedia
                                sx={{ paddingTop: '56.25%' }}
                                image="https://source.unsplash.com/random"
                                title="box"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>

                                <Typography>
                                    x: {bin.x} <br /> y: {bin.y} <br /> z: {bin.z}
                                </Typography>
                                <CardActions>
                                    <Button size="small" color="primary">See online</Button>
                                </CardActions>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" onClick={() => navigate("/")} sx={{ marginTop: '20px' }}>Back Home</Button>
        </Container>
    </>)
}