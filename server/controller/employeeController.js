let express = require('express');
const { generateToken } = require('../token/tokenauth')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const collectionemployee = require('../model/employeeDB')
const collectionmessage = require('../model/messageDB')
const chatMessage = require('../model/chatDB')


const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;



//EmployeeLogin



const employeeLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Received email:', email);
        console.log('Received password:', password);

        if (!email ) {
            console.log('Email or password missing');
            return res.status(400).json({ message: 'Email and password are required' });
        }

        
        if (!password) {
            console.log('Password is missing');
            return res.status(403).json({ message: 'Password is required' });
        }


        const employee = await collectionemployee.findOne({ email });

        console.log('Employee found in database:', employee);

        if (!employee) {
            console.log('Employee not found in database');
            return res.status(402).json({ message: 'Invalid Credentials' });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, employee.password);

        if (!passwordMatch) {
            console.log('Incorrect password');
            return res.status(401).json({ message: 'Authentication failed' });
        }

        await collectionemployee.updateOne({ email }, { $set: { is_online: 'online' } });

        const { token, refreshToken } = generateToken(employee);
        //const refreshToken = refreshTokens(employee)

        console.log('Generated JWT Token:', employee,  token );
        console.log('Generated Refresh JWT Token:', refreshToken  );
     

        res.status(200).json({ message: 'Authentication successful', employee, token , refreshToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



const refreshToken = async  (req , res) => {

 const refreshSecret = 'refreshSecret'; 

   const { refreshToken } = req.body;

   // Check if refresh token is provided
   if (!refreshToken) {
       return res.status(400).json({ message: 'Refresh token is required' });
   }

   try {
       // Verify the refresh token
       const decoded = jwt.verify(refreshToken, refreshSecret);

       // Assuming the decoded token contains user ID
       const user = await collectionemployee.findById(decoded.userId);
        
       console.log('Hello Users', user)
       // Generate a new access token
       const token = generateToken(user);
       console.log('Token' , token)

       res.status(200).json({ token });
   } catch (error) {
       console.error(error);
       res.status(401).json({ message: 'Invalid refresh token' });
   }
}







//Messaging

const loadMessage = async (req , res) => {

    try {
       
     
        res.setHeader('Cache-Control', 'no-cache, no-store');
        const message = await collectionmessage.find({}).populate({path: 'employee_id', select: 'fname lname image position'}).sort({date: -1}).exec(); 
        console.log('Message:', message);

        if (!message) {
            
            return res.status(404).json({ error: 'No messages found' });
          }

        res.json(message);
      } catch (error) {
    
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}


const addMessage = async (req, res) => {
    console.log('Request received to add a new message');
    console.log('Request body:', req.body);

    const employeeId = req.userData.userId; 


    const messageData = {
        employee_id: employeeId,
        message: req.body.message,
        date: new Date()
    };

    console.log('Message data:', messageData);

    try {
        await collectionmessage.create(messageData);
        console.log('Message added successfully');
        
        return res.json({
            success: true,
            message: 'Message added successfully'
        });
    } catch (error) {
       
            console.error('Error adding message:', error);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while adding the category'
            });
        
    }
}; 





const deleteMessage = async (req, res) => {
    const messageId = req.params.id; 
    
    console.log(`Request received to delete amessage with ID: ${messageId}`);

    try {
       
        await collectionmessage.findOneAndDelete( {_id: messageId});
        
        console.log('Message deleted successfully');
        
       
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



const loadProfileEmployee = async (req , res) => {

    try {
       
        const customerId = req.userData.userId;
        res.setHeader('Cache-Control', 'no-cache, no-store');
        const employeeProfile = await collectionemployee.findOne({_id: customerId }).exec(); 
        console.log('UsersProfile:', employeeProfile);
        console.log(customerId)

        if (!employeeProfile) {
            
            return res.status(404).json({ error: 'No admins found' });
          }

        res.json(employeeProfile);
      } catch (error) {
        
        console.error('Error fetching admins:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}


const displayResetPasswordPage = async (req, res) => {
    try {
        const { token } = req.query;
        // Check if the token is valid
        const user = await collectionemployee.findOne({ token });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }

        return res.json({
            success: true,
            token: token
        });
       

    } catch (error) {
        console.error('Error displaying reset password page:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred'
        });
    }
};


const resetPassword = async (req, res) => {
    try {

        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(400).json({
                success: false,
                message: 'Authorization header missing'
            });
        }

        const token = authHeader.split(' ')[1]; 
        const { password } = req.body;

        console.log('Token:', token);
        console.log('Password:', password);
        // Find the user by the token
        const user = await collectionemployee.findOne({ token });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }

        const isPasswordSame = await bcrypt.compare(password, user.password);

          if (isPasswordSame) {
            
            console.log('Change your password')
             return res.status(402).json({
                 success: false,
                  message: 'The new password cannot be the same as the existing password. Please choose a different one.'
            });
        }
   
        const hashedPassword = await bcrypt.hash(password, 10);
      
        await collectionemployee.updateOne({ token }, { $set: { password: hashedPassword }, $unset: { token: '' } });
       
        return res.json({
            success: true,
            message: 'Password reset successfully'
        });
    } catch (error) {
        console.error('Error resetting password:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred'
        });
    }
};


const loadEmVideo = async (req , res) => {

    try {
       
        const customerId = req.userData.userId;
        res.setHeader('Cache-Control', 'no-cache, no-store');
        const employeeProfile = await collectionemployee.findOne({_id: customerId }).exec(); 
        console.log('UsersProfile:', employeeProfile);
        console.log(customerId)

        if (!employeeProfile) {
            
            return res.status(404).json({ error: 'No admins found' });
          }

        res.json(employeeProfile);
      } catch (error) {
        
        console.error('Error fetching admins:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}


const loadChatUser = async (req , res) => {

    try {
       
        const customerId = req.userData.userId;
        res.setHeader('Cache-Control', 'no-cache, no-store');
        const employeeProfile = await collectionemployee.find({_id: { $nin: [ customerId ]} }).exec(); 
        console.log('UsersProfile:', employeeProfile);
        console.log(customerId)

        if (!employeeProfile) {
            
            return res.status(404).json({ error: 'No admins found' });
          }

        res.json(employeeProfile);
      } catch (error) {
        
        console.error('Error fetching admins:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}


const saveChat = async (req , res ) => {
    

    const employeeId = req.userData.userId; 

    const chatData = {
        
        sender_id: employeeId,
        receiver_id: req.body.receiver_id,
        message: req.body.message,
        isRead:  req.body.status || 'Delivered'
        
    };

    console.log('Message data:', chatData);
    
    try {

        const newChat = await chatMessage.create(chatData);
        console.log('Message added successfully');

        
        
        return res.json({
            success: true,
            message: 'Message added successfully',
            data: newChat
        });


    } catch(error) {

        console.error('Error fetching chats:', error);
        res.status(500).json({ error: 'Internal Server Error' });

    }
}


const loadChat = async (req , res) => {

    try {
        const { senderId, receiverId } = req.params;
        const messages = await chatMessage.find({
          $or: [
            { sender_id: senderId, receiver_id: receiverId },
            { sender_id: receiverId, receiver_id: senderId }
          ]
        }).sort({ createdAt: 1 }); // Assuming createdAt field for timestamps
        res.json(messages);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }


}

const EmployeeLogOut = async (req, res) => {

    try {
        const { employeeId } = req.body;

        // Update the user's online status to "offline" in the database
        await collectionemployee.findByIdAndUpdate(employeeId, { $set: { is_online: 'offline' } });

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).json({ message: 'Server error' });
    }

}



const markMessageAsSeen = async (req, res) => {
    const receiverId = req.userData.userId;
    const senderId = req.body.sender_id;

    try {
        // Update the message status to 'Seen'
        await chatMessage.updateMany(
            { sender_id: senderId, receiver_id: receiverId, isRead: 'Delivered' },
            { $set: { isRead: 'Seen' } }
        );
        console.log('Message added successfully');
        res.json({ success: true, message: 'Messages marked as Seen' });
    } catch (error) {
        console.error('Error marking messages as Seen:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




module.exports = {

    employeeLogin,
    loadMessage,
    addMessage,
    deleteMessage,
    resetPassword,
    loadProfileEmployee,
    displayResetPasswordPage,
    loadEmVideo,
    loadChatUser,
    saveChat,
    loadChat,
    EmployeeLogOut,
    refreshToken,
    markMessageAsSeen

}
