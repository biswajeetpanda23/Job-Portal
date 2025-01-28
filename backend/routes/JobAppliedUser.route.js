const express = require("express");
const { UserJobApplyModel } = require('../model/JobAppliedUser.model')
const { RecruiterJobModel } = require('../model/RecruiterJobModel')

const JobApplyRoute = express()

JobApplyRoute.get('/', async (req, res) => {
    const data = await UserJobApplyModel.find()
    res.send(data)
})



JobApplyRoute.post('/add', async (req, res) => {
    console.log(req.body)
    try {
        const applyjobs = new UserJobApplyModel(req.body)
        await applyjobs.save()
        res.status(201).json({ success: true, 'msg': 'Job applied successfully', applyjobs })
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
})



JobApplyRoute.get('/:user', async (req, res) => {
    try {
        const { user } = req.params
        const data = await UserJobApplyModel.find({ user })

        res.send(data)

    } catch (err) {
        res.send({ "msg": "Not get user request", "sucess": false })
        console.log(err)
    }

})

module.exports = {
    JobApplyRoute
}