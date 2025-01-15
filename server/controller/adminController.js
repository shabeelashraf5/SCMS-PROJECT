let express = require('express');
const { generateToken } = require('../token/tokenauth')
const bcrypt = require('bcryptjs');
const path = require('path');

const collectionadmin = require('../model/adminDS')
const collectionemployee = require('../model/employeeDB')
const collectionadcategory = require('../model/categoryDB')
const collectionproduct = require('../model/productDB')
const collectionnews = require('../model/newsDB')
const salesQuotation = require('../model/quotatiionDB')
const sentEmail = require('../auth/sentEmail')
const randomstring = require('randomstring')




//adminLogin


const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Received email:', email);
        console.log('Received password:', password);

        if (!email ) {
            console.log('Email missing');
            return res.status(400).json({ message: 'Email are required' });
        }

        if(!password){
            console.log('Password is missing')
            return res.status(401).json({
                success: false,
                message: 'Password Required'
            })
        }

        const admin = await collectionadmin.findOne({ email });

        console.log('Admin found in database:', admin);

        if (!admin) {
            console.log('Admin not found in database');
            return res.status(402).json({ message: 'Invalid Credential' });
        }
        

       
        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
            console.log('Incorrect password');
            return res.status(403).json({ message: 'Incorrect Password' });
        }

        const token = generateToken(admin);

        console.log('Generated JWT Token:', admin, token);

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



const addAdmin = async (req, res) => {
    
    console.log('Request received to add a new admin');
    console.log('Request body:', req.body);

    const { fname, lname, email, password } = req.body;

    console.log('Admin data:', { fname, lname, email, password });

    try {
        

        const existingAdmin = await collectionadmin.findOne({ email });

        if(existingAdmin){
            console.log('Email Alraedy exist', existingAdmin)

            return res.status(400).json({
                suceess: false,
                message: 'Already exist'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10); 

        const admin = {
            fname,
            lname,
            email,
            password: hashedPassword, 
        };

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





const updateAdmin = async (req, res) => {
    const adminId = req.params.id; 
    
    console.log(`Request received to update admin with ID: ${adminId}`);
    console.log('Request body:', req.body);

    const { fname, lname, email, password } = req.body;

   
    let hashedPassword;
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10); 
    }

    const updatedAdmin = {
        fname,
        lname,
        email,
        password: hashedPassword || password, 
    };

    console.log('Updated admin data:', updatedAdmin);

    try {
       
        const result = await collectionadmin.findByIdAndUpdate(adminId, updatedAdmin, { new: true });

        if (!result) {
            
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }
        
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
    




const addEmployee = async (req, res) => {
    console.log('Request received to add a new employee');
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file); 
   
    

    try {
        
        
        if (!req.file) {
            console.error('Error adding Employee: No file uploaded');
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        const existingEmployee = await collectionemployee.findOne({ email: req.body.email });

        if(existingEmployee){
            console.log('Email Alraedy exist', existingEmployee)

            return res.status(400).json({
                suceess: false,
                message: 'Already exist'
            })
        }

      

        const randomString = randomstring.generate()
        const hashedPassword = await bcrypt.hash(req.body.password, 10); 

      
        const employee = {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: hashedPassword, 
            position: req.body.position,
            area: req.body.area,
            department: req.body.department,
            image: req.file.filename,
            token: randomString
          
           
        };

        console.log('Employee data:', employee);

       
        const userDetails = await collectionemployee.create(employee);

       
        if (userDetails) {
           
            sentEmail.sentMail(userDetails.fname, userDetails.email, randomString );
            console.log('Employee added successfully');
            return res.json({
                user: [],
                success: true,
                message: 'SUCCESS'
            });
        } else {
            console.error('Error adding Employee: Failed to create employee details');
            return res.status(500).json({
                success: false,
                message: 'Failed to create employee details'
            });
        }

    } catch (error) {
        console.error('Error adding Employee:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred'
        });
    }
};





const updateEmployee = async (req, res) => {
    const employeeId = req.params.id; 
    
    console.log(`Request received to update Employee with ID: ${employeeId}`);
    console.log('Request body:', req.body);

    const { fname, lname, email, password, position, area, department } = req.body;

    let hashedPassword;
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10); 
    }

    let updatedEmployee = {
        fname,
        lname,
        email,
        password: hashedPassword || password, 
        position,
        area,
        department,
    };

    
    if (req.file) {
        updatedEmployee.image = req.file.filename;
    }



    console.log('Updated employee data:', updatedEmployee);

    try {
       
        const result = await collectionemployee.findByIdAndUpdate(employeeId, updatedEmployee, { new: true });
        
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }
        
        console.log('Employee updated successfully:', result);
        
        return res.json({
            success: true,
            message: 'Employee updated successfully',
            employee: result
        });
    } catch (error) {
        console.error('Error updating employee:', error);
        
        return res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message
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





const addCategory = async (req, res) => {
    console.log('Request received to add a new category');
    console.log('Request body:', req.body);

    const categoryData = {
        category: req.body.category,
    };

    console.log('Category data:', categoryData);

    try {
        
        let existingCategory = await collectionadcategory.findOne({ category: req.body.category });

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: 'Category already exists'
            });
        }

        await collectionadcategory.create(categoryData);
        console.log('Category added successfully');
        
        return res.json({
            success: true,
            message: 'Category added successfully'
        });
    } catch (error) {
        console.error('Error adding category:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while adding the category'
        });
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

        console.log('Received request to fetch products');
       
        res.setHeader('Cache-Control', 'no-cache, no-store');
        const product = await collectionproduct.find({}).populate( {path: 'category_id', select: 'category'}).exec(); 
        console.log('Products fetched:', product);

        if (!product) {
            console.log('No products found');
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
    console.log('Request received to add a new product');
    console.log('Request body:', req.body);

   

    const productData = {
        product: req.body.product,
        category_id: req.body.category_id,
        description: req.body.description, 
        uom: req.body.uom,
        price: req.body.price ,
        availability: req.body.availability
    };

    console.log('Product data:', productData);

    try {
        
        await collectionproduct.create(productData);

        console.log('Product added successfully');

        return res.status(201).json({
            product: productData,
            success: true,
            message: 'Product added successfully'
        });
    } catch (error) {
        console.error('Error adding Product:', error);

        return res.status(500).json({
            success: false,
            message: 'An error occurred while adding the product'
        });
    }
};

