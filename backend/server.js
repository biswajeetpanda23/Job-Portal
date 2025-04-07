const express = require("express");
const { connections } = require("./config/db");
const cors = require("cors");
const { UserRoute } = require('./routes/UserRoute')
const { RecruiterRoute } = require('./routes/RecruiterRoute')
const { RecruiterJobRoute } = require('./routes/RecruiterJobRoute')
const { JobApplyRoute } = require('./routes/JobAppliedUser.route')
const { authenticate } = require('./middleware/Authenticate.middleware')
// const jobApplicationsRoutes = require("./routes/jobApplications");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use('/users', UserRoute)
app.use('/recruiters', RecruiterRoute)
app.use(authenticate)
app.use('/jobs', RecruiterJobRoute)
app.use('/jobsapply', JobApplyRoute)
// app.use("/api/jobapplications", jobApplicationsRoutes);

app.listen(5000, async () => {
  try {
    await connections;
    console.log("Our DB is connected");
  } catch (err) {
    console.log({ msg: "Our DB is not connected", err });
  }
  console.log(`server running at 5000`);
});
