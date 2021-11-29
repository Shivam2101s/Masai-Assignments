const express = require('express');

const mongoose = require('mongoose');

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/Jobs")
}

//  JobSchema

const jobSchema = new mongoose.Schema({
    job: {type: String, required: true },
    company: {type: String, required: true},
    city: {type: String, required: true },
    notice_period: {type: String, required: true },
    rating: {type: Number, required: true},
    work_from_home: {type: Number, required: true}   
},
{
    versionKey: false,
    timestamp: false,
});

const Job = mongoose.model('job',jobSchema);

// CompanySchema

const companySchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    details: {type: String, required: true },
    openings: {type: Number, required: true},
},
{
    versionKey: false,
    timestamp: false,
}); 

const Company = mongoose.model('company',companySchema);

const app = express(); 

app.use(express.json());


//-------------------------------------Company CRUD----------------------------------------------------------------

app.post("/company", async (req,res) => {
    try {
        const company = await Company.create(req.body);

        return res.status(200).send(company);
    }catch (e) {
        return res.status(500).json({message: e.message, status: "Failed"});
    } 
});

//getALL

app.get("/company", async (req, res) => {
    try {
        const companys = await Company.find().lean().exec();

        return res.status(200).send({companys});
    }catch (e) {
        return res.status(500).json({message: e.message, status: "Failed"});
    } 
}); 

// getONE

app.get("/company/:id", async (req, res) => {
    try {
        const company = await Company.findById(req.params.id).lean().exec();

        return res.status(200).send({company});
    }catch (e) {
        return res.status(500).json({message: e.message, status: "Failed"});
    } 
}); 

// Max number of openings

app.get("/company1", async (req, res) => {
    try {
        const companys = await Company.findOne().sort({"openings":-1}).lean().exec();

        return res.status(200).send({companys});
    }catch (e) {
        return res.status(500).json({message: e.message, status: "Failed"});
    } 
}); 



// Update

app.patch("/company/:id", async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id , req.body, {new: true}).lean().exec();

        return res.status(200).send({company});
    }catch (e) {
        return res.status(500).json({message: e.message, status: "Failed"});
    } 
}); 

// Delete

app.delete("/company/:id", async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(200).send({company});
    }catch (e) {
        return res.status(500).json({message: e.message, status: "Failed"});
    } 
}); 


//-------------------------------------JOBS CRUD----------------------------------------------------------------

app.post("/jobs", async (req,res) => {
    try {
        const job = await Job.create(req.body);

        return res.status(200).send(job);
    }catch (e) {
        return res.status(500).json({message: e.message, status: "Failed"});
    } 
});

//getALL

app.get("/jobs", async (req, res) => {
    try {
        const jobs = await Job.find().lean().exec();

        return res.status(200).send({jobs});
    }catch (e) {
        return res.status(500).json({message: e.message, status: "Failed"});
    } 
}); 

// getONE

app.get("/jobs/:id", async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).lean().exec();

        return res.status(200).send({job});
    }catch (e) {
        return res.status(500).json({message: e.message, status: "Failed"});
    } 
}); 

// Sort by rating

app.get("/jobs1", async (req, res) => {
    try {
        const jobs = await Job.find().sort({"rating":-1});

        return res.status(200).send(jobs);
    }catch (e) {
        return res.status(500).json({message: e.message, status: "Failed"});
    } 
}); 



// get by city 

app.get("/jobs/:city", async (req, res) => {
    try {
        const jobs = await Job.find({city:req.params.city}).lean().exec();

        return res.send(jobs);
    }catch (e) {
        return res.status(500).json({message: e.message, status: "Failed"});
    } 
}); 




// get job with notice period 2

app.get("/jobsN", async (req, res) => {
    try {
        const jobs = await Job.find({"notice_period":"2" }).lean().exec();

        return res.status(200).send(jobs);
    }catch (e) {
        return res.status(500).json({message: e.message, status: "Failed"});
    } 
}); 

// Update

app.patch("/jobs/:id", async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id , req.body, {new: true}).lean().exec();

        return res.status(200).send({job});
    }catch (e) {
        return res.status(500).json({message: e.message, status: "Failed"});
    } 
}); 

// Delete

app.delete("/jobs/:id", async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(200).send({job});
    }catch (e) {
        return res.status(500).json({message: e.message, status: "Failed"});
    } 
}); 


app.listen(2370, async function () {
    await connect();
    console.log("Listening on port 2370");
})