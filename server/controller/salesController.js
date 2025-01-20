let express = require('express');


const salesRFQ = require('../model/salesRFQ')
const salesQuotation = require('../model/quotatiionDB')
const collectionemployee = require('../model/employeeDB')
const purchasePO = require('../model/poDS')
const clientPO = require('../model/clientPoDS')
const collectionproduct = require('../model/productDB')

const generateCustomUUID = require('../uuid/uuid')
const genereateCustomSPO = require('../uuid/idspo')
const generateCustomPO = require('../uuid/idpo')




const addRfq = async (req, res) => {
    const employeeId = req.userData.userId; 

    const rfqData = {
       
        employee_id: employeeId,
        srfq: generateCustomUUID(), 
        status: req.body.status || 'not submitted' 
    };

    console.log('Rfq data:', rfqData);


    try {
      
        await salesRFQ.create(rfqData); 
        console.log('Rfq added successfully');
        
        return res.json({
            success: true,
            message: 'Rfq added successfully'
        });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.srfq === 1) {
            
            console.error('SRFQ already exists:', error.keyValue.srfq);
            return res.status(400).json({
                success: false,
                message: 'SRFQ already exists'
            });
        } else {
            console.error('Error adding RFQ:', error);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while adding the RFQ'
            });
        }
    }
};





