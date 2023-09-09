//Import All Routers Here
import { Router } from "express";
const authRouter=Router()
import passport from "passport";
import isLoggedIn from "../../middlewares/authMiddleWare";

//Import Child Routes Here
authRouter.get('/google/callback',
passport.authenticate('google', { failureRedirect: '/login/failed' }),
function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user,"USER")
    res.redirect('/health');

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

export default authRouter;