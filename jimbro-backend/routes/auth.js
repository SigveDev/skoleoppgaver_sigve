const router = require('express').Router();
const passport = require('passport');

//setter urlen til klienten som skal brukes til å logge inn og ut
const CLIENT_ID = "http://localhost:3000";
const CLIENT_ID_LOGOUT = CLIENT_ID + "/login";

//sender brukerinfo til klienten
router.get('/login/success', (req, res) => {
    if(req.user){
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
        });
    }
});

//sender feilmelding til klienten
router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: "falure",
    });
});

//logger ut brukeren
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(CLIENT_ID_LOGOUT);
})

//logger inn brukeren med google og passport
router.get('/google', passport.authenticate("google", {scope:["profile"]}));

//callback url for google, hvis den er korrekt så blir brukeren logget inn
router.get('/google/callback', passport.authenticate("google",{
    successRedirect: CLIENT_ID,
    failureRedirect: "/login/failed"
}))

module.exports = router