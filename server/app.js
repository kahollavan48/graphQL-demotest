const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const connectDB = require('./config/db');
const schema = require('./schema/schema');
const cors = require('cors');

connectDB();

const app = express();

app.use(cors());

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}));

const PORT = 4000 || process.env.PORT;

app.listen(PORT,() => {
    console.log(`Listening on port ${PORT} !`);
});
