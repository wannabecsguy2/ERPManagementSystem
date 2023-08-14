import {useState} from 'react';
import {Backdrop, Box, SpeedDialAction, SpeedDialIcon, SpeedDial, Link, Tooltip} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LibraryAddIcon from "@mui/icons-material/LibraryAdd"
import Typography from "@mui/material/Typography";
import {Label} from "@mui/icons-material";

const actions = [
    {icon: <Link href="../registerSupplier" target="_blank"><PersonAddIcon sx={{color:"green"}}/></Link>, name: 'New Supplier'},
    {icon: <Link href="../createPurchaseOrder" target="_blank"><LibraryAddIcon sx={{color:"green"}}/></Link>, name: 'New Purchase Order'},
    {icon: <Link href="../registerBuyer" target="_blank"><PersonAddIcon /></Link>, name: 'New Buyer'},
]

const CustomSpeedDial = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const onClick = (event) => {
        console.log(event);
        setOpen(false);
    }
    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <Backdrop open={open} />
                <SpeedDial
                    ariaLabel="SpeedDial tooltip example"
                    sx={{position: 'absolute', bottom: 16, right: 16}}
                    icon={<SpeedDialIcon />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={<Tooltip title={action.name}>
                                    {action.icon}
                                </Tooltip>}
                            onClick={onClick}
                        >
                        </SpeedDialAction>
                    ))}
                </SpeedDial>
            </Box>
        </>
    );
}

export default CustomSpeedDial;