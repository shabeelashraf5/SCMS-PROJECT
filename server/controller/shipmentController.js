let express = require('express');


const collectionshipment = require('../model/shipmentDB')


const loadInv = async (req, res) => {

    try {

        const employeeId = req.userData.userId;
        console.log('Customer ID:', employeeId);
        res.setHeader('Cache-Control', 'no-cache, no-store');
        
        const shipData = await collectionshipment.find({})
        .populate({
            path: 'employee_id',
            select: 'fname lname', // Specify the fields you want to populate
            model: 'employee' // Assuming the model name is 'employee'
        })
        .populate({
            path: 'invoice_id',
            select: 'invoice delivery purchase_id',
            populate: {
                path: 'purchase_id',
                model: 'purchase-order',
                select: 'po_id',
           populate: {
                path: 'po_id',
                model: 'purchase-po',
                select: 'po quotation_id',
                populate: {
                    path: 'quotation_id',
                    model: 'quotation',
                    select: 'salesRFQ_id clientname attention clientrfq totalAmount products',
                    populate: {
                        path: 'salesRFQ_id',
                        model: 'sales-rfq',
                        select: 'srfq'
                    }
                }
            }
        }
        }).exec();
    
        console.log('shipData:', shipData);

        if (!shipData || shipData.length === 0) { 
            return res.status(404).json({ error: 'No shipData found' });
        }

        res.json(shipData);

    } catch (error) {
        console.error('Error fetching shipData:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}




const changeStatus = async (req , res) => {

    try {
        const shipmentId = req.params.id;
    
        console.log(`Request received to update shipmentId with ID: ${shipmentId}`);
        // Update the shipment status to 'Delivered'
        await collectionshipment.findByIdAndUpdate(shipmentId, { status: 'Delivered' });
        res.json({ message: 'Shipment status updated successfully' });
      } catch (error) {
        console.error('Error updating shipment status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}






module.exports = {

   
    loadInv,
    changeStatus

}