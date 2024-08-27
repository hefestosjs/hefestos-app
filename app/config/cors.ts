import { registerMiddleware } from "core";
import cors, { type CorsOptions } from "cors";

const options: CorsOptions = {
  // origin: true, // Reflects the request origin, allowing requests from any origin
  // methods: "GET,POST,PUT,PATCH,DELETE", // Allowed HTTP methods for CORS
  // allowedHeaders: "Content-Type,Authorization", // Allowed headers in the request
  // exposedHeaders: "", // No custom headers exposed to the client
  // credentials: false, // CORS header 'Access-Control-Allow-Credentials' is omitted
  // maxAge: 0, // CORS header 'Access-Control-Max-Age' is omitted
  // preflightContinue: false, // Do not pass CORS preflight response to the next handler
  // optionsSuccessStatus: 204, // Status code for successful OPTIONS requests
};

registerMiddleware(cors(options));
