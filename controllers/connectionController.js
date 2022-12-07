const model = require('../models/connection');

exports.index = (req, res, next) => {
    model.find()
    .then(events=>res.render('./connections/index', {events}))
    .catch(err=>next(err));  
};

exports.new = (req, res) => {
    res.render('./connections/new');
};

exports.create = (req, res, next) => {
    let event = new model(req.body);
    event.host = req.session.user;
    event.save()
    .then((event)=>{
        req.flash('success', 'Connection has been created successfully');
        res.redirect('/connections');
    })
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
        req.flash('error', err.message);
        return res.redirect('back');
        }
        next(err);
    });
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    model.findById(id).populate('host', 'firstName lastName')
    .then(event=>{
        if(event){
            return res.render('./connections/show', { event });
        } else {
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    model.findById(id)
    .then(event=>{
        return res.render('./connections/edit', {event});
    })
    .catch(err=>next(err));
};

exports.update = (req, res, next) => {
    let event = req.body;
    let id = req.params.id;

    model.findByIdAndUpdate(id, event, {useFindAndModify: false, runValidators: true})
    .then(event=>{
        return res.redirect('/connections/' + id);
    })
    .catch(err=> {
        if(err.name === 'ValidationError') {
            req.flash('error', err.message);
            return res.redirect('/back');
        }
        next(err);
    });
};

exports.delete = (req, res, next)=>{
    let id = req.params.id;
    
    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(event =>{
        res.redirect('/connections');
    })
    .catch(err=>next(err));
};