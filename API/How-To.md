Getting Started
Our API is designed to allow platforms to offer a full payment solution as part of their product.

Using the API you can:

Create and manage Merchant on your platform
Allow merchants to accept credit card paymentsCreate standard transactions
Create recurring payments
Use our secured payment pages
Use Tokenization for delayed & future payments
Charge a platform fee from every transactionQuery data regarding sellers, transactions, subscriptions, withdrawals and more
PCI compliant and want to use the direct credit card API? Let us know!

By using the API you will be able to handle all transactions on your website without dealing with sensitive credit card details, processing difficulties or PCI compliancy.The basics are simple. You POST required information to our target URL's using JSON format and get replies structured in JSON format. You are free to use whatever programming language you prefer.

Note:
Do not forget to add the header Content-Type: application/json to your requests!Callbacks - We have an option to send out a server to server notifications, also known as "IPN".

For example: a customer successfully paying using the IFRAME; a successful subscription iteration. The format and details are described throughout this document. The callback is a POST request of type x-www-form-urlencoded to your provided target URL.
Sandbox and Production URLs
In order to work with the API, you should use the service URLs according to the required environments, Staging or Production.When interacting with the API, make sure you point to the correct environment, with the correct credentials. Both URLs will be stated next to each function.

ENVIRONMENT	URL
Staging	https://sandbox.payme.io/api/
Production	https://live.payme.io/api/


Test Cards and Payment Methods
Please use the following credit card when integrating only in the Staging environment.

Main credit card numbers for testing
EMV supported credit cards:

Credit Card	Details
Card Number: 4557430402053431 Expiration: 12/30 CVV:200 Social ID:008336174	Limitations: Acts as an international non-Israeli card. Accepts sales with only one installment. Accepts sales in ILS, USD, EUR.
Card Number: 375516193000090 Expiration: 12/30 CVV: 0957 Social ID:008336174	Limitations: Acts as an international Israeli card. Accepts sales with multiple installments. Accepts sales in ILS, USD, EUR.
Card Number: 5326105300985846 Expiration: 12/30 CVV: 658 Social ID:008336174	Limitations: Acts as a local Israeli card. Accepts sales with multiple installments. Accepts sales in ILS only.
Secondary credit card numbers for testing
Credit Card Type	Credit Card Number
Visa	4111111111111111 4200000000000000
Mastercard	5555555555554444 5454545454545454
AmericanExpress	378282246310005 377777777777770
Diners	38520000023237
Discover	6011000990139424
JCB	3530111333300000
Isracard	12312312
Credit card numbers for testing specific responses and errors
Card Number	Description
4000000000000002	Payment is declined with a card declined error
4000000000000051	Payment is declined with a card blocked error
4000000000000085	Payment is declined with a card stolen error
4000000000000069	Payment is declined with a card expired error
4000000000000101	Payment is declined with a required CVV error
4000000000000127	Payment is declined with an incorrect CVV
4000000000000135	Payment is declined with a credit limit reached error
4242424242424241	Payment is declined with an incorrect card number error