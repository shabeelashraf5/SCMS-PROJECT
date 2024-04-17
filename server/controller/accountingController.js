let express = require('express');


const invoicing = require('../model/invoiceDS')
const collectionshipment = require('../model/shipmentDB')
const generateCustomShipment = require('../uuid/idshipment')
const stripe = require('stripe')(process.env.PRIV_KEY);
const stripeService = require('../payment/stripe.service')

/*
const loadInv = async (req, res) => {

    try {

        const employeeId = req.userData.userId;
        console.log('Customer ID:', employeeId);
        res.setHeader('Cache-Control', 'no-cache, no-store');
        
    
        const invData = await invoicing.find({})
    .populate({
        path: 'purchase_id',
        select: 'totalAmount po_id',
        populate: {
            path: 'po_id',
            model: 'purchase-po',
            select: 'po quotation_id',
            populate: {
                path: 'quotation_id',
                model: 'quotation',
                select: 'salesRFQ_id to totalAmount totalprice',
                populate: {
                    path: 'salesRFQ_id',
                    model: 'sales-rfq',
                    select: 'srfq'
                }
            }
        }
    }).exec();
    
        console.log('invData:', invData);

        if (!invData || invData.length === 0) { 
            return res.status(404).json({ error: 'No invData found' });
        }

        res.json(invData);
    } catch (error) {
        console.error('Error fetching invData:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
} */


