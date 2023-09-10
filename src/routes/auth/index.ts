//Import All Routers Here
import { Request, Response, Router } from "express";
const authRouter=Router()
import passport from "passport";
import isLoggedIn from "../../middlewares/authMiddleWare";

//Import Child Routes Here
authRouter.get('/google/callback',
passport.authenticate('google', { failureRedirect: '/login/failed' }),
function(req :Request, res:any) {
    // Successful authentication, redirect home.
    // console.log(req,"USERLOG")
    // res.send(res)
    console.log("COOOOOkie",res?.headers, "COOOOOKie")
    res.redirect('http://localhost:3000');

});
authRouter.get('/google',
  passport.authenticate('google', { scope: ['profile','email'],
  accessType: 'offline',
  prompt: 'consent',
 }));

  authRouter.get('/protected',isLoggedIn,((req,res,next)=>{
    return res.send("sample authenticated user")
  }));

authRouter.get('/login/failed', (req, res, next) => {
    res.status(401).json({
        error:true,
        message:"Login Failed"
    })
});

authRouter.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

export default authRouter;