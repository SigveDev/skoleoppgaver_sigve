const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const dotenv = require('dotenv');
const User = require('./models/user');
const Pr = require('./models/pr');
const Plan = require('./models/planer');

//lar deg bruke .env filen
dotenv.config();

passport.use(new GoogleStrategy({
    //henter inn clientID og clientSecret fra .env filen
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    //sjekker om brukeren allerede finnes i databasen
    const oldUser = await User.findOne({ googleId: profile.id }).exec();
    if (!oldUser) {
      //hvis brukeren ikke finnes, opprettes en ny bruker
      const newUser = new User({
        googleId: profile.id,
        name: profile.displayName,
        avatar: profile.photos[0].value,
      });
      newUser.save();

      //oppretter blanke pr og planer for brukeren
      const blankPr = new Pr({
        googleId: profile.id,
        bench: "empty",
        deadlift: "empty",
        squat: "empty",
      });
      blankPr.save();

      const blankPlan = new Plan({
        googleId: profile.id,
        days: [
          {
            day: "day1",
            exercises: [
              {
                exercise: "exercise1"
              },
              {
                exercise: "exercise2"
              }
            ]
          },
          {
            day: "day2",
            exercises: [
              {
                exercise: "exercise1"
              },
              {
                exercise: "exercise2"
              }
            ]
          }
        ],
      });
      blankPlan.save();
    } else {
      const updateName = await User.findOne({ name: profile.displayName }).exec();

      //oppdaterer navn og profilbilde hvis brukeren har endret dette siden sist innlogging
      if (!updateName) {
        const updateName = await User.findOneAndUpdate({ googleId: profile.id }, {
          name: profile.displayName,
        }, { new: true }).exec();
      }

      const updateAvatar = await User.findOne({ avatar: profile.photos[0].value }).exec();

      if (!updateAvatar) {
        const updateAvatar = await User.findOneAndUpdate({ googleId: profile.id }, {
          avatar: profile.photos[0].value,
        }, { new: true }).exec();
      }
    }
    done(null, profile);
  }
));

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
})