import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from "dotenv"
import { User } from '../models/user.model';
dotenv.config()
console.log(process.env.CLIENT_SECRET)



interface IUserData {
  id: string;
  displayName: string;
  name: {
    familyName: string;
    givenName: string;
  };
  emails: {
    value: string;
    verified: boolean;
  }[];
  photos: {
    value: string;
  }[];
  provider: string;
  _raw: string;
  _json: {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale: string;
  };
}
passport.use(
  new GoogleStrategy(
    {
      clientID: String(process.env.CLIENT_ID),
      clientSecret: String(process.env.CLIENT_SECRET),
      callbackURL: "http://localhost:2000/api/v1/auth/google/callback",
      scope:["profile","email"],

    },
    (accessToken, refreshToken, profile, cb) => {
      // Try to find the user in the database
      console.log(profile)
      User.findOne({ googleId: profile.id }, (err:any, user:any) => {
        console.log(user,"USER in passport")
        if (err) {
          return cb(err);
        }
    
        if (user) {
          // If the user exists, pass it to the next middleware
          return cb(null, user);
        } else {
          // If the user doesn't exist, create a new user
          const newUser = new User({
            googleId: profile.id,
            name: profile.displayName,
            picture:profile?.photos?.[0]?.value,
            email: profile?.emails?.[0]?.value,
            location: profile?.emails?.[0]?.value,
            provider: profile.provider,
          });
    
          // Save the new user in the database
          newUser.save((err) => {
            if (err) {
              return cb(err);
            }
            return cb(null, newUser);
          });
        }
      });
    }
  )
);

passport.serializeUser((user,done)=>{
    // console.log(user,"before Serialization")
    done(null,user);
})
passport.deserializeUser((user: Express.User,done)=>{
    // console.log(user,"before deserialization")
    done(null,user)
})