const giveAccess = ((req, res, next) =>
{
    if(req.session.userLogin == null)
    {
        res.redirect('/user/login');
    }
    else
    {
        next();
    }
})

module.exports = giveAccess;