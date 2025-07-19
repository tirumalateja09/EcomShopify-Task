import { CartItem } from '../types';
import { toast } from 'react-toastify';
import { EmailService } from './emailService';


const STRIPE_PUBLISHABLE_KEY = 'pk_test_51234567890abcdef'; 
const STRIPE_SECRET_KEY = 'sk_test_51234567890abcdef'; 
export interface PaymentIntent {
  clientSecret: string;
  id: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  error?: string;
}

export class PaymentService {
  private static instance: PaymentService;

  static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  async createPaymentIntent(items: CartItem[], userEmail: string): Promise<PaymentIntent> {
 
    
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    
    try {
    
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${STRIPE_SECRET_KEY}`, 
        },
        body: JSON.stringify({
          items,
          total: Math.round(total * 100), 
          customerEmail: userEmail,
          currency: 'usd',
          automatic_payment_methods: {
            enabled: true,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      return await response.json();
    } catch (error) {
      console.error('Payment intent creation failed:', error);
      
    
      return {
        clientSecret: 'pi_mock_' + Math.random().toString(36).substr(2, 9) + '_secret_' + Date.now(),
        id: 'pi_mock_' + Math.random().toString(36).substr(2, 9)
      };
    }
  }

  async confirmPayment(paymentIntentId: string, paymentMethodId: string): Promise<PaymentResult> {
    try {
      
      
      console.log('Confirming payment:', { paymentIntentId, paymentMethodId });
      
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        return {
          success: true,
          paymentId: paymentIntentId
        };
      } else {
        return {
          success: false,
          error: 'Your card was declined. Please try a different payment method.'
        };
      }
    } catch (error) {
      console.error('Payment confirmation failed:', error);
      return {
        success: false,
        error: 'Payment processing failed. Please check your connection and try again.'
      };
    }
  }

  async sendPaymentNotification(orderData: {
    orderId: string;
    userEmail: string;
    userName: string;
    items: CartItem[];
    total: number;
    paymentId: string;
  }): Promise<void> {
    try {
      
      const emailService = EmailService.getInstance();
      
      console.log('Sending payment notification to super admin:', orderData);
      
    
      toast.success('✅ Payment processed successfully!');
      
      
      const emailSent = await emailService.sendPaymentNotification(orderData);
      
      if (emailSent) {
        toast.success('📧 Admin has been notified via email!');
        console.log('Email notification sent to kasanitirumalateja@gmail.com');
      } else {
        toast.info('📧 Admin notification logged (EmailJS setup required for real emails)');
        console.log('Email notification in demo mode - check console for details');
      }
      
    } catch (error) {
      console.error('Notification sending failed:', error);
      toast.error('📧 Failed to send admin notification');
    }
  }

  
  async initializeStripe() {
    try {
      
      console.log('Stripe would be initialized with key:', STRIPE_PUBLISHABLE_KEY);
      return null; 
    } catch (error) {
      console.error('Failed to initialize Stripe:', error);
      throw error;
    }
  }
}