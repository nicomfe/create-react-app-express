import express from 'express'
import passport from 'passport'
import PassportTwitter from 'passport-twitter'

const router = new express.Router();

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
	done(null, id)
})

// login with twitter
router.get('/twitter/login', passport.authenticate('twitter'))
// Coming back from login
router.get('/twitter/login/return',
	passport.authenticate('twitter', {
		failureRedirect: '/',
		successRedirect: '/dashboard',
	}),
)

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

module.exports = router
