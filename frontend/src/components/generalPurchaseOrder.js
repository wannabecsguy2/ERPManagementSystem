import {useState} from "react";
import {
    Box,
    Container,
    TextField,
    Grid,
    Card,
    Button,
    Switch,
    CardHeader,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput, FormControl
} from "@mui/material";
import {DataGrid, GridRowModes} from "@mui/x-data-grid";
import {DesktopDatePicker} from '@mui/x-date-pickers'

const GeneralPurchaseOrder = (props) => {
    const {
        type,
        upsert,
        handleSubmit,
        AllSupDets, setAllSupDets,
        SelectedSup, setSelectedSup,
        RawMats, setRawMats,
        SelectedRawMats, setSelectedRawMats,
        DocNo, setDocNo,
        DocDate, setDocDate,
        DelDate, setDelDate,
        populateDdl, handleDdlChange,
        populateMatDdl, handleMatDdlChange,
        columns, rows, getRowId, onCellEditCommit, processRowUpdate,
    } = {...props}
    return (
        <Card
            variant="outline"
            sx={{margin: "10px", padding: "10px", borderRadius: "5px", display: "inline-block"}}
        >
            <CardHeader
                title={upsert + " " + type}
                sx={{backgroundColor: "#4ABDAC", borderRadius: "5px", color: "white"}}
            />
            <Box
                component="form"
                onSubmit={handleSubmit}
                width="80rem"
                sx={{display: "flex"}}
            >
                <Grid container spacing={3} sx={{marginTop: "8px", marginLeft: "8px"}}>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                id="docNo"
                                label="Document Number"
                                fullWidth
                                value={DocNo}
                                onChange={(event) => {setDocNo(event.target.value);}}
                            ></TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <DesktopDatePicker
                                required
                                label="Document Date"
                                value={DocDate}
                                onChange={(newValue) => setDocDate(newValue)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="supplier-name-label">Select Supplier</InputLabel>
                            <Select
                                required
                                labelId="supplier-name-label"
                                id="supplier-name-select"
                                onChange={handleDdlChange}
                                input={<OutlinedInput label="Select Supplier" />}
                            >
                                {AllSupDets.map((item) => (
                                    <MenuItem key={item.SM_ID} value={item.SM_NAME}>
                                        {item.SM_NAME}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id='supplier-material-label'>Select Raw Material</InputLabel>
                            <Select
                                labelId="supplier-material-label"
                                id="supplier-material-select"
                                multiple
                                value={SelectedRawMats}
                                onChange={handleMatDdlChange}
                                input={<OutlinedInput label="Select Raw Material" />}
                                renderValue={(selected) => selected.join(", ")}
                            >
                                {populateMatDdl()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <DataGrid columns={columns} rows={rows}
                                getRowId={getRowId} onCellEditCommit={onCellEditCommit}
                                processRowUpdate={processRowUpdate} onProcessRowUpdateError={(error) => console.log(error)}
                                editMode="cell"
                            ></DataGrid>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <DesktopDatePicker
                                required
                                label="Delivery Date"
                                value={DelDate}
                                onChange={(newValue) => setDelDate(newValue)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-end"}}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{backgroundColor:"#4ABDAC", ":hover":{bgcolor:"darkgreen"}, height: 40}}
                        >Submit</Button>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
}

export default GeneralPurchaseOrder