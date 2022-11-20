import db from '../models/index';
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log(data);
        console.log('--------------------------------------');
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }

}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}
let getCRUD = (req, res) => {
    return res.render('test/crud.ejs');
}
let postCRUD = async (req, res) => {
    let massage = await CRUDService.createNewUser(req.body);
    console.log(massage);
    return res.send('post CRUD from Server');
}
let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('test/displayCRUD.ejs', {
        dataTable: data,
    });
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        console.log('----------');
        console.log(userData);
        console.log('----------');
        if (userData) {
            return res.render('test/editCRUD.ejs', {
                user: userData,
            });
        }

    }
    else {
        return res.send("Not found User");
    }
}
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('test/displayCRUD.ejs', {
        dataTable: allUsers,
    });
}
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let allUsers = await CRUDService.deleteUserById(id);
        return res.render('test/displayCRUD.ejs', {
            dataTable: allUsers,
        });
    }
    else {
        return res.send('User not found');
    }

}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    getEditCRUD: getEditCRUD,
    displayGetCRUD: displayGetCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,

}