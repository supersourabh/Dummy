import express from "express"
import Notes from "../models/NotesModel"
import Syllabus from "../models/syllabusModel"
import { isAuth, isCr } from "../utils"
import path from "path"
import fileUpload from "express-fileupload"


const materialRouter = express.Router()


materialRouter.get("/notes/:sem/:branch/:count", async (req, res) => {
    const sem = req.params.sem
    const branch = req.params.branch
    const count = req.params.count

    const materials = await Notes.find({ sem: sem, branch: branch }, { subject: 1, professor: 1, date: 1 })

    try {
        res.status(200).send(materials)
    } catch (error) {
        res.status(500).send({ message: error })
    }


})


materialRouter.get("/syllabus/:type/:sem/:branch/", isAuth, async (req, res) => {
    const sem = req.params.sem
    const branch = req.params.branch
    const type = req.params.type
    console.log(req.params);

    try {
        const syllabus = await Syllabus.find({ type: type, sem: sem, branch: branch }, { subject: 1, type: 1, date: 1 })
        res.send(syllabus)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

})

materialRouter.use(express.static(path.join(__dirname, "uploads")))

materialRouter.use(fileUpload())

// const storage = multer.diskStorage({

//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, 'uploads/',))
//     },
//     filename: function (req, file, cb) {

//         cb(null, file.fieldname + Date.now() + path.extname(file.originalname))

//     }
// })

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 30 * 1024 * 1024 }
// }).single("file")





materialRouter.post("/create/studyMaterial", isAuth, isCr, async (req, res) => {

    const file = req.files.file


    try {
        const notes = new Notes({
            subject: req.body.subName,
            sem: req.body.sem,
            branch: req.body.branch,
            professor: req.body.nameProf,
            date: Date.now(),
            doc: {
                data: file.data,
                contentType: file.mimetype
            }
        })
        const newNote = await notes.save()

        res.send({ messsage: "studymaterial upload success" })


    } catch (error) {
        res.status(500).send({ message: error.message })

    }

})



materialRouter.post("/create/syllabusUpload", isAuth, isCr, async (req, res) => {
    const file = req.files.file
    console.log(file);

    try {
        const syllabus = new Syllabus({
            type: req.body.type,
            sem: req.body.sem,
            branch: req.body.branch,
            subject: req.body.subject,
            date: Date.now(),
            doc: {
                data: file.data,
                contentType: file.mimetype
            }
        })

        const newNote = await syllabus.save()


        res.send({ messsage: "syllabus upload success" })


    } catch (error) {
        res.status(500).send({ message: error.message })

    }

})

materialRouter.post("/view/:id", isAuth, async (req, res) => {
    const id = req.params.id

    try {
        const viewMaterial = await Notes.findById(id)
        if (viewMaterial) {
            res.send(viewMaterial)

        } else {

            const viewSyllabus = await Syllabus.findById(id)
            res.send(viewSyllabus)
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

})


export default materialRouter;
