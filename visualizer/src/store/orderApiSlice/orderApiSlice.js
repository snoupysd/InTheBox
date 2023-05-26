import { createSlice, createAction } from "@reduxjs/toolkit";
import { getScannedBox, postBinPacking } from "../../client/client";
import { dimensionEqual } from "../../helper/boxHelper";
import { setCurrentBin, setResponseData } from "../packagingSlice/packagingSlice";

const findById = (arr, id) => {
    return arr.filter(el => el.id === id)[0];
}

const initialState = {
    requestData: {
        items: [
            {
                orderId: 0,
                id: 0,
                x: 144,
                y: 53,
                z: 115,
                count: 1,
                weight: 1,
            },
            {
                orderId: 0,
                id: 1,
                x: 142,
                y: 51,
                z: 92,
                count: 1,
                weight: 1,
            }
        ],
        algorithm: "LARGEST_AREA_FIT_FIRST",
        // TODO set this somewhere
        maxSizes: 5,
    },
    response: {
        data: null,
        loading: null,
        error: null,
    },
}

const fetchDataPending = createAction("orderApi/fetchBinData/pending");
const fetchDataSuccess = createAction("orderApi/fetchBinData/success");
const fetchDataRejected = createAction("orderApi/fetchBinData/rejected");

export const fetchData = () => {

    return (dispatch, getState) => {
        const requestData = getState().api.requestData;
        
        dispatch(fetchDataPending());
        dispatch(setCurrentBin({currentBin: 0}));

        // TODO not postBinPacking, but something else (postOrderAnalysis)
        // axios (?)
        return postBinPacking(requestData).then(
            response => {
                // TODO do something different here as well. Do not communicate with packaging slice
                // dispatch(fetchDataSuccess({data: response.data}));
                // dispatch(setResponseData({data: response.data}));
            },
            error => dispatch(fetchDataRejected({error: error.message})),
        );

    }

}

const orderApiSlice = createSlice({
    name: "orderApi", 
    initialState,
    reducers: {
        // added reducer (first one)
        setMaxSizes(state, action) {
            state.requestData.maxSizes = action.payload;
        },
        setRequestDataAlgorithm(state, action) {
            state.requestData.algorithm = action.payload;
        },
        addRequestDataBox(state, action) {
            const box = action.payload;
            for (let item of state.requestData.items) {
                if (dimensionEqual(item, box)) {
                    item.count++;
                    return;
                }
            }

            state.requestData.items.push({
                // TODO make the box have an orderId
                orderId: box.orderId,
                id: state.requestData.items.length,
                x: box.x,
                y: box.y,
                z: box.z,
                count: 1,
                weight: 1,
            })
        },
        deleteLastRequestBox(state, action) {
            state.requestData.items.pop();
        },
        setRequestDataBoxAttr(state, action) {
            // TODO set orderId as well. What does payload look like?
            const {orderId, id, key, val} = action.payload;
            const item = findById(state.requestData.items, id);
            const parse = parseInt(val)
            item[key] = isNaN(parse) ? 0 : parse;
        },
        setRequestDataBoxes(state, action) {
            state.requestData.items = action.payload;
        },
        resetBoxes(state, action) {
            state.requestData.items = [];
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchDataPending, (state, action) => {
                state.response.loading = true;
            })
            .addCase(fetchDataSuccess, (state, action) => {
                state.response.loading = false;
                state.response.data = action.payload.data;
            })
            .addCase(fetchDataRejected, (state, action) => {
                state.response.loading = false;
                state.response.error = action.payload.error;
            })
    }
});

export default orderApiSlice.reducer;

export const {
    setMaxSizes,
    setRequestDataAlgorithm,
    setRequestDataBinLimit,
    setRequestDataBins,
    setRequestDataBoxes,
    addRequestDataBox,
    setRequestDataBoxAttr,
    setRequestDataBinAttr,
    addEmptyRequestDataBin,
    deleteLastRequestBin,
    deleteLastRequestBox,
    resetBoxes
} = orderApiSlice.actions;

// added selector (first one)
export const selectMaxSizes = state => state.orderApi.requestData.maxSizes;
export const selectRequestDataAlgorithm = state => state.orderApi.requestData.algorithm;
export const selectRequestDataBoxes = state => state.orderApi.requestData.items;
export const selectResponse = state => state.orderApi.response;
export const selectRequestDataBoxById = (state, id) => state.orderApi.requestData.items[id];