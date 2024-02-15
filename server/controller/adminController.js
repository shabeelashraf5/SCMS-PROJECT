let express = require('express');
const { generateToken } = require('../token/tokenauth')
const bcrypt = require('bcryptjs');

const collectionadmin = require('../model/adminDS')
const collectionemployee = require('../model/employeeDB')
const collectionadcategory = require('../model/categoryDB')
const collectionproduct = require('../model/productDB')



//adminLogin

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Received email:', email);
        console.log('Received password:', password);
        

        if (!email || !password) {
            console.log('Email or password missing');
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const admin = await collectionadmin.findOne({ email });

        console.log('Admin found in database:', admin);

        if (!admin) {
            console.log('Admin not found in database');
            return res.status(401).json({ message: 'Authentication failed' });
        }


        const token = generateToken(admin);

        console.log('Generated JWT Token:', token);

        res.status(200).json({ message: 'Authentication successful', admin, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



//load Admin User Details

const loadAdmin = async (req , res) => {

    try {
       
        res.setHeader('Cache-Control', 'no-cache, no-store');
        const admins = await collectionadmin.find({}).exec(); 
        console.log('Users:', admins);

        if (!admins) {
            
            return res.status(404).json({ error: 'No admins found' });
          }

        res.json(admins);
      } catch (error) {
        
        console.error('Error fetching admins:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }


}



//Add Admin

const addAdmin = async (req, res) => {
    
    console.log('Request received to add a new admin');
    console.log('Request body:', req.body);

    const admin = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
    };

    console.log('Admin data:', admin);

    try {
        
        await collectionadmin.insertMany([admin]);
        
        console.log('Admin added successfully');
        
       
        return res.json({
            user: [],
            success: true,
            message: 'SUCCESS'
        });
    } catch (error) {
       
        console.error('Error adding admin:', error);
        
        
        return res.status(500).json({
            success: false,
            message: 'An error occurred'
        });
    }
};


//update Admin

const updateAdmin = async (req, res) => {
    const adminId = req.params.id; 
    
    console.log(`Request received to update admin with ID: ${adminId}`);
    console.log('Request body:', req.body);

    const admin = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
    };

    console.log('Updated admin data:', admin);

    try {
        
        await collectionadmin.findByIdAndUpdate(adminId , req.body, {new: true});
        
        console.log('Admin updated successfully');
        
      
        return res.json({
            success: true,
            message: 'SUCCESS'
        });
    } catch (error) {
        
        console.error('Error updating admin:', error);
        
       
        return res.status(500).json({
            success: false,
            message: 'An error occurred'
        });
    }
};

// delete Admin

const deleteAdmin = async (req, res) => {
    const adminId = req.params.id; 
    
    console.log(`Request received to delete admin with ID: ${adminId}`);


    try {
            
        await collectionadmin.findOneAndDelete( {_id: adminId });
        
        console.log('Admin deleted successfully');
        
       
        return res.json({
            success: true,
            message: 'SUCCESS'
        });
    } catch (error) {
       
        console.error('Error deleting admin:', error);
        
     
        return res.status(500).json({
            success: false,
            message: 'An error occurred'
        });
    }
};




// load Employee Details

const loadEmployee = async (req , res) => {

    try {
    
        res.setHeader('Cache-Control', 'no-cache, no-store');
        const employees = await collectionemployee.find({}).exec(); 
        console.log('Users:', employees);

        if (!employees) {
          
            return res.status(404).json({ error: 'No admins found' });
          }

        res.json(employees);
      } catch (error) {
      
        console.error('Error fetching admins:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }


}
    

//add Emplyee

const addEmployee = async (req, res) => {
    console.log('Request received to add a new employee');
    console.log('Request body:', req.body);
   // console.log('Request file:', req.file);

    try {

          /*
        if (!req.file) {
            console.error('Error adding Employee: No file uploaded');
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }  */
      
            const employee = {
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                password: req.body.password,
                position: req.body.position,
                area: req.body.area,
                department: req.body.department,
              //  image: req.file.filename

            };

            console.log('Employee data:', employee);

       
            await collectionemployee.create(employee);

            console.log('Employee added successfully');

            return res.json({
                user: [],
                success: true,
                message: 'SUCCESS'
            });
       
    } catch (error) {
        console.error('Error adding Employee:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred'
        });
    }
};




//update Emplyee

const updateEmployee = async (req, res) => {
    const employeeId = req.params.id; 
    
    console.log(`Request received to update Employee with ID: ${employeeId}`);
    console.log('Request body:', req.body);

    const employee = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        position: req.body.position,
        area: req.body.area,
        department: req.body.department
    };

    console.log('Updated employee data:', employee);

    try {
        
        await collectionemployee.findByIdAndUpdate(employeeId, req.body, {new: true});
        
        console.log('Employee updated successfully');
        
      
        return res.json({
            success: true,
            message: 'SUCCESS'
        });
    } catch (error) {
        
        console.error('Error updating employee:', error);
        
       
        return res.status(500).json({
            success: false,
            message: 'An error occurred'
        });
    }
};

// delete Employee

const deleteEmployee = async (req, res) => {
    const employeeId = req.params.id; 
    
    console.log(`Request received to delete admin with ID: ${employeeId}`);


    try {
            
        await collectionemployee.findOneAndDelete( {_id: employeeId });
        
        console.log('Employee deleted successfully');
        
       
        return res.json({
            success: true,
            message: 'SUCCESS'
        });
    } catch (error) {
       
        console.error('Error deleting Employee:', error);
        
     
        return res.status(500).json({
            success: false,
            message: 'An error occurred'
        });
    }
};


//load Category 

const loadCategory = async (req , res) => {

    try {
       
         res.setHeader('Cache-Control', 'no-cache, no-store');
        const category = await collectionadcategory.find({}).exec(); 
        console.log('Category:', category);

        if (!category) {
            
            return res.status(404).json({ error: 'No admins found' });
          }

        res.json(category);
      } catch (error) {
    
        console.error('Error fetching admins:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}


// add Category 

const addCategory = async (req, res) => {
    console.log('Request received to add a new category');
    console.log('Request body:', req.body);

    const categoryData = {
        category: req.body.category,
    };

    console.log('Category data:', categoryData);

    try {
        await collectionadcategory.create(categoryData);
        console.log('Category added successfully');
        
        return res.json({
            success: true,
            message: 'Category added successfully'
        });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.category === 1) {
            // Duplicate category error
            console.error('Category already exists:', error.keyValue.category);
            return res.status(400).json({
                success: false,
                message: 'Category already exists'
            });
        } else {
            console.error('Error adding category:', error);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while adding the category'
            });
        }
    }
};

//Update Category

const updateCategory = async (req, res) => {
    const categoryId = req.params.id; 
    
    console.log(`Request received to update category with ID: ${categoryId}`);
    console.log('Request body:', req.body);

    const categoryData = {
        category: req.body.category,
    };

    console.log('Updated category data:', categoryData);

    try {
        
        await collectionadcategory.findByIdAndUpdate(categoryId , req.body, {new: true});
        
        console.log('Category updated successfully');
        
      
        return res.json({
            success: true,
            message: 'SUCCESS'
        });
    } catch (error) {
        
        console.error('Error updating category:', error);
        
       
        return res.status(500).json({
            success: false,
            message: 'An error occurred'
        });
    }
};


//delete category

const deleteCategory = async (req, res) => {
    const categoryId = req.params.id; 
    
    console.log(`Request received to delete admin with ID: ${categoryId}`);

    try {
       
        await collectionadcategory.findOneAndDelete( {_id: categoryId});
        
        console.log('Category deleted successfully');
        
       
        return res.json({
            success: true,
            message: 'SUCCESS'
        });
    } catch (error) {
       
        console.error('Error deleting category:', error);
        
     
        return res.status(500).json({
            success: false,
            message: 'An error occurred'
        });
    }
};


//load Product  

const loadProduct = async (req , res) => {

    try {
       
        res.setHeader('Cache-Control', 'no-cache, no-store');
        const product = await collectionproduct.find({}).exec(); 
        console.log('Category:', product);

        if (!product) {
            
            return res.status(404).json({ error: 'No products found' });
          }

        res.json(product);
      } catch (error) {
    
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}



//Add product

const addProduct = async (req, res) => {
    
    console.log('Request received to add a new admin');
    console.log('Request body:', req.body);

    const product = {
        product: req.body.fname,
        category_id: req.body.category_id,
        description: req.body.email,
        uom: req.body.password,
        price: req.body.price,
        availability: req.body.availability
    };

    console.log('Product data:', product);

    try {
        
        await collectionproduct.insertMany([product]);
        
        console.log('Product added successfully');
        
       
        return res.json({
            product: [],
            success: true,
            message: 'SUCCESS'
        });
    } catch (error) {
       
        console.error('Error adding Product:', error);
        
        
        return res.status(500).json({
            success: false,
            message: 'An error occurred'
        });
    }
};
  
module.exports = {

    adminLogin,
    
    loadAdmin,
    addAdmin,
    updateAdmin,
    deleteAdmin,

    loadEmployee, 
    addEmployee,
    updateEmployee,
    deleteEmployee,

    loadCategory,
    addCategory,
    updateCategory,
    deleteCategory,

    loadProduct,
    addProduct,


}
