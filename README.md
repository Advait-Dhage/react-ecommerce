E-Commerce App
An interactive and responsive e-commerce application built with React, Redux, and JSON Server for backend simulation, featuring modern UI/UX principles.

- Table of Contents
- Features
- Used
- Setup and Installation
- How to Use
- Future Enhancements
- Contributing

Features
Product Listing: View products fetched from the JSON Server.
Product Search: Real-time search functionality debounce to optimize performance.
Product Details: View detailed descriptions each product.
Shopping Cart Add, remove or modify products with updated total price.
User Authentication: Simulated login/logout for a personalized experience.
Checkout Process: Simplified checkout flow with validation.
Loading States: provided during API requests Loader.

Technologies Used
Frontend: React (with functional components and hooks)
State Management: Redux
Backend Simulation: JSON Server
Loading States: React Loader
Styling: tailwind

Setup and Installation
Follow these steps run the project locally:

Clone this repository:

Copy code
```bash
git clone https://github.com/Advait-Dhage/react-ecommerce.git

cd react-ecommerce
```

Install dependencies:


Copy code
```bash
npm install
```

Set up JSON Server:

Navigate to the root directory.
 the following command to start the server:

```bash
json-server --watch db.json --port 8080
```
Start React app:

```bash
npm start
```

Open app in browser:

Visit http://localhost:3000 in your browser.

- How to Use
- Browse the product catalog on the home page.
- Click on a product to view its details.
- Add products to your cart and manage quantities.
- Proceed to checkout to complete the simulated purchase.

Future Enhancements
- Integrate a real backend (e.g., Node.js, Express, or Firebase).
- Add user registration and persistent authentication.
- Enhance search functionality with filters (e.g., category, price range).
- Integrate payment gateways like Stripe or PayPal.
- Improve UI/UX with animations and accessibility features.

