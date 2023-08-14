import {getAllRawMaterials, registerSupplier} from "../services/registerSupplier.service";
import axiosInstance from "../utils/axiosInstance";
import {useState, useEffect} from "react";
import Card from "@mui/material/Card";
import {
    CardHeader,
    FormControl,
    InputAdornment,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import {DataGrid} from "@mui/x-data-grid"
import Checkbox from "@mui/material/Checkbox";
import RegisterBusiness from "../components/registerBusiness";

const RegisterSupplier = () => {
    const [Name, setName] = useState("");
    const [DelAdd, setDelAdd] = useState("");
    const [SerAdd, setSerAdd] = useState("");
    const [Email, setEmail] = useState("");
    const [PhoneNo, setPhoneNo] = useState("");
    const [GstNo, setGstNo] = useState("");
    const [GstDetails, setGstDetails] = useState();
    const [RawMaterials, setRawMaterials] = useState();
    const [RMDetails, setRMDetails] = useState([]);
    const [SelectedRMs, setSelectedRMs] = useState([]);

    useEffect( () => {
        getAllRawMaterials()
            .then((value) => {
                if(value === "No response"){
                    return;
                }
                else{
                    const arr = [];
                    value?.data.forEach((rawMaterial) => {arr.push(rawMaterial["RMM_NAME"]);})
                    setRMDetails(value?.data);
                    setRawMaterials(arr);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    },[]);

    const handleSubmit = () => {
        var newRaw = [];
        RMDetails.forEach((item) =>{
            if(SelectedRMs.includes(item.RMM_NAME))
            {
                newRaw.push(item.RMM_ID);
            }
        })
        const response = registerSupplier(Name, DelAdd, SerAdd, Email, PhoneNo, GstNo, newRaw);
        console.log(response);
        window.location.reload();
    }
    const handleDdlChange = (event) => {
        const {
            target: {value},
        } = event;
        setSelectedRMs(typeof value === 'string' ? value.split(','): value);
    }
    const populateDdl = () => {
        if(RawMaterials){
            return RawMaterials.map((name) => {return (
                <MenuItem key={name} value={name}>
                    <Checkbox checked={SelectedRMs.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                </MenuItem>
            )})
        }
        else {
            return ["None"];
        }
    }

    const columns = [{ field: 'RMM_NAME', width:200}, {field: "RMM_HSN_NO", width:200}, {field: "RMM_STOCK", width:200}];
    const rows = RMDetails.filter((rawMaterialDetail) => SelectedRMs.includes(rawMaterialDetail.RMM_NAME));
    const getRowId = (row) => row.RMM_ID;
    return(
        <>
            <RegisterBusiness
                type="Supplier"
                upsert="Insert"
                Name={Name} setName={setName}
                DelAdd={DelAdd} setDelAdd={setDelAdd}
                SerAdd={SerAdd} setSerAdd={setSerAdd}
                Email={Email} setEmail={setEmail}
                PhoneNo={PhoneNo} setPhoneNo={setPhoneNo}
                GstNo={GstNo} setGstNo={setGstNo}
                GstDetails={GstDetails} setGstDetails={setGstDetails}
                ItemDetails={RMDetails} setItemDetails={setRMDetails}
                setItems={setRawMaterials}
                SelectedItems={SelectedRMs} setSelectedItems={setSelectedRMs}
                handleSubmit={handleSubmit}
                populateDdl={populateDdl}
                handleDdlChange={handleDdlChange}
                columns={columns}
                rows={rows}
                getRowId={getRowId}
            />
        </>
    )
}
export default RegisterSupplier;