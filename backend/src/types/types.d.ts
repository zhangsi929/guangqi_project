// import { Request } from "express";
// // I see, it's a type mismatch between our custom type RequestWithAuthData and the default Request type used in the route handler. 
// // To resolve this, we need to extend the Request type with authData globally. In order to do this, we will use TypeScript's declaration merging:
// // Create a new types.d.ts file in your project root (or in a suitable types or declarations directory) and add the following:
// declare module "express" {
//   export interface Request {
//     authData: any;
//   }
// }

