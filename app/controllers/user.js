var User = require('../models/user');

exports.getUsers = function (req, res) {
    User.find(function (err, users) {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
}


exports.deleteUser = function (req, res) {
    User.remove({
        _id: req.params.user_id
    }, function (err, user) {
        res.json(user);
    });
}

exports.updateUser = function (req, res) {
    
    User.findByIdAndUpdate(req.params.user_id,{$set:req.body}, function(err, result){
        if(err){
            console.log(err);
        }
        res.json(result)
    });
}

