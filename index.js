const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const root = require('./router')
const schema = require('./shema/shema.js')
const { default: mongoose } = require('mongoose')

const app = express()
const DB_URL = process.env.DB_URL || 'mongodb+srv://NechJust:Yrk-pT4-RkZ-ZHw@cluster0.aygthg8.mongodb.net/?retryWrites=true&w=majority'
const PORT = 4444


app.use(express.json());
app.use(cors((
    {
        origin: ['https://anijojo.online', 'http://localhost:3000'],
    }
)));


app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))


app.get('/', (req, res) => {
  res.json('nice anijojo1!!')
})

const start = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => console.log('DB Started'))
        app.listen(PORT, () => {
            console.log(`Server started on ${PORT}`)
        })
    } catch (e) {
        console.log(e, 'ERR');
    }
}

start()