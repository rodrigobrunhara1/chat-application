import { serverHttp } from "./http";
import 'dotenv/config';
import "./websocket";
import connectToMongoDB from "./database";

const PORT = process.env.PORT || process.env.LOCAL_PORT;

connectToMongoDB();
serverHttp.listen(PORT, () => console.log('Server is running on PORT', PORT))
