let express = require('express');
const { generateToken } = require('../token/tokenauth')
const bcrypt = require('bcryptjs');

const collectionemployee = require('../model/employeeDB')


//EmployeeLogin

const employeeLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Received email:', email);
        console.log('Received password:', password);
        

        if (!email || !password) {
            console.log('Email or password missing');
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const employee = await collectionemployee.findOne({ email });

        console.log('Employee found in database:', employee);

        if (!employee) {
            console.log('Employee not found in database');
            return res.status(401).json({ message: 'Authentication failed' });
        }


        const token = generateToken(employee);

        console.log('Generated JWT Token:', token);

        res.status(200).json({ message: 'Authentication successful', employee, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



module.exports = {

    employeeLogin

}
