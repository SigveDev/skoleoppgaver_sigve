const router = require('express').Router();
const passport = require('passport');

const CLIENT_ID = "http://localhost:3000";
const CLIENT_ID_LOGOUT = CLIENT_ID + "/login";

router.get('/login/success', (req, res) => {
    if(req.user){
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
        });
    }
});

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: "falure",
    });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(CLIENT_ID_LOGOUT);
})

router.get('/google', passport.authenticate("google", {scope:["profile"]}));

router.get('/google/callback', passport.authenticate("google",{
    successRedirect: CLIENT_ID,
    failureRedirect: "/login/failed"
}))

module.exports = router