//Update Product

const updateProduct = async (req, res) => {
    const productId = req.params.id; 
    
    console.log(`Request received to update product with ID: ${productId}`);
    console.log('Request body:', req.body);

    const productData = {
        category: req.body.category,
    };

    console.log('Updated Product data:', productData);

    try {
        
        await collectionproduct.findByIdAndUpdate(productId , req.body, {new: true});
        
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



const deleteProduct = async (req, res) => {
    const productId = req.params.id; 
    
    console.log(`Request received to delete admin with ID: ${productId}`);

    try {
       
        await collectionproduct.findOneAndDelete( {_id: productId});
        
        console.log('Product deleted successfully');
        
       
        return res.json({
            success: true,
            message: 'SUCCESS'
        });
    } catch (error) {
       
        console.error('Error deleting product:', error);
        
     
        return res.status(500).json({
            success: false,
            message: 'An error occurred'
        });
    }
};


const loadDashboard = async (req , res) => {

    try {
       
        //const employeeId = req.userData.userId;
        res.setHeader('Cache-Control', 'no-cache, no-store');
        const dashboard = await salesQuotation.find({}).populate({path: 'salesRFQ_id', select: 'srfq'}).exec(); 
        console.log('ClientDetails:', dashboard);
        console.log(dashboard)

        if (!dashboard) {
            
            return res.status(404).json({ error: 'No dashboard found' });
          }

        res.json(dashboard);

      } catch (error) {
        
        console.error('Error fetching dashboard:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}


//load News

const loadNews = async (req , res) => {

    try {
       
        res.setHeader('Cache-Control', 'no-cache, no-store');
        const news = await collectionnews.find({}).exec(); 
        console.log('News:', news);

        if (!category) {
            
            return res.status(404).json({ error: 'No admins found' });
          }

        res.json(news);

      } catch (error) {
    
        console.error('Error fetching admins:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}





const addNews = async (req, res) => {
    console.log('Request received to add a new category');
    console.log('Request body:', req.body);

    const newsData = {
        article: req.body.article,
    };

    try {
        
        await collectionnews.create(newsData);
        console.log('News added successfully');
        
        return res.json({
            success: true,
            message: 'News added successfully'
        });
    } catch (error) {
        console.error('Error adding news:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while adding the news'
        });
    }
};


//delete News

const deleteNews = async (req, res) => {
    const newsId = req.params.id; 
    
    console.log(`Request received to delete admin with ID: ${newsId}`);

    try {
       
        await collectionnews.findOneAndDelete( {_id: newsId});
        
        console.log('News deleted successfully');
        
       
        return res.json({
            success: true,
            message: 'SUCCESS'
        });
    } catch (error) {
       
        console.error('Error deleting news:', error);
        
     
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
    updateProduct ,
    addProduct,
    deleteProduct,

    loadDashboard,

    loadNews,
    addNews,
    deleteNews


}
