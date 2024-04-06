let express = require('express');



const collectionproduct = require('../model/productDB')


const loadInventory = async (req , res) => {

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

module.exports = {

    loadInventory

}