const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const dotenv = require('dotenv');
const User = require('./models/user');
const Pr = require('./models/pr');

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    const oldUser = await User.findOne({ googleId: profile.id }).exec();
    if (!oldUser) {
      const newUser = new User({
        googleId: profile.id,
        name: profile.displayName,
        avatar: profile.photos[0].value,
      });
      newUser.save();

      const blankPr = new Pr({
        googleId: profile.id,
        bench: "0kg",
        deadlift: "0kg",
        squat: "0kg",
      });
      blankPr.save();
    } else {
      const updateName = await User.findOne({ name: profile.displayName }).exec();

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