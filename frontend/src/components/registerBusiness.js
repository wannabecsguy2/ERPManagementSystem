import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card"
import {useState} from "react";
import {CardHeader, FormControl, FormGroup, InputAdornment, InputLabel, OutlinedInput, Select} from "@mui/material";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import {DataGrid} from "@mui/x-data-grid";

const RegisterBusiness = (props) => {
    const {
        type,
        upsert,
        Name, setName,
        DelAdd, setDelAdd,
        SerAdd, setSerAdd,
        Email, setEmail,
        PhoneNo, setPhoneNo,
        GstNo, setGstNo,
        GstDetails, setGstDetails,
        ItemDetails, setItemDetails,
        setItems,
        SelectedItems, setSelectedItems,
        handleSubmit,
        populateDdl,
        handleDdlChange,
        columns,
        rows,
        getRowId,
    } = {...props}
    const [EmailError, setEmailError] = useState(false);
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const helperEmail = (emailError) => {
        if(emailError){
            return "Invalid Format";
        } else {
            return null
        }
    }

    return(
        <Card
            variant="outlined"
            sx={{margin:"10px", padding:"10px", borderRadius:"5px", display:"inline-block"}}
        >
            <CardHeader
                title={upsert + " " + type}
                sx={{backgroundColor:"#4ABDAC", borderRadius:"5px", color:"white"}}
            ></CardHeader>
            <Box
                component="form"
                onSubmit={handleSubmit}
                width="60rem"
                sx={{display:"flex"}}
            >
                <Grid container spacing={3} sx={{marginTop:"8px", marginLeft:"8px"}}>
                    <Grid item xs={3}>
                        <TextField
                            required
                            id="name"
                            label="Name of the Business"
                            size="small"
                            margin="dense"
                            fullWidth
                            value={Name}
                            onChange={(e) => {setName(e.target.value);}}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            error={EmailError}
                            required
                            id="email"
                            label="Email-ID"
                            size="small"
                            margin="dense"
                            fullWidth
                            helperText={helperEmail(EmailError)}
                            onChange={(e) => {setEmail(e.target.value); setEmailError(!validateEmail(Email))}}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            required
                            id="phone"
                            label="Phone No."
                            size="small"
                            margin="dense"
                            fullWidth
                            value={PhoneNo}
                            onChange={(e) => {setPhoneNo(e.target.value);}}
                            inputProps={{maxLength: 10}}
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            required
                            id="delAdd"
                            label="Delivery Address"
                            size="small"
                            margin="dense"
                            fullWidth
                            multiline
                            value={DelAdd}
                            onChange={(e) => {setDelAdd(e.target.value);}}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            required
                            id="serAdd"
                            label="Service Address"
                            size="small"
                            margin="dense"
                            fullWidth
                            multiline={true}
                            value={SerAdd}
                            onChange={(e) => {setSerAdd(e.target.value);}}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Switch onChange={(e) => {if(e.target.value === "on"){setSerAdd(DelAdd);}}} checked={DelAdd === SerAdd}/>
                                    </InputAdornment>
                                ),
                            }}
                        />

                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            required
                            id="gstNo"
                            label="GST NO."
                            size="small"
                            margin="dense"
                            fullWidth
                            value={GstNo}
                            onChange={(e) => {setGstNo(e.target.value);}}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="ddlLabel">Items</InputLabel>
                            <Select
                                labelId="ddlLabel"
                                multiple
                                value={SelectedItems}
                                onChange={handleDdlChange}
                                input={<OutlinedInput label="Items" />}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {populateDdl()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{marginTop:"9px", backgroundColor:"#4ABDAC", ":hover":{bgcolor:"darkgreen"}}}
                        >Submit</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <DataGrid
                            columns={columns}
                            rows={rows}
                            getRowId={getRowId}
                        >
                        </DataGrid>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    )
}

export default RegisterBusiness;