const express = require("express")
const routes = express.Router()
const ProfileController = require('./controllers/ProfileController')
const JobsController = require('./controllers/JobsController')
const DashboardController = require('./controllers/DashboardController')


routes.get('/', DashboardController.index)
routes.get('/index', (req, res) => res.redirect('/'))
routes.get('/job', JobsController.create)
routes.post('/job', JobsController.save)
routes.get('/job/:id', JobsController.show)
routes.post('/job/:id', JobsController.update)
routes.post('/job/delete/:id', JobsController.delete)

routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)


module.exports = routes
