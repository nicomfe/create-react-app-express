// API SERVER
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
import PassportTwitter from 'passport-twitter'
import path from 'path'

import authRoutes from './routes/auth'
import apiRoutes from './routes/api'
import authCheckMiddleware from './middleware/auth-check';

const app = express()

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(passport.initialize())

passport.use(new PassportTwitter.Strategy({
	consumerKey: process.env.TWITTER_KEY,
	consumerSecret: process.env.TWITTER_SECRET,
	callbackURL: '/api/twitter/login/return',
},
function(token, tokenSecret, profile, done) {
	// In this example, the user's Twitter profile is supplied as the user
	// record.  In a production-quality application, the Twitter profile should
	// be associated with a user record in the application's database, which
	// allows for account linking and authentication with other identity
	// providers.
  done(null, profile)
	// getUser(profile.id).then((userRecord) => {
	// 	if(userRecord) {
	// 		done(null, userRecord) // user found, return that user
	// 	}
  //
	// 	// if there is no user, create them
	// 	const user = {}
	// 	Object.assign(user, {
	//     username: profile.username,
	//     id: profile.id,
	//     profilePicture : profile._json.profile_background_image_url,
	// 		twitter: {
	// 			token: token,
	// 		}
	// 	})
	// 	saveUser(user).then((userRecord) => {
	// 		done(null, userRecord)
	// 	})
	// })
	// .catch(function(error) {
	// 	done(error)
	// })
}))
app.use('/api', authCheckMiddleware);

// routes
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes)

// Put all API endpoints under '/api'
app.get('/api/users', (req, res) => {
  const count = 5

  // Generate some users
  const users = Array.from(Array(count).keys()).map(i => ({
    id: i,
    name: 'asddas',
  }))

  // Return them as json
  res.json(users)

  console.log(`Sent ${count} users`)
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/build/index.html'))
// })

const port = process.env.PORT || 5000
app.listen(port)

console.log(`API listening on ${port}`)
