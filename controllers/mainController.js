const model = require('../models/user');

exports.index = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([model.findById(id)])
    .then(results=>{
        const [user] = results;
        res.render('./main/index', {user});
    })
    .catch(err=>next(err));
};

exports.about = (req, res) => {
    res.render('./main/about');
};

exports.contact = (req, res) => {
    res.render('./main/contact');
};