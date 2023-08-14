const express = require("express");
const cors = require('cors');

const sequelize = require('./utils/dbConnSetup');

const buyerRoutes = require('./routes/buyer.routes');
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const supplierRoutes = require("./routes/supplier.routes")
const rawMaterialRoutes = require("./routes/rawMaterial.routes");
const purchaseOrderRoutes = require("./routes/purchaseOrder.routes");

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error(error);
});

const syncModels = require("./utils/dbModelSync")
syncModels()
    .then(() => console.log("Models synced."))
    .catch((error) => console.error(error));

require("dotenv").config();

const app = express();
app.use(cors())
app.use(express.json());

app.use('/api/buyers', buyerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/rawMaterials', rawMaterialRoutes);
app.use('/api/purchaseOrders', purchaseOrderRoutes);

app.listen(process.env.APP_PORT || 6000, (error) => {
    if(!error){
        console.log(`App is listening on port ${process.env.APP_PORT}`);
    }
    else{
        console.log("App failed to start");
    }
});