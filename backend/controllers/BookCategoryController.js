import Category from "../models/BookCategoryModels.js";
import fs from "fs";

export const getCategory = async(req, res)=> {
    try {
        const response = await Category.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message)
    }
}

export const getCategoryById = async(req, res)=> {
    try {
        const response = await Category.findOne({
            where : {
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message)
    }
    
}

export const saveCategory = async (req, res) => {
    const category_name = req.body.category_name;

    try {
        await Category.create({
            category_name: category_name
        });
        console.log('Received data:', { category_name });
        res.json({ msg: "New Category Saved" });
    } catch (error) {

        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ msg: "Category name already exists" });
        } else {
            console.error(error);
            res.status(500).json({ msg: "An error occurred while saving the category" });
        }
    }
}

export const updateCategory = async (req, res) => {
    
    const category_name = req.body.category_name;

    try {
        const category = await Category.findOne({
            where: {
                id: req.params.id
            }
        });

        await Category.update({ category_name: category_name }, {
            where: {
                id: req.params.id
            }
        });

        res.json({ msg: "Category updated successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "An error occurred while updating the category" });
    }
};


export const deleteCategory = async(req, res)=> {
    const category = await Category.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!category) return res.status(404).json({msg: "No Data Found"});
    try {
        await Category.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Category deleted succesfully"})
    } catch (error) {
        console.log(error.message)
    }
}