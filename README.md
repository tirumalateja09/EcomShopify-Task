# Shopify - E-Commerce Payment Notification System

A modern e-commerce application with real-time payment processing and admin notifications.

## Features

- 🛒 Shopping cart functionality
- 💳 Secure payment processing (Stripe integration ready)
- 📧 Real-time email notifications to admin
- 👤 User authentication with Google
- 📊 Admin dashboard with payment analytics
- 📱 Responsive design
- 🔔 Toast notifications

## Email Notification Setup

This application uses EmailJS to send real email notifications to the super admin when payments are processed.

### EmailJS Setup Instructions:

1. **Create EmailJS Account:**
   - Go to [EmailJS.com](https://www.emailjs.com/)
   - Sign up for a free account

2. **Create Email Service:**
   - In EmailJS dashboard, go to "Email Services"
   - Add a new service (Gmail, Outlook, etc.)
   - Note down your Service ID

3. **Create Email Template:**
   - Go to "Email Templates"
   - Create a new template with these variables:
     ```
     {{to_email}} - Recipient email
     {{to_name}} - Recipient name
     {{from_name}} - Sender name
     {{order_id}} - Order ID
     {{customer_name}} - Customer name
     {{customer_email}} - Customer email
     {{total_amount}} - Order total
     {{payment_id}} - Payment ID
     {{items_list}} - List of items
     {{order_date}} - Order date
     ```
   - Note down your Template ID

4. **Get Public Key:**
   - Go to "Account" → "General"
   - Copy your Public Key

5. **Update Configuration:**
   - Open `src/config/emailjs.ts`
   - Replace the placeholder values:
     ```typescript
     export const EMAILJS_CONFIG = {
       SERVICE_ID: 'your_service_id_here',
       TEMPLATE_ID: 'your_template_id_here',
       PUBLIC_KEY: 'your_public_key_here',
       SUPER_ADMIN_EMAIL: 'kasanitirumalateja@gmail.com'
     };
     ```

### Email Template Example:

```html
Subject: New Payment Received - Order {{order_id}}

Hello {{to_name}},

A new payment has been received on Shopify!

Order Details:
- Order ID: {{order_id}}
- Customer: {{customer_name}} ({{customer_email}})
- Total Amount: {{total_amount}}
- Payment ID: {{payment_id}}
- Date: {{order_date}}

Items Ordered:
{{items_list}}

Best regards,
{{from_name}}
```

## How It Works

1. **User makes a payment** → Payment is processed
2. **Order is created** → Added to admin dashboard
3. **Email notification sent** → Super admin receives email via EmailJS
4. **Admin can view** → Real payment data in admin dashboard

## Admin Access

- Email: `kasanitirumalateja@gmail.com`
- Role: Super Admin
- Access: `/admin` route

## Technologies Used

- React 18 with TypeScript
- Redux Toolkit for state management
- Tailwind CSS for styling
- Firebase Authentication
- EmailJS for email notifications
- React Router for navigation
- React Toastify for notifications

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up EmailJS configuration (see above)
4. Start development server: `npm run dev`
5. Build for production: `npm run build`

## Environment Variables

No environment variables needed for basic functionality. EmailJS configuration is handled in the config file.

## Deployment

The application is deployed on Netlify and can be accessed at the provided URL.