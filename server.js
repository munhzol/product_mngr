const   express = require('express'),
        app = express(),
        port = 8000,
        cors = require('cors'),
        db = 'product_mngr',
        server = app.listen(port, console.log(`Listening port: #${port}.`));

app.use(cors());
app.use(express.json());

require('./server/configs/db.config')(db);
require('./server/routes/product.route')(app);
