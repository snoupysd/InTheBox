import React from 'react';
import { Box, Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import BinThreeJS from './BinThreeJS';

export default function BinCard({ bin }) {

    return (
        <Card>
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <BinThreeJS bin={bin} width={250} height={250} />
                </Box>
                <Typography>
                    x: {bin.x} <br />
                    y: {bin.y} <br />
                    z: {bin.z}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    See online
                </Button>
            </CardActions>
        </Card>
    );
};

