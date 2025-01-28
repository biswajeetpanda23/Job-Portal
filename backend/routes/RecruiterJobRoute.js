const express = require("express");
const { RecruiterJobModel } = require('../model/RecruiterJobModel')


const RecruiterJobRoute = express()

RecruiterJobRoute.get('/', async (req, res) => {
    const data = await RecruiterJobModel.find()
    res.send(data)
})

RecruiterJobRoute.get('/perticular/:_id', async (req, res) => {
    const { _id } = req.params
    const data = await RecruiterJobModel.find({ _id })
    res.send(data)
})


RecruiterJobRoute.post('/add', async (req, res) => {
    try {
        const jobs = new RecruiterJobModel(req.body)
        await jobs.save()
        res.status(201).json({ success: true, 'message': 'Data has been added' })
    } catch (err) {
        res.status(500).json({ success: false, "message": err.message });
    }
})

RecruiterJobRoute.get('/:user', async (req, res) => {
    try {
        const { user } = req.params
        const data = await RecruiterJobModel.find({ user })

        res.send(data)

    } catch (err) {
        res.send({ "message": "Not get user request", "sucess": false })
        console.log(err)
    }

})

RecruiterJobRoute.delete('/delete/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        await RecruiterJobModel.findByIdAndDelete({ _id })
        res.send({ "message": 'Data has deleted', "sucess": true })
    } catch (err) {
        console.log(err)
        res.send({ "message": 'Data has not delete', "sucess": false })
    }
})

RecruiterJobRoute.patch('/edit/:_id', async (req, res) => {
    try {
        let payload = req.body
        let _id = req.params._id
        await RecruiterJobModel.findByIdAndUpdate({ _id }, payload)
        res.send({ "message": "Job has been Updated", "success": true })
    } catch (err) {
        res.send({ "message": "job has not been updated", "success": false })
        console.log(err)
    }
})

module.exports = {
    RecruiterJobRoute
}

