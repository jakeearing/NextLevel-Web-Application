const model = require('../models/connection');
const rsvp = require('../models/rsvp');

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
    //Counts all "Yes" rsvps for the event.
    var query = rsvp.find({status:"YES",event:id});
    query.count(function (err, count) {
    if (err) console.log(err)
    else rsvps=count;
    });

    model.findById(id).populate('host', 'firstName lastName')
    .then(event=>{
        if(event){
            return res.render('./connections/show', { event, rsvps });
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
        rsvp.findOneAndDelete({event:id}, {useFindAndModify: false})
        .catch(err=>next(err));
        res.redirect('/connections');
    })
    .catch(err=>next(err));
};

exports.rsvp = (req, res, next)=>{
    let userRsvp = new rsvp(req.body);
    let id = req.params.id;

    rsvp.findOne({ user:req.session.user , event:id}, function (err, user) {
        if(!user){
            userRsvp.status = req.body.response;
            userRsvp.user = req.session.user;
            userRsvp.event = id;
            userRsvp.save()
            res.redirect('back');
        } else {
            rsvp.findOneAndUpdate({ user:req.session.user , event:id}, {status:req.body.response}, null, function (err, user) {
                res.redirect('back');
            }); 
        }
    });
}
