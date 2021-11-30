import app from "./app";

import { PORT } from "./configuration/configuration";



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/api/v1`);
});
