import RegisterUser from "./Controllers/RegisterUser.js";
import RegisterVerifier from "./Middlewares/RegisterVerifier.js";
import LoginUser from "./Controllers/LoginUser.js";
import LoginVerifier from './Middlewares/LoginVerifier.js'
import Tokenizer from "./Middlewares/Tokenizer.js";
import TokenVerifier from "./Middlewares/TokenVerifier.js";
import  LocalTokenValidator  from "./Middlewares/LocalTokenValidator.js";
import CheckJobExistance from "./Middlewares/CheckJobExistance.js";
import AddJobs from "./Controllers/AddJobs.js";
import AdminDashBoard from "./Controllers/AdminDashBoard.js";
import VerifyInterestedClient from "./Middlewares/VerifyInterestedClient.js";
import Register_Sessions from "./Controllers/Register_Sessions.js";


export default function Routes(app){
  //login routes and registration routes and job adding by admin routes....
   app.post('/register', RegisterVerifier, RegisterUser)
   app.post('/login', LoginVerifier, Tokenizer, TokenVerifier, LoginUser);
   app.post('/admin/addjobs',   CheckJobExistance ,  AddJobs );
   app.get('/admin/dashboard',   AdminDashBoard);
   app.post('/', VerifyInterestedClient , Register_Sessions);
  

}

// LoginVerifier, LocalTokenValidator
// LoginVerifier, LocalTokenValidator