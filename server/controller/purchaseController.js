let express = require('express');


const purchasePO = require('../model/poDS')
const purchaseOrder = require('../model/purchase-orderDB')
const invoicing = require('../model/invoiceDS')
const generateCustomInvoice = require('../uuid/idinvoice')
const generateCustomDelivery = require('../uuid/iddelivery')
const generateCustomTransaction = require('../uuid/idtransaction')


const loadPo = async (req, res) => {
    try {

        const employeeId = req.userData.userId;
        console.log('Customer ID:', employeeId);
        res.setHeader('Cache-Control', 'no-cache, no-store');
        
    
        const supplierPO = await purchasePO.find({  employee_id: employeeId }).populate({
            path: 'employee_id',
            select: 'fname lname', 
            model: 'employee' 
        }).populate({path: 'quotation_id' ,select: 'spo salesRFQ_id',
    populate:{
        path: 'salesRFQ_id',
        model: 'sales-rfq',
        select: 'srfq' 
    } }).sort({ createdAt: -1 }).exec(); 
        console.log('Supplier PO:', supplierPO);

        if (!supplierPO || supplierPO.length === 0) { 
            return res.status(404).json({ error: 'No POs found for this SUPPLIER' });
        }

        res.json(supplierPO);
    } catch (error) {
        console.error('Error fetching RFQs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}




const purchaseSingle = async function (req, res) {
    const employeeId = req.userData.userId;
    const purchaseId = req.params.id;
    try {
        const poSingle = await purchasePO.findOne({ employee_id: employeeId, _id: purchaseId })
        if (!poSingle) {
            return res.status(404).json({ error: 'PO not found' });
        }
        res.json(poSingle);
        console.log(poSingle)
    } catch (error) {
        console.error('Error fetching PO:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const addPo = async (req, res) => {

    const employeeId = req.userData.userId; 
 

    const poData = {

        employee_id: employeeId,
        po_id: req.body.po_id,
        to: req.body.to,
        attention: req.body.attention,
        email: req.body.email,
        phone: req.body.phone,
        supplierrfq: req.body.supplierrfq,
        products: req.body.products,
        subject: req.body.subject,
        basis: req.body.basis,
        payment: req.body.payment,
        validity: req.body.validity,
        availability: req.body.availability, 
        totalAmount: req.body.totalAmount,
        status: 'not confirmed',
   
    };

    console.log('PO data:', poData);

    try {
        const po = await  purchaseOrder.create(poData);
        console.log('PO added successfully');

        await purchasePO.findByIdAndUpdate(
            req.body.po_id,
            { status: 'Submitted' }
        );

        
        return res.status(201).json({
            success: true,
            message: 'PO added successfully',
            po: po
        });
    } catch (error) {
        console.error('Error adding PO:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while adding the PO'
        });
        
    }
};



const updatePo = async (req, res) => {
    const { id } = req.params;
    const poData = req.body;
  
    try {
      const updatedQuotation = await purchaseOrder.findByIdAndUpdate(id, poData, { new: true });
      console.log('PO updated successfully');
      res.json({
        success: true,
        message: 'PO updated successfully',
        quotation: updatedQuotation
      });
    } catch (error) {
      console.error('Error updating PO:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred while updating the PO'
      });
    }
  };


  
const fetchPo = async function (req, res) {
    const po_id = req.params.po_id;
    try {
        const existingPo = await purchaseOrder.findOne({ po_id: po_id });
        res.json(existingPo);
    } catch (error) {
        console.error('Error checking existing PO:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const loadSupplier = async (req , res) => {

    try {
       
        const employeeId = req.userData.userId;
        res.setHeader('Cache-Control', 'no-cache, no-store');
        const purchaseSupplier = await purchaseOrder.find({employee_id: employeeId }).exec(); 
        console.log('SupplierDetails:', purchaseSupplier);
        console.log(purchaseSupplier)

        if (!purchaseSupplier) {
            
            return res.status(404).json({ error: 'No Supplier found' });
          }

        res.json(purchaseSupplier);

      } catch (error) {
        
        console.error('Error fetching admins:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}




const loadPurchaseDetails = async (req , res) => {

    try {
       
        const employeeId = req.userData.userId;
        res.setHeader('Cache-Control', 'no-cache, no-store');
        const purchaseDetail = await purchaseOrder.find({employee_id: employeeId}).populate({
            path: 'employee_id',
            select: 'fname lname', 
            model: 'employee' 
        }).populate({path: 'po_id', select: 'po quotation_id ', populate:{
            path: 'quotation_id',
            model: 'quotation',
            select: 'salesRFQ_id' ,
            populate:{
                path: 'salesRFQ_id',
                model: 'sales-rfq',
                select: 'srfq' 
            }
            
        } }).exec(); 
        
        console.log('purchaseDetail:', purchaseDetail);
        console.log(purchaseDetail)

        if (!purchaseDetail) {
            
            return res.status(404).json({ error: 'No purchaseDetail found' });
          }

        res.json(purchaseDetail);

      } catch (error) {
        
        console.error('Error fetching purchaseDetail:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}




const addInvoice = async (req, res) => {

    const employeeId = req.userData.userId; 

    const invoiceData = {
       
        employee_id: employeeId,
        invoice: generateCustomInvoice(),
        delivery: generateCustomDelivery(), 
        transaction: generateCustomTransaction(),
        purchase_id: req.body.purchase_id,
        status:  'not confirmed',
        payment: 'to be Paid'
      
         
    };

    console.log('invoiceData:', invoiceData);


    try {
      
        await invoicing.create(invoiceData); 
        console.log('invoiceData added successfully');

        await purchaseOrder.findByIdAndUpdate(
            req.body.purchase_id,
            { status: 'Confirmed' }
        );

              
        return res.json({
            success: true,
            message: 'invoiceData added successfully'
        });
        
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.invoice === 1) {
            
            console.error('Invoice no already exists:', error.keyValue.invoice);
            return res.status(400).json({
                success: false,
                message: 'invoiceData already exists'
            });
        } else {
            console.error('Error adding invoiceData:', error);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while adding the invoiceData'
            });
        }
    }
};






module.exports = { 

    loadPo,
    purchaseSingle,
    addPo, 
    updatePo,
    fetchPo,
    loadSupplier,
    loadPurchaseDetails,
    addInvoice

 }