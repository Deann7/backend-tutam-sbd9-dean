const express = require('express');
require('dotenv').config();
const db = require('./src/database/pg.database'); 
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3000; 

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        
        try {
            const parsedOrigin = new URL(origin);
            
            // Daftar hostname yang diizinkan
            const allowedDomains = [
                'localhost', 
                'cs-9-deandro-najwan-ahmad-syahbanna.vercel.app',
                'tutam-deandro-najwan-ahmad-syahbanna-sbd-9.vercel.app'
            ];
            

            if (allowedDomains.includes(parsedOrigin.hostname) || 
                (parsedOrigin.hostname === 'localhost' && 
                 ['4000', '5173'].includes(parsedOrigin.port))) {
                callback(null, true);
            } else {
                callback(new Error('Blocked by CORS: Domain tidak diizinkan'));
            }
        } catch (err) {
            callback(new Error('Invalid origin'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};


app.use(cors(corsOptions));

app.use(express.json());
app.use('/user', require('./src/routes/user.route'));
app.use('/card', require('./src/routes/card.route'));

app.post('/validate-password', (req, res) => {
    const {password} = req.body;
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:";'<>,.?/~\\-]).{8,}$/;
    if (passwordRegex.test(password)){
        return res.status(200).json({message: "Valid password"});
    } else {
        return res.status(400).json({message: "Invalid password"});
    }
}
);

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
}
);


app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});