# EmailJS Setup Guide - Complete Email Integration

## 🎯 **EmailJS - The Best Free Solution**

EmailJS is the most reliable free email service for contact forms:
- ✅ **200 emails/month FREE** (more than enough)
- ✅ **No backend required** - works directly from frontend
- ✅ **No CORS issues** - reliable delivery
- ✅ **Professional email templates**
- ✅ **Easy setup** - 5 minutes

## 🚀 **Setup Steps (5 minutes):**

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up with your email: `alekhyakakunuri@gmail.com`
3. Verify your email address

### Step 2: Add Email Service
1. In EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose **"Gmail"** (or your preferred email service)
4. Connect your Gmail account
5. **Copy the Service ID** (looks like: `service_xxxxxxx`)

### Step 3: Create Email Template
1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template:

**Template Name:** `Contact Form Template`

**Subject:** `New Contact Form Submission from {{from_name}}`

**Content:**
```
Hello,

You have received a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Course Interest: {{course_interest}}

Message:
{{message}}

Best regards,
Knowledge Pathways Plus Contact Form
```

4. **Copy the Template ID** (looks like: `template_xxxxxxx`)

### Step 4: Get Public Key
1. Go to **"Account"** → **"General"**
2. **Copy your Public Key** (looks like: `xxxxxxxxxxxxxxx`)

### Step 5: Update Your Code
In `src/lib/emailService.ts`, replace these values:

```typescript
const EMAILJS_SERVICE_ID = 'your_service_id_here';
const EMAILJS_TEMPLATE_ID = 'your_template_id_here';
const EMAILJS_PUBLIC_KEY = 'your_public_key_here';
```

### Step 6: Test It!
1. Fill out your contact form
2. Submit it
3. Check your email for the notification!

## 🎉 **What Happens:**
1. User fills contact form
2. EmailJS sends email directly to your Gmail
3. You get notification with all form details
4. User sees success message
5. Form resets automatically

## 💰 **Pricing:**
- **Free**: 200 emails/month
- **Paid**: $15/month for 1,000 emails

## 🔧 **Features:**
- ✅ Loading spinner while sending
- ✅ Success/error messages
- ✅ Form validation
- ✅ Automatic form reset
- ✅ Professional email templates
- ✅ No CORS issues
- ✅ Reliable delivery

---

**EmailJS is the most reliable solution! Just get your 3 IDs and replace them in the code.**
