const permission = ((req, res, next) =>
{
    if(req.session.userLogin.type === 'Admin')
    {
        next();
    }
    else
    {
       res.redirect('/room');
    }
})

module.exports = permission;