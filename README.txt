Stripe example card:

Email: {your_email}
Card information: 4242424242424242
Expiration date: 01/26
CVC: 123
Name on card: {your_name}
Country: {your_country}


In case you experience problems using Stripe API, please try the following steps:

1. You need to delete the folder 'vendor' in the project and the files: 'composer.json' and 'composer.lock'.
2. Run the following command in the root folder of the project using the IDE's terminal: composer require stripe/stripe-php.
3. It will install all the required files and that's it.
