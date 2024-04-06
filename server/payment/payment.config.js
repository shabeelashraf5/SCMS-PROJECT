const STRIPE_CONFIG = {

    SECRET_KEY: "sk_test_51OvQEMSIJEtGIYvEykZlGOg6rv3Gsx1KknXpggAUzA5VjnHa1EO8SqSTdBMIJujfIpZr24r2k0aGFj6Smsb5YNdB00t1KOWIWL",
    CURRENCY: "INR",
    SUCCESS_URL : "http://localhost:4200/success?session_id={CHECKOUT_SESSION_ID}",
    CANCEL_URL :  "http://localhost:4200/payment"

}


module.exports = {

    STRIPE_CONFIG
}