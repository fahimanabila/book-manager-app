import List from "../models/BookListModels.js";
import path from "path";
import fs from "fs";
import { Op } from "sequelize"; // Import Sequelize operators for advanced queries

export const getLists = async(req, res)=> {
    try {
        const response = await List.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message)
    }
}

export const getListById = async(req, res)=> {
    try {
        const response = await List.findOne({
            where : {
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message)
    }
    
}

export const getListByCategory = async(req, res)=> {
    const { cat } = req.query;
    const categoryId = cat;
    try {
        const response = await List.findOne({
            where : {
                category : categoryId
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message)
    }
    
}

export const getListByDateRange = async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        // Log parsed dates to check if they are valid
        const start = new Date(startDate);
        const end = new Date(endDate);

        console.log("Parsed Start Date:", start);
        console.log("Parsed End Date:", end);

        // Check if dates are valid
        if (isNaN(start) || isNaN(end)) {
            return res.status(400).json({ msg: "Invalid date format" });
        }

        const response = await List.findAll({
            where: {
                publication_date: {
                    [Op.between]: [start, end]
                }
            }
        });

        // Check if any results are returned
        if (response.length === 0) {
            return res.status(404).json({ msg: "No records found within the specified date range" });
        }

        res.json(response);
    } catch (error) {
        console.error("Error during date range query:", error);
        res.status(500).json({ msg: "An error occurred while retrieving the data" });
    }
};


export const saveList = async(req, res)=> {
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});

    const title = req.body.title;
    const author = req.body.author;
    const publication_date = req.body.publication_date;
    const publisher = req.body.publisher;
    const number_of_pages = req.body.number_of_pages;
    const category = req.body.category;

    const file = req.files.image;

    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg:"Invalid images"});
    if(fileSize > 5000000) return res.status(422).json({msg:"Image must be less than 5 MB"})
    
    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});

        try {
            await List.create({
                title: title, 
                author: author,
                publication_date: publication_date,
                publisher: publisher,
                number_of_pages: number_of_pages,
                category: category,
                image: fileName, 
                url: url});
            res.status(201).json({msg:"List created successfully"})
        } catch (error) {
            console.log(error.message)
        }
    })

}

export const updateList = async (req, res) => {
    try {
        const list = await List.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!list) return res.status(404).json({ msg: "No Data Found" });

        let fileName = '';
        if (!req.files || !req.files.file) {
            fileName = list.image; // Corrected from List.image to List.image
        } else {
            const file = req.files.file;
            const fileSize = file.data.length;
            const ext = path.extname(file.name).toLowerCase();
            fileName = file.md5 + ext;
            const allowedType = ['.png', '.jpg', '.jpeg'];

            if (!allowedType.includes(ext)) return res.status(422).json({ msg: "Invalid images" });
            if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

            const filepath = `./public/images/${list.image}`;
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }

            file.mv(`./public/images/${fileName}`, (err) => {
                if (err) return res.status(500).json({ msg: err.message });
            });
        }

        const title = req.body.title;
        const author = req.body.author;
        const publication_date = req.body.publication_date;
        const publisher = req.body.publisher;
        const number_of_pages = req.body.number_of_pages;
        const category = req.body.category;
        
        const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

        await List.update({ title: title, 
            author: author,
            publication_date: publication_date,
            publisher: publisher,
            number_of_pages: number_of_pages,
            category: category,
            image: fileName, 
            url: url }, {
            where: {
                id: req.params.id
            }
        });

        res.json({ msg: "List updated successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "An error occurred while updating the List" });
    }
};


export const deleteList = async(req, res)=> {
    const list = await List.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!list) return res.status(404).json({msg: "No Data Found"});
    try {
        const filepath = `./public/images/${list.image}`;
        fs.unlinkSync(filepath);
        await List.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: "List deleted succesfully"})
    } catch (error) {
        console.log(error.message)
    }
}