import {useState, useEffect, useCallback} from "react";
import GeneralPurchaseOrder from "../components/generalPurchaseOrder"
import {getAllSuppliers} from "../services/createPurchaseOrder.service";
import CustomSpeedDial from "../components/speedDial";
import {ListItem, MenuItem, ListItemText} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

const CreatePurchaseOrder = () => {
    const [AllSupDets, setAllSupDets] = useState([]);
    const [SelectedSup, setSelectedSup] = useState('');
    const [RawMats, setRawMats] = useState([]);
    const [SelectedRawMats, setSelectedRawMats] = useState([]);
    const [DocNo, setDocNo] = useState("");
    const [DocDate, setDocDate] = useState();
    const [DelDate, setDelDate] = useState();

    useEffect(() => {
        getAllSuppliers()
            .then((response) => {
                if(response === "No response"){
                    return;
                }
                else{
                    setAllSupDets(response.data);
                }
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        setSelectedRawMats([]);
        setRawMats(SelectedSup["RAW_MATERIALS_MASTERs"]);
    }, [SelectedSup])
    const handleSubmit = () => {

    }
    const populateDdl = () => {
        if(AllSupDets){
            return AllSupDets.map((SupDets) => {return (
                <MenuItem value={SupDets['SM_ID']}>{SupDets["SM_NAME"]}</MenuItem>
            )})
        } else{
            return ['None'];
        };
    }
    const handleDdlChange = (event) => {
        const selectedSupplierName = event.target.value;
        // Find the supplier object with the selected name
        const selectedSupplier = AllSupDets.find(
            (item) => item.SM_NAME === selectedSupplierName
        );

        if (selectedSupplier) {
            setSelectedSup(selectedSupplier);
            console.log(selectedSupplier);
        } else {
            setSelectedSup(null); // Reset the selected supplier ID if no supplier is found
        }
    };

    const handleMatDdlChange = (event) => {
        const {
            target: {value},
        } = event;
        console.log(value)
        setSelectedRawMats(typeof value === 'string' ? value.split(','): value);
    }

    const populateMatDdl = () => {
        if(RawMats){
            return RawMats.map((RawMat) => {return(
                <MenuItem key={RawMat.RMM_ID} value={RawMat.RMM_NAME}>
                    <ListItemText primary={RawMat.RMM_NAME} />
                </MenuItem>
            )})
        }
    }

    const onCellEditCommit = (cellData) => {
        console.log(cellData);
    }

    const columns = [{field: "RMM_ID", width:200}, {field: "RMM_NAME", width:200}, {field: "RMM_HSN_NO", width:200}, {field: "RMM_STOCK", width:200}, {field:"ORDER_QUANTITY", width:200, editable:true}, {field:"UNIT_PRICE", width:200, editable:true}];
    let rows = [];
    if(SelectedRawMats.length > 0){
        rows = SelectedSup["RAW_MATERIALS_MASTERs"].filter((RawMat) => SelectedRawMats.includes(RawMat.RMM_NAME));
        rows.forEach((row) => {
            row["ORDER_QUANTITY"] = 0;
            row["UNIT_PRICE"] = 0;
        });
    }

    const processRowUpdate = (newRow, oldRow) => {

        let editIndex = rows.findIndex(row => row.RMM_ID === newRow.RMM_ID);
        rows[editIndex].ORDER_QUANTITY = newRow.ORDER_QUANTITY;
        rows[editIndex].UNIT_PRICE = newRow.UNIT_PRICE;
        console.log(newRow);
        console.log(rows);
    }
    const getRowId = (row) => row.RMM_ID
    return(
        <>
            <GeneralPurchaseOrder
                type={"Purchase Order"}
                upsert={"New"}
                handleSubmit={handleSubmit}
                AllSupDets={AllSupDets} setAllSupDets={setAllSupDets}
                SelectedSup={SelectedSup} setSelectedSup={setSelectedSup}
                RawMats={RawMats} setRawMats={setRawMats}
                SelectedRawMats={SelectedRawMats} setSelectedRawMats={setSelectedRawMats}
                DocNo={DocNo} setDocNo={setDocNo}
                DocDate={DocDate} setDocDate={setDocDate}
                DelDate={DelDate} setDelDate={setDelDate}
                populateDdl={populateDdl} handleDdlChange={handleDdlChange}
                populateMatDdl={populateMatDdl} handleMatDdlChange={handleMatDdlChange}
                columns={columns} rows={rows} getRowId={getRowId} onCellEditCommit={onCellEditCommit} processRowUpdate={processRowUpdate}
            />
            <CustomSpeedDial/>

        </>
    )
}

export default CreatePurchaseOrder