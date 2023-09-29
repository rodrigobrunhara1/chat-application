import { serverHttp } from "./http";
import "./websocket";

const PORT = 3350;

serverHttp.listen(PORT, () => console.log('Server is running on PORT', PORT))
