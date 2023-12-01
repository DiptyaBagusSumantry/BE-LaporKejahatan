const Models = require ('../models/index.js');

class AdminSeeders {
    static async createAdmin (req, res){
        try {
            await Models.User.create({ 
                name: 'Admin', 
                username: 'Admin', 
                password: 'Admin1234!',
                email: 'admin@gmail.com',
                role: "admin",
                image: null
            })
            .then((data)=> {
                console.log(`Succsess Insert Data Admin! username : ${data.username}`)
            })
        } catch (error) {
                console.log(error.message)
        }
    }
}


module.exports = AdminSeeders