const loadRfq = async (req, res) => {
    
    try {
        const employeeId = req.userData.userId;
        console.log('Customer ID:', employeeId);
        res.setHeader('Cache-Control', 'no-cache, no-store');
        
       
        const customerRFQ = await salesRFQ
        .find({ employee_id: employeeId })
        .populate({
            path: 'employee_id',
            select: 'fname lname',
            model: 'employee',
        })
        .sort({ createdAt: -1 }) // Sort by `createdAt` in descending order
        .exec(); 
        console.log('Customer RFQ:', customerRFQ);

        if (!customerRFQ || customerRFQ.length === 0) { 
            return res.status(404).json({ error: 'No RFQs found for this customer' });
        }

        res.json(customerRFQ);
    } catch (error) {
        console.error('Error fetching RFQs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}




const quotationSingle = async function (req, res) {
    const employeeId = req.userData.userId;
    const quotationId = req.params.id;
    try {
        const qSingle = await salesRFQ.findOne({ employee_id: employeeId, _id: quotationId })
        if (!qSingle) {
            return res.status(404).json({ error: 'Quotation not found' });
        }
        res.json({ quotation: qSingle, srfq: qSingle.srfq });
        console.log('qSingle:' , qSingle)
    } catch (error) {
        console.error('Error fetching quotation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};





const addQuotation = async (req, res) => {

    const employeeId = req.userData.userId; 

    const quotationData = {

        employee_id: employeeId,
        salesRFQ_id: req.body.salesRFQ_id,
        clientname: req.body.clientname,
        attention: req.body.attention,
        email: req.body.email,
        phone: req.body.phone,
        clientrfq: req.body.clientrfq,
        products: req.body.products,
        subject: req.body.subject,
        basis: req.body.basis,
        payment: req.body.payment,
        validity: req.body.validity,
        availability: req.body.availability, 
        spo: genereateCustomSPO(),
        status: 'not confirmed',
        totalAmount: req.body.totalAmount,
        discount: req.body.discount,
        totalprice: req.body.totalprice,
        clientPo: '', 
        date: '' 
    };

    console.log('Quotation data:', quotationData);

    try {
        const quotation = await salesQuotation.create(quotationData);
        console.log('Quotation added successfully');

        await salesRFQ.findByIdAndUpdate(
            req.body.salesRFQ_id,
            { status: 'Submitted' }
        );
        
        return res.status(201).json({
            success: true,
            message: 'Quotation added successfully',
            quotation: quotation
        });
    } catch (error) {
        console.error('Error adding quotation:', error);
        
        if (error.code === 11000 && error.keyPattern && error.keyPattern.spo === 1) {
            console.error('SPO already exists:', error.keyValue.spo);
            return res.status(400).json({
                success: false,
                message: 'SPO already exists'
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'An error occurred while adding the quotation'
            });
        }
    }
};



const updateQuotation = async (req, res) => {
    const { id } = req.params;
    const quotationData = req.body;
  
    try {
      const updatedQuotation = await salesQuotation.findByIdAndUpdate(id, quotationData, { new: true });
      console.log('Quotation updated successfully');
      res.json({
        success: true,
        message: 'Quotation updated successfully',
        quotation: updatedQuotation
      });
    } catch (error) {
      console.error('Error updating quotation:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred while updating the quotation'
      });
    }
  };


const fetchSrfq = async function (req, res) {
    const salesRFQ_id = req.params.salesRFQ_id;
    try {
        const existingQuotation = await salesQuotation.findOne({ salesRFQ_id: salesRFQ_id })
        res.json(existingQuotation);
    } catch (error) {
        console.error('Error checking existing quotation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const loadClient = async (req , res) => {

    try {
       
        const employeeId = req.userData.userId;
        res.setHeader('Cache-Control', 'no-cache, no-store');
        const salesClient = await salesQuotation.find({employee_id: employeeId}).exec(); 
        console.log('ClientDetails:', salesClient);
        console.log(salesClient)

        if (!salesClient) {
            
            return res.status(404).json({ error: 'No admins found' });
          }

        res.json(salesClient);

      } catch (error) {
        
        console.error('Error fetching admins:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}



const loadSalesOrder = async (req , res) => {

    try {
       
        const employeeId = req.userData.userId;
        res.setHeader('Cache-Control', 'no-cache, no-store');
         const salesOrder = await salesQuotation.find({ employee_id: employeeId }).populate({
            path: 'employee_id',
            select: 'fname lname', 
            model: 'employee' 
        }).populate({path: 'salesRFQ_id', select: 'srfq'}).sort({ createdAt: -1 }).exec(); 
        console.log('ClientDetails:',salesOrder);
        console.log(salesOrder)

        if (!salesOrder) {
            
            return res.status(404).json({ error: 'No admins found' });
          }

        res.json(salesOrder);

      } catch (error) {
        
        console.error('Error fetching admins:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}


const ClientPoSingle = async function (req, res) {
    const employeeId = req.userData.userId;
    const quotationId = req.params.id;
    try {
        const cpoSingle = await salesQuotation.findOne({  _id: quotationId })
        if (! cpoSingle) {
            return res.status(404).json({ error: 'Client PO not found' });
        }
        res.json({ quotation: cpoSingle, srfq: cpoSingle.srfq });
        console.log('cpoSingle:' ,  cpoSingle)
    } catch (error) {
        console.error('Error fetching Client PO:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const addClientPo = async (req, res) => {
    const employeeId = req.userData.userId; 

    const clientPoData = {
       
        employee_id: employeeId,
        quotation_id: req.body.quotation_id,
        clientPo: req.body.clientPo, 
        date: req.body.date
    };

    console.log('addClientPo data:', clientPoData);


    try {
      
        await clientPO.create(clientPoData); 
        console.log('addClientPo added successfully');
        
        return res.json({
            success: true,
            message: 'addClientPo added successfully'
        });
    } catch (error) {
        console.error('Error adding addClientPo:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while adding the addClientPo'
        });
        } 
    

};


const updateClientPo = async (req, res) => {
    const { id } = req.params;
    const poData = req.body;
  
    try {
      const updatedPo = await clientPO.findByIdAndUpdate(id, poData, { new: true });
      console.log('updatedPo updated successfully');
      res.json({
        success: true,
        message: 'updatedPo updated successfully',
        po: updatedPo
      });
    } catch (error) {
      console.error('Error updating updatedPo:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred while updating the updatedPo'
      });
    }
  };


const fetchQuotationId = async function (req, res) {
    const quotation_id = req.params.quotation_id;
    try {
        const existingPo = await clientPO.findOne({ quotation_id: quotation_id })
        res.json(existingPo);
    } catch (error) {
        console.error('Error checking existing PO:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const addPo = async (req, res) => {
    const employeeId = req.userData.userId; 
    

    const poData = {
       
         employee_id: employeeId,
         po: generateCustomPO(), 
         quotation_id: req.body.quotation_id,
         status: req.body.status || 'not submitted',
         
    };

    console.log('Po data:', poData);


    try {
      
        await purchasePO.create(poData); 
        console.log('PO added successfully');

        await salesQuotation.findByIdAndUpdate(
            req.body.quotation_id,
            { $set: { status: 'Confirmed' } }
        );

        console.log('Sales quotation status updated to Confirmed');

        return res.json({
            success: true,
            message: 'PO added successfully'
        });
        
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.po === 1) {
            
            console.error('PO already exists:', error.keyValue.po);
            return res.status(400).json({
                success: false,
                message: 'PO already exists'
            });
        } else {
            console.error('Error adding PO:', error);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while adding the PO'
            });
        }
    }
};


const loadSalesAnalysis = async (req , res) => {

    try {
       
        const employeeId = req.userData.userId;
        res.setHeader('Cache-Control', 'no-cache, no-store');
        const salesAnalysis = await salesQuotation.find({ employee_id: employeeId }).populate({path: 'salesRFQ_id', select: 'srfq'}).exec(); 
        console.log('ClientDetails:',salesAnalysis);
        console.log(salesAnalysis)

        if (!salesAnalysis) {
            
            return res.status(404).json({ error: 'No salesAnalysis found' });
          }

        res.json(salesAnalysis);

      } catch (error) {
        
        console.error('Error fetching salesAnalysis:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}


const searchProduct = async (req, res) => {
    try {
      const searchQuery = req.query.q;
    
      const products = await collectionproduct.find({ name: { $regex: searchQuery, $options: 'i' } }).select('description');
      res.json(products);
    } catch (error) {
      console.error('Error fetching Products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };







module.exports = {


    addRfq,
    loadRfq ,
    quotationSingle ,
    addQuotation,
    updateQuotation,
    fetchSrfq,
    loadClient,
    loadSalesOrder,
    addPo,
    loadSalesAnalysis,
    ClientPoSingle,
    addClientPo,
    updateClientPo,
    fetchQuotationId,
    searchProduct
    
}