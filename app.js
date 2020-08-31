const path = require('path')
const express = require('express')
const multer = require('multer')

const app = express()

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

console.log(__dirname)

// create diskstorage
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

// Initialize upload
const upload = multer({
    storage: storage
}).single('upfile')

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

app.post('/api/fileanalyse', (req, res) => {
    upload(req, res, (err) => {
        if(err) throw console.error(err)
        console.log(req.file)

        // Destructure file data and send as json
        const {originalname, mimetype, size} = req.file
        res.json({"name": originalname, "type": mimetype, "size": size})
    })
})

app.listen(PORT, console.log(`Server listening on port: ${PORT}`))