const homeRoutes = require('./homeRoutes')

Router.use('/', homeRoutes);

Router.use((req, res) => {
    res.status(404).json({
        request: {
            method: req.method, 
            params: req.params,
            body: req.body,
            path: "./",
        },
        response: {
            status: 404,
            message:'Request failure. Page not found'
        }
    }).end();
});

module.exports = router