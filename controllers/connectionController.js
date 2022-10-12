const model = require('../models/connection');

exports.index = (req, res) => {
    let events = model.find();
    res.render('./connections/index', { events });
};

exports.new = (req, res) => {
    res.render('./connections/new');
};

exports.create = (req, res) => {
    let event = req.body;
    model.save(event);
    res.redirect('/connections');
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    let event = model.findById(id);
    if (event) {
        res.render('./connections/show', { event });
    } else {
        let err = new Error('Cannot find an event with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    let event = model.findById(id);
    if (event) {
        res.render('./connections/edit', { event });
    } else {
        let err = new Error('Cannot find an event with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.update = (req, res, next) => {
    let event = req.body;
    let id = req.params.id;

    if (model.updateById(id, event)) {
        res.redirect('/connections/' + id);
    } else {
        let err = new Error('Cannot find an event with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    if (model.deleteById(id)) {
        res.redirect('/connections');
    } else {
        let err = new Error('Cannot find an event with id ' + id);
        err.status = 404;
        next(err);
    }
};