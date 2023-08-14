import {useState, Fragment} from 'react';
import {Box, Drawer, Button, List, Divider, ListItem, ListItemButton} from '@mui/material'
import CustomSpeedDial from "../components/speedDial";

const HomePage = () => {
    const [state, setState] = useState(false);

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')){
            return;
        }
        setState(false)

    }

    return (
        <Fragment>
            <CustomSpeedDial/>
        </Fragment>
    );
}

export default HomePage;