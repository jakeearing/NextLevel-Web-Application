exports.index = (req, res, next)=>{
    let userName = req.session.userName;
    res.render('./main/about', {userName});
};

exports.about = (req, res) => {
    let userName = req.session.userName;
    res.render('./main/about', {userName});
};

exports.contact = (req, res) => {
    let userName = req.session.userName;
    res.render('./main/contact', {userName});
};