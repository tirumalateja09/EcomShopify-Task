// EmailJS Configuration
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_kzvk5qr', 
  TEMPLATE_ID: 'template_wd0nojb', // Replace with your EmailJS template ID  
  PUBLIC_KEY: '8ou6K8eJCZoTtzGo3', // Replace with your EmailJS public key
  SUPER_ADMIN_EMAIL: 'kasanitirumalateja@gmail.com'
};

// EmailJS Template Variables
export interface EmailTemplateParams {
  to_email: string;
  to_name: string;
  from_name: string;
  order_id: string;
  customer_name: string;
  customer_email: string;
  total_amount: string;
  payment_id: string;
  items_list: string;
  order_date: string;
  reply_to: string;
}