const loadInv = async (req, res) => {
    try {
        const employeeId = req.userData.userId;
        console.log('Customer ID:', employeeId);
        res.setHeader('Cache-Control', 'no-cache, no-store');
        
        const invData = await invoicing.find({})
            .populate({
                path: 'employee_id',
                select: 'fname lname', // Specify the fields you want to populate
                model: 'employee' // Assuming the model name is 'employee'
            })
            .populate({
                path: 'purchase_id',
                select: 'totalAmount po_id',
                populate: {
                    path: 'po_id',
                    model: 'purchase-po',
                    select: 'po quotation_id',
                    populate: {
                        path: 'quotation_id',
                        model: 'quotation',
                        select: 'salesRFQ_id to totalAmount totalprice',
                        populate: {
                            path: 'salesRFQ_id',
                            model: 'sales-rfq',
                            select: 'srfq'
                        }
                    }
                }
            })
            .exec();
        
        console.log('invData:', invData);

        if (!invData || invData.length === 0) { 
            return res.status(404).json({ error: 'No invData found' });
        }

        res.json(invData);
    } catch (error) {
        console.error('Error fetching invData:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



const invoiceSingle = async function (req, res) {
    const employeeId = req.userData.userId;
    const invoiceId = req.params.id;
    try {
        const invSingle = await invoicing.findOne({  _id: invoiceId })
        .populate({
            path: 'purchase_id',
            select: 'totalAmount to products po_id',
            populate: {
                path: 'po_id',
                model: 'purchase-po',
                select: 'po quotation_id',
                populate: {
                    path: 'quotation_id',
                    model: 'quotation',
                    select: 'salesRFQ_id to attention clientrfq totalAmount totalprice products',
                    populate: {
                        path: 'salesRFQ_id',
                        model: 'sales-rfq',
                        select: 'srfq'
                    }
                }
            }
        }).exec();


        if (!invSingle) {
            return res.status(404).json({ error: 'invSingle not found' });
        }
        res.json(invSingle);
        console.log(invSingle)
    } catch (error) {
        console.error('Error fetching invSingle:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




const addshipment = async (req, res) => {

    const employeeId = req.userData.userId; 

    const shipmenteData = {
       
        employee_id: employeeId,
        shipment: generateCustomShipment(),
        invoice_id: req.body.invoice_id,
        status: 'Not Delivered'
      
         
    };

    console.log('shipmenteData:', shipmenteData);


    try {
      
        await collectionshipment.create(shipmenteData); 
        console.log('shipmenteData added successfully');

        await  invoicing.findByIdAndUpdate(
            req.body.invoice_id,
            { status: 'Confirmed' }
        );

           
        return res.json({
            success: true,
            message: 'shipmenteData added successfully'
        });
        
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.shipment === 1) {
            
            console.error('shipment no already exists:', error.keyValue.shipment);
            return res.status(400).json({
                success: false,
                message: 'shipmenteData already exists'
            });
        } else {
            console.error('Error adding shipmenteData:', error);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while adding the shipmenteData'
            });
        }
    }
};




const loadTrans = async (req, res) => {

    try {

        const employeeId = req.userData.userId;
        console.log('Customer ID:', employeeId);
        res.setHeader('Cache-Control', 'no-cache, no-store');
        
    
        const transData = await invoicing.find({})
    .populate({
                path: 'employee_id',
                select: 'fname lname', // Specify the fields you want to populate
                model: 'employee' // Assuming the model name is 'employee'
            })
            .populate({
                path: 'purchase_id',
                select: 'totalAmount po_id to',
                populate: {
                    path: 'po_id',
                    model: 'purchase-po',
                    select: 'po quotation_id',
                    populate: {
                        path: 'quotation_id',
                        model: 'quotation',
                        select: 'salesRFQ_id to totalAmount totalprice',
                        populate: {
                            path: 'salesRFQ_id',
                            model: 'sales-rfq',
                            select: 'srfq'
                        }
                    }
                }
            }).exec();
    
        console.log('transData:', transData);

        if (!transData || transData.length === 0) { 
            return res.status(404).json({ error: 'No transData found' });
        }

        res.json(transData);
    } catch (error) {
        console.error('Error fetching invData:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



const transSingle = async function (req, res) {
    const employeeId = req.userData.userId;
    const invoiceId = req.params.id;
    try {
        const transSingle = await invoicing.findOne({  _id: invoiceId })
        .populate({
            path: 'purchase_id',
            select: 'totalAmount to products supplierrfq basis po_id',
            populate: {
                path: 'po_id',
                model: 'purchase-po',
                select: 'po quotation_id',
                populate: {
                    path: 'quotation_id',
                    model: 'quotation',
                    select: 'salesRFQ_id to attention clientrfq totalAmount products',
                    populate: {
                        path: 'salesRFQ_id',
                        model: 'sales-rfq',
                        select: 'srfq'
                    }
                }
            }
        }).exec();


        if (!transSingle) {
            return res.status(404).json({ error: 'transSingle not found' });
        }
        res.json(transSingle);
        console.log(transSingle)
    } catch (error) {
        console.error('Error fetching transSingle:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


/*
const paymentSup = async function (req, res) {

    try {

        const { amount , currency } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({

          amount,
          currency 

        });

        res.json({ sessionId: paymentIntent.id });
      } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
      }

}
*/


const paymentSup = async function (req, res) {
    try {
        const { amount, currency, invoiceId } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: currency,
                    unit_amount: amount,
                    product_data: {
                        name: 'Total Amount', 
                    },
                },
                quantity: 1,
            }],
            mode: 'payment',
           // success_url: "http://localhost:4200/success?session_id={CHECKOUT_SESSION_ID}",
            success_url: "http://localhost:4200/portal/accounting/financial-transaction?session_id={CHECKOUT_SESSION_ID}",
            //success_url: "http://localhost:4200/accounting/financial-transaction?session_id={CHECKOUT_SESSION_ID}&redirect_to=success",
            cancel_url: "http://localhost:4200/portal/accounting/financial-transaction",
            customer_email: 'test@example.com', // Dummy customer email
            billing_address_collection: 'required',
        });

        await invoicing.findOneAndUpdate({ _id: invoiceId }, { $set: { payment: 'Paid' } });

        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
}

 


const createPaymentSession = (req, res, next) => {
    stripeService.createSession({priceId: req.body.priceId}, (response) => {
        return res.status(200).send(response); 
    });
};


/*
const createPaymentSession = async function(req, res) {
    try {
        const { amount } = req.body;
        if (!amount) {
            return res.status(400).json({ error: 'Price ID is required.' });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: amount,
                    quantity: 1, // Assuming quantity is 1
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:4200/success',
            cancel_url: 'http://localhost:4200/cancel',
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
}

*/

const confirmPayment = async function (req, res)  {
    const invoiceId = req.params.id;
    try {
        const updatedInvoice = await invoicing.findOneAndUpdate(
            { _id: invoiceId },
            { $set: { payment: 'Paid' } }, // Update both payment status and overall status
            { new: true }
        );
        res.json(updatedInvoice);
    } catch (error) {
        console.error('Error confirming payment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}


const stripeWebHook = async (req,res) => {

    let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], 'your_stripe_webhook_secret');
  } catch (err) {
    console.error('Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const invoiceId = session.client_reference_id; // Assuming you set invoiceId as client_reference_id during session creation
    try {
      // Update payment status in your database
      await invoicing.findOneAndUpdate({ _id: invoiceId }, { $set: { payment: 'Paid' } });
    } catch (error) {
      console.error('Error updating payment status:', error);
      return res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
  }

  res.status(200).json({ received: true });
}



module.exports = {

    loadInv,
    invoiceSingle,
    addshipment,
    loadTrans,
    transSingle,
    paymentSup,
    createPaymentSession,
    confirmPayment,
    stripeWebHook 


}