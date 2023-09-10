//Import All Routers Here
import { NextFunction, Request, Response, Router } from "express";
const authRouter=Router()
import passport from "passport";
import isLoggedIn from "../../middlewares/authMiddleWare";
import { log } from "console";

//Import Child Routes Here
authRouter.get('/google/callback',
passport.authenticate('google', { failureRedirect: '/login/failed' }),
function(req :Request, res:any) {
    // Successful authentication, redirect home.
    // console.log(req,"USERLOG")
    // res.send(res)
    console.log("COOOOOkie",res?.headers, "COOOOOKie")
    res.redirect('http://localhost:3000/');

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


authRouter.get("/logout", (req : Request, res : Response, next :NextFunction )=>{
  console.log("callback reached")
  res.clearCookie("session.sig")
  res.clearCookie("session")
  res.redirect('http://localhost:3000/');
  // req.logout(function(err) {
  //   if (err) { return next(err); }
  //   console.log("callback reached")
  //   res.clearCookie("session.sig")
  //   res.redirect('http://localhost:3000/');
  // });
});



export default authRouter;