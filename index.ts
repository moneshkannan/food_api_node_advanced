import express from 'express'
import App from './services/expressApp'
import dbConnection from './services/database'

const startServer = async () => {
    const app = express()
    console.clear();
    await dbConnection()
    await App(app)
    
    app.listen(8000, () => {
        console.log('listening to port 8000')
    })
}

startServer();