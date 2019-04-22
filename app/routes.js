var AuthenticationController = require('./controllers/authentication'),  
    UserController = require('./controllers/user'), 
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

module.exports = function(app){

    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        userRoutes = express.Router();

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);

    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });

    // User Routes
    apiRoutes.use('/user', userRoutes);
    userRoutes.delete('/:user_id', UserController.deleteUser);
    userRoutes.get('/', UserController.getUsers);
    userRoutes.put('/:user_id', UserController.updateUser)

    // Set up routes
    app.use('/', apiRoutes);

}