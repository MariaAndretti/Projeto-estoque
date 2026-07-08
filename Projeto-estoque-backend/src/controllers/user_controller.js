const User = require("../models/user");
const {Sequelize} = require('sequelize');
const crypto = require('crypto');

class UserController{
    static async register(req, res){
        const {email, user, passwd, name} = req.body;
        
        let accessKey = user+passwd;
        let hash = crypto.createHash("sha256").update(accessKey);
        
        accessKey = hash.digest('hex');
        
        let newUser= await User.create({email, accessKey, name});

        await newUser.save();

        res.status(newUser ? 200 : 400).json({});
    };
    
    static async authenticate(req, res) {
        const { user, passwd } = req.body;



        let accessKey = user+passwd;
        let hash = crypto.createHash('sha256').update(accessKey);
        accessKey = hash.digest('hex');
        let uUser = await User.findOne({where:{ accessKey }});
        let authenticate = {};


        if (uUser) {
            let key = uUser.email + '-' + Math.random();
            key = crypto.createHash("sha-1").update(key).digest('hex');
            let timeLife = new Date();
            timeLife.setHours(timeLife.getHours() + 1);
            
            authenticate['token'] = key;
            authenticate['timeLife'] = timeLife;
            
            uUser.token = key;
            uUser.timeLife = timeLife;
            await uUser.save();
        };
        
        res.status(uUser ? 200: 404).json({success: uUser ? true : false, authenticate});
    };
    
    static async ValidateToken(req, res, next) {
        let key = req.headers['authorization'];
        console.log(req.headers);
        
        if (key == undefined) {
            res.status(401).json({});
            return
        };
        
        let user = await User.findOne({
            where: {
                token: key,
               // timeLife: { "Op.1e": new Date() }
            }
        });
        
        console.log(new Date());
        
        if (!user) {
            res.status(401).json({});
            return
        };
        
        next();
    };
};

module.exports = UserController;