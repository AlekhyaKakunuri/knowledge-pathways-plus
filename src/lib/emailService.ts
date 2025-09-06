import emailjs from '@emailjs/browser';

// EmailJS configuration - you'll get these from EmailJS dashboard
const EMAILJS_SERVICE_ID = 'service_mx9dqfo';
const EMAILJS_TEMPLATE_ID = 'template_o75ofc1';
const EMAILJS_PUBLIC_KEY = 'Hs3Vxn4XoNT2uYn3Z';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  courseInterest: string;
  message: string;
}

export const sendEmail = async (formData: ContactFormData): Promise<{ success: boolean; error?: string }> => {
  try {
    // Initialize EmailJS with your public key
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Prepare template parameters - these must match your EmailJS template variables
    const templateParams = {
      from_name: `${formData.firstName} ${formData.lastName}`,
      from_email: formData.email,
      phone: formData.phone,
      course_interest: formData.courseInterest,
      message: formData.message,
      to_email: 'alekhyakakunuri@gmail.com', // Your business email
    };

    // Send email
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return { success: true };

  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send email' 
    };
  }
};
