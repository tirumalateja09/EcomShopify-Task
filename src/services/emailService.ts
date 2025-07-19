import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, EmailTemplateParams } from '../config/emailjs';
import { CartItem } from '../types';

export class EmailService {
  private static instance: EmailService;

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

 // emailjs
  init() {
    try {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      console.log('EmailJS initialized successfully');
    } catch (error) {
      console.error('Failed to initialize EmailJS:', error);
    }
  }

  
  async sendPaymentNotification(orderData: {
    orderId: string;
    userEmail: string;
    userName: string;
    items: CartItem[];
    total: number;
    paymentId: string;
  }): Promise<boolean> {
    try {

      if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID || !EMAILJS_CONFIG.PUBLIC_KEY) {
        console.warn('EmailJS not configured. Using demo mode.');
        this.logDemoEmail(orderData);
        return true;
      }

    
      const itemsList = orderData.items
        .map(item => `${item.product.name} x ${item.quantity} - $${(item.product.price * item.quantity).toFixed(2)}`)
        .join('\n');

      const templateParams: EmailTemplateParams = {
        to_email: EMAILJS_CONFIG.SUPER_ADMIN_EMAIL,
        to_name: 'Super Admin',
        from_name: 'Shopify Payment System',
        order_id: orderData.orderId,
        customer_name: orderData.userName,
        customer_email: orderData.userEmail,
        total_amount: `$${orderData.total.toFixed(2)}`,
        payment_id: orderData.paymentId,
        items_list: itemsList,
        order_date: new Date().toLocaleString(),
        reply_to: 'noreply@Shopify.com'
      };

      console.log('Sending email notification with params:', templateParams);

  
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        console.log('Email notification sent successfully:', response);
        return true;
      } else {
        console.error('Failed to send email notification:', response);
        return false;
      }
    } catch (error) {
      console.error('Error sending email notification:', error);
      this.logDemoEmail(orderData);
      return false;
    }
  }

  private logDemoEmail(orderData: {
    orderId: string;
    userEmail: string;
    userName: string;
    items: CartItem[];
    total: number;
    paymentId: string;
  }) {
    console.log('📧 DEMO EMAIL NOTIFICATION:', {
      to: EMAILJS_CONFIG.SUPER_ADMIN_EMAIL,
      subject: `New Payment Received - Order ${orderData.orderId}`,
      content: {
        orderID: orderData.orderId,
        customer: orderData.userName,
        email: orderData.userEmail,
        total: `$${orderData.total.toFixed(2)}`,
        paymentID: orderData.paymentId,
        items: orderData.items.map(item => `${item.product.name} x ${item.quantity}`).join(', '),
        timestamp: new Date().toLocaleString()
      }
    });
  }

 
  async sendOrderConfirmation(orderData: {
    orderId: string;
    userEmail: string;
    userName: string;
    items: CartItem[];
    total: number;
    paymentId: string;
  }): Promise<boolean> {
    try {

      const templateParams = {
        to_email: orderData.userEmail,
        to_name: orderData.userName,
        from_name: 'Shopify',
        order_id: orderData.orderId,
        total_amount: `$${orderData.total.toFixed(2)}`,
        payment_id: orderData.paymentId,
        items_list: orderData.items
          .map(item => `${item.product.name} x ${item.quantity}`)
          .join(', '),
        order_date: new Date().toLocaleString(),
        reply_to: 'support@Shopify.com'
      };

   
      console.log('Customer confirmation email would be sent:', templateParams);
      return true;
    } catch (error) {
      console.error('Error sending customer confirmation:', error);
      return false;
    }
  }
}