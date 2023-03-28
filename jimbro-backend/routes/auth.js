const router = require('express').Router();
const passport = require('passport');

const CLIENT_ID = "https://jimbro.fyi/loading";

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
    res.redirect(CLIENT_ID);
})

router.get('/google', passport.authenticate("google", {scope:["profile"]}));

router.get('/google/callback', passport.authenticate("google",{
    successRedirect: CLIENT_ID,
    failureRedirect: "/login/failed"
}))

module.exports = router