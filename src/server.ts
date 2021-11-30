import app from "./app";

import { PORT } from "./configuration/configuration";



app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});
