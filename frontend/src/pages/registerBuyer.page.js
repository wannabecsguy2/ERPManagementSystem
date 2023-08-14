import RegisterBusiness from "../components/registerBusiness"
import {getAllProducts, registerBuyer} from "../services/registerBuyer.service";
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

const RegisterBuyer = () => {
    const [Name, setName] = useState("");
    const [DelAdd, setDelAdd] = useState("");
    const [SerAdd, setSerAdd] = useState("");
    const [Email, setEmail] = useState("");
    const [PhoneNo, setPhoneNo] = useState("");
    const [GstNo, setGstNo] = useState("");
    const [GstDetails, setGstDetails] = useState();
    const [Products, setProducts] = useState();
    const [ProductDetails, setProductDetails] = useState([]);
    const [SelectedProducts, setSelectedProducts] = useState([]);

    useEffect( () => {
        getAllProducts()
            .then((value) => {
                if(value === "No response"){
                    return;
                }
                else{
                    const arr = [];
                    value?.data.forEach((product) => {arr.push(product["PM_NAME"]);})
                    setProductDetails(value?.data);
                    setProducts(arr);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    },[]);

    const handleSubmit = () => {
        var newPro = [];
        ProductDetails.forEach((item) =>{
            if(SelectedProducts.includes(item.PM_NAME))
            {
                newPro.push(item.PM_ID);
            }
        })
        const response = registerBuyer(Name, DelAdd, SerAdd, Email, PhoneNo, GstNo, newPro);
        console.log(response);
        window.location.reload();
    }
    const handleDdlChange = (event) => {
        const {
            target: {value},
        } = event;
        setSelectedProducts(typeof value === 'string' ? value.split(','): value);
    }
    const populateDdl = () => {
        if(Products){
            return Products.map((name) => {return (
                <MenuItem key={name} value={name}>
                    <Checkbox checked={SelectedProducts.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                </MenuItem>
            )})
        }
        else {
            return ["None"];
        }
    }

    const columns = [{ field: 'PM_NAME', width:200}, {field: "PM_WEIGHT", width:200}, {field: "PM_HSN_NO", width:200}, {field: "PM_STOCK", width:200}];
    const rows = ProductDetails.filter((ProductDetail) => SelectedProducts.includes(ProductDetail.PM_NAME));
    const getRowId = (row) => row.PM_ID;
    return(
        <>
            <RegisterBusiness
                type="Buyer"
                upsert="Insert"
                Name={Name} setName={setName}
                DelAdd={DelAdd} setDelAdd={setDelAdd}
                SerAdd={SerAdd} setSerAdd={setSerAdd}
                Email={Email} setEmail={setEmail}
                PhoneNo={PhoneNo} setPhoneNo={setPhoneNo}
                GstNo={GstNo} setGstNo={setGstNo}
                GstDetails={GstDetails} setGstDetails={setGstDetails}
                ItemDetails={ProductDetails} setItemDetails={setProductDetails}
                setItems={setProducts}
                SelectedItems={SelectedProducts} setSelectedItems={setSelectedProducts}
                handleSubmit={handleSubmit}
                populateDdl={populateDdl}
                handleDdlChange={handleDdlChange}
                columns={columns}
                rows={rows}
                getRowId={getRowId}
            />
        </>
    );
}
export default RegisterBuyer;