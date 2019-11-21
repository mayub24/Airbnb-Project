const giveAccess = ((req, res, next) =>
{
    if(req.session.userLogin == null)
    {
        res.redirect('/login');
    }
    else
    {
        next();
    }
})

module.exports = giveAccess;