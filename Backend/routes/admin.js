import express from "express";
import Members from "../models/Members";
import Notes from "../models/NotesModel";
import Problems from "../models/ProblemModel";
import Student from "../models/studentModel";
import Syllabus from "../models/syllabusModel"

import { isAdmin, isAuth, isCr } from "../utils";


const adminRouter = express.Router()

adminRouter.post("/problemsList", isAuth, isAdmin, async (req, res) => {

    const problems = await Problems.find({})

    res.send(problems)
})

adminRouter.post("/membersAdd", isAuth, isAdmin, async (req, res) => {
    try {
        const member = new Members({
            name : req.body.name,
            work : req.body.work,
            contact : req.body.contact
        })
        const newMember = await member.save()
        res.send({message : "memberCreate success"})

    } catch (error) {
        
        res.send({message : "memberCreate error"})
    }
})

adminRouter.post("/adminList/:query/:count", isAuth, isAdmin, async (req, res) => {
    const query  = req.params.query
    const count  = req.params.count-1

    try {
        if(query === "members"){
            const members = await Members.find({})
            res.send(members)
        }
        else if(query === "crs"){
            const crs = await Student.find({cr : true})
            res.send(crs)

        }else if(query === "students"){
            const stds = await Student.find({})
            res.send(stds)
        }else if(query === "material"){
            const notes = await Notes.find({},{doc : 0})
            res.send(notes)

        }else if(query === "materialOther"){
            const other = await Syllabus.find({},{doc : 0})
            res.send(other)
        }else{
            res.status(404).send({message : "please select any one"})
        }

    } catch (error) {
        
        res.send({message : error.message})
    }
})

adminRouter.post("/delete/:id", isAuth, isAdmin, async (req, res) => {
    const id = req.params.id

    try {
        const member = await Members.findById(id)
        const cr = await Student.findById(id)
        const material = await Notes.findById(id)
        const other = await Syllabus.findById(id)

        
        if(cr){
            await Student.deleteOne(cr)
            res.send("done")
        }else if(member){
            await Members.deleteOne(member)
            res.send("done")

        }else if(material){
            await Notes.deleteOne(material)
            res.send("done")

        }else if(other){
            await Syllabus.deleteOne(other)
            res.send("done")

        }

    } catch (error) {
        
        res.status(500).send({message : error.message})
    }
})



export default adminRouter;
