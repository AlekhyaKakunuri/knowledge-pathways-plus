# 🎓 EduPlatform - Udemy-Style Learning Platform

A modern learning platform that combines subscription-based blog access with one-time course purchases, similar to Udemy's business model.

## 🏗️ **Architecture Overview**

### **Dual Access Model**
- **Blogs**: Subscription-based access (Free vs Subscribed plans)
- **Courses**: One-time purchase with lifetime access (Udemy-style)

### **Key Features**
- ✅ **Free Plan**: Access to free blogs only
- ✅ **Subscribed Plan**: Access to all blogs (free + premium)
- ✅ **Course Purchase**: Individual course pricing with lifetime access
- ✅ **UPI Payment Integration**: Indian payment gateway support
- ✅ **Row Level Security**: Database-level access control
- ✅ **Real-time Access Control**: Instant unlock after payment

## 📊 **Database Schema**

### **Core Tables**

#### 1. **users**
```sql
- id (UUID, Primary Key)
- email (VARCHAR, Unique)
- full_name (VARCHAR)
- password_hash (VARCHAR)
- avatar_url (TEXT)
- is_active (BOOLEAN)
- email_verified (BOOLEAN)
- created_at, updated_at (TIMESTAMP)
```

#### 2. **plans** (Blog Subscriptions Only)
```sql
- id (UUID, Primary Key)
- name (VARCHAR) - 'free', 'subscribed'
- display_name (VARCHAR)
- price_inr (DECIMAL(10,2)) - 0.00 for free, 999.00 for subscribed
- duration_days (INTEGER) - 0 for free, 30 for monthly
- features (JSONB)
- is_active (BOOLEAN)
```

#### 3. **user_subscriptions** (Blog Access)
```sql
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key)
- plan_id (UUID, Foreign Key)
- payment_status (VARCHAR) - 'PAID', 'FAILED', 'PENDING'
- subscription_status (VARCHAR) - 'ACTIVE', 'EXPIRED', 'CANCELLED'
- amount_inr (DECIMAL(10,2))
- subscription_start, subscription_end (TIMESTAMP)
- payment_gateway, payment_reference (VARCHAR)
```

#### 4. **blogs**
```sql
- id (UUID, Primary Key)
- title, slug, content (VARCHAR/TEXT)
- content_type (VARCHAR) - 'FREE' or 'PREMIUM'
- author_id (UUID, Foreign Key)
- tags (TEXT[])
- is_published (BOOLEAN)
- featured_image_url, read_time_minutes
```

#### 5. **courses** (One-time Purchase)
```sql
- id (UUID, Primary Key)
- title, slug, description (VARCHAR/TEXT)
- price_inr (DECIMAL(10,2)) - Individual course price
- original_price_inr (DECIMAL(10,2)) - For discount display
- access_type (VARCHAR) - 'LIFETIME'
- duration, level, category (VARCHAR)
- instructor_id (UUID, Foreign Key)
- featured_image_url, preview_video_url
```

#### 6. **user_courses** (Course Ownership)
```sql
- id (UUID, Primary Key)
- user_id, course_id (UUID, Foreign Keys)
- payment_status (VARCHAR) - 'PAID', 'FAILED', 'PENDING'
- access_status (VARCHAR) - 'ACTIVE', 'EXPIRED', 'REVOKED'
- amount_paid_inr (DECIMAL(10,2))
- purchase_date (TIMESTAMP)
- expires_at (TIMESTAMP) - NULL for lifetime access
- payment_gateway, payment_reference
```

#### 7. **course_modules & course_lessons**
```sql
- Hierarchical course structure
- Access controlled by user_courses ownership
- Order-based navigation
- Multiple content types (VIDEO, TEXT, QUIZ, ASSIGNMENT)
```

## 🔐 **Access Control Logic**

### **Blog Access Control**
```typescript
// Function: can_access_blog(user_uuid, blog_id)
if (blog.content_type === 'FREE') return TRUE;
if (blog.content_type === 'PREMIUM') {
  return user_has_active_subscription && plan_name === 'subscribed';
}
return FALSE;
```

### **Course Access Control**
```typescript
// Function: can_access_course(user_uuid, course_id)
return user_owns_course && payment_status === 'PAID' && access_status === 'ACTIVE';
```

### **Row Level Security (RLS)**
- **Blogs**: Users see only blogs they have access to
- **Courses**: Users see all published courses, but content is locked
- **Modules/Lessons**: Only accessible to course owners
- **User Data**: Users can only see their own subscriptions and purchases

## 💳 **Payment Flow**

### **Blog Subscription**
1. User selects "Subscribed Plan" (₹999/month)
2. Redirected to UPI payment
3. After successful payment:
   - `user_subscriptions` record created
   - `payment_status` = 'PAID'
   - `subscription_status` = 'ACTIVE'
   - Premium blogs become accessible

### **Course Purchase**
1. User clicks "Enroll Now" on course card
2. Redirected to UPI payment for course price
3. After successful payment:
   - `user_courses` record created
   - `payment_status` = 'PAID'
   - `access_status` = 'ACTIVE'
   - Course unlocks permanently (lifetime access)

## 🚀 **Implementation Steps**

### **1. Database Setup**
```bash
# Run the complete schema
psql -d your_database -f database-schema.sql
```

### **2. Frontend Integration**
```typescript
// For blog access
import { useBlogSubscription } from '@/services/subscriptionService';
const { userPlan, canAccessBlog } = useBlogSubscription(userId);

// For course access
import { useCourseAccess } from '@/services/subscriptionService';
const { canAccessCourse, purchaseCourse } = useCourseAccess(userId);
```

### **3. Course Lock Screen**
```typescript
// Show lock screen for non-owners
if (!canAccessCourse(courseId)) {
  return <CourseLockScreen course={course} onEnroll={handleEnroll} />;
}
```

### **4. Payment Integration**
```typescript
// After UPI payment success
const purchase = await purchaseCourse(
  userId,
  courseId,
  course.price_inr,
  'razorpay',
  paymentReference
);
```

## 📱 **User Experience Flow**

### **Free User Journey**
1. **Homepage**: Sees free blogs and course previews
2. **Blogs**: Can read free blogs only
3. **Courses**: Sees lock screen with "Premium Content" message
4. **Enroll Button**: Redirects to UPI payment
5. **After Payment**: Course unlocks forever

### **Subscribed User Journey**
1. **Blogs**: Access to all blogs (free + premium)
2. **Courses**: Still sees lock screen (subscription doesn't unlock courses)
3. **Course Purchase**: Individual course pricing applies
4. **Lifetime Access**: Once purchased, course remains unlocked

### **Course Owner Journey**
1. **Course Access**: Full access to purchased course content
2. **Modules**: Can view all course modules
3. **Lessons**: Can access all lessons within modules
4. **Progress**: Track learning progress
5. **Certificate**: Earn completion certificate

## 🔧 **Key Functions & Queries**

### **Access Control Functions**
```sql
-- Check blog access
SELECT can_access_blog('user-uuid', 'blog-uuid');

-- Check course access
SELECT can_access_course('user-uuid', 'course-uuid');

-- Get user's blog plan
SELECT * FROM get_user_blog_plan('user-uuid');

-- Get user's purchased courses
SELECT * FROM get_user_purchased_courses('user-uuid');
```

### **Common Queries**
```sql
-- Get all blogs user can access
SELECT b.* FROM blogs b 
WHERE b.is_published = true 
AND (b.content_type = 'FREE' OR can_access_blog('user-uuid', b.id));

-- Get user's purchased courses
SELECT c.* FROM courses c 
JOIN user_courses uc ON c.id = uc.course_id
WHERE uc.user_id = 'user-uuid'
AND uc.payment_status = 'PAID'
AND uc.access_status = 'ACTIVE';

-- Handle course purchase
INSERT INTO user_courses (user_id, course_id, payment_status, access_status, amount_paid_inr, payment_gateway, payment_reference)
VALUES ('user-uuid', 'course-uuid', 'PAID', 'ACTIVE', 499.00, 'razorpay', 'pay_ref_123');
```

## 🎯 **Business Logic**

### **Revenue Model**
- **Blog Subscriptions**: ₹999/month recurring revenue
- **Course Sales**: One-time purchases (₹499, ₹999, ₹1999, etc.)
- **No Course Subscriptions**: Courses are lifetime purchases

### **Access Rules**
- **Free Plan**: Only free blogs
- **Subscribed Plan**: All blogs + individual course purchases
- **Course Access**: Requires individual purchase, not subscription

### **User Retention**
- **Blogs**: Monthly subscription keeps users engaged
- **Courses**: Lifetime access encourages completion
- **Cross-selling**: Blog subscribers more likely to purchase courses

## 🛡️ **Security Features**

### **Database Security**
- **Row Level Security (RLS)**: Enforces access at database level
- **UUID Primary Keys**: Prevents enumeration attacks
- **Payment Validation**: Server-side payment status verification
- **Access Control Functions**: Centralized permission logic

### **Application Security**
- **TypeScript**: Type-safe API calls
- **React Hooks**: Encapsulated business logic
- **Error Handling**: Graceful fallbacks for failed operations
- **Payment Gateway**: Secure payment processing

## 📈 **Performance Optimizations**

### **Database Indexes**
```sql
-- User lookups
CREATE INDEX idx_users_email ON users(email);

-- Subscription queries
CREATE INDEX idx_user_subscriptions_status ON user_subscriptions(subscription_status, payment_status);

-- Course access checks
CREATE INDEX idx_user_courses_status ON user_courses(payment_status, access_status);

-- Content filtering
CREATE INDEX idx_blogs_content_type ON blogs(content_type);
CREATE INDEX idx_courses_published ON courses(is_published);
```

### **Query Optimization**
- **Function-based Access Control**: Reduces complex JOINs
- **Eager Loading**: Fetch related data in single queries
- **Caching**: Cache user permissions and course access
- **Pagination**: Limit large result sets

## 🔄 **API Endpoints**

### **Blog Management**
```typescript
GET /api/blogs - Get accessible blogs
GET /api/blogs/:id - Get specific blog (if accessible)
POST /api/subscriptions - Create blog subscription
GET /api/subscriptions/status - Get subscription status
```

### **Course Management**
```typescript
GET /api/courses - Get all published courses
GET /api/courses/:id - Get course with access status
POST /api/courses/:id/purchase - Purchase course
GET /api/courses/:id/content - Get course content (if owned)
GET /api/courses/purchased - Get user's purchased courses
```

### **User Management**
```typescript
GET /api/user/profile - Get user profile
GET /api/user/stats - Get user statistics
PUT /api/user/profile - Update user profile
```

## 🚀 **Deployment Checklist**

### **Database**
- [ ] Run schema creation script
- [ ] Set up RLS policies
- [ ] Create initial plans (Free, Subscribed)
- [ ] Set up database backups

### **Backend**
- [ ] Configure Supabase connection
- [ ] Set up payment gateway integration
- [ ] Implement webhook handlers
- [ ] Set up error monitoring

### **Frontend**
- [ ] Integrate subscription service
- [ ] Implement course lock screens
- [ ] Add UPI payment flow
- [ ] Test access control logic

### **Testing**
- [ ] Unit tests for access control
- [ ] Integration tests for payment flow
- [ ] User acceptance testing
- [ ] Security penetration testing

## 📚 **Additional Resources**

### **Related Files**
- `database-schema.sql` - Complete database schema
- `src/services/subscriptionService.ts` - Access control service
- `src/components/PricingSection.tsx` - Subscription plans UI
- `src/components/UPIPayment.tsx` - Payment modal

### **Payment Integration**
- **Razorpay**: Indian payment gateway
- **Stripe**: International payments
- **Webhook Handling**: Payment confirmation
- **Refund Processing**: Failed payment handling

### **Monitoring & Analytics**
- **User Engagement**: Blog read time, course completion
- **Revenue Tracking**: Subscription vs course sales
- **Conversion Funnel**: Free → Subscribed → Course Purchase
- **Churn Analysis**: Subscription renewal rates

---

## 🎉 **Ready for Production!**

This platform architecture provides:
- ✅ **Scalable**: Handles growing user base
- ✅ **Secure**: Database-level access control
- ✅ **Flexible**: Easy to add new features
- ✅ **Profitable**: Dual revenue streams
- ✅ **User-friendly**: Clear access rules

Perfect for launching a Udemy-style learning platform in India! 🚀🇮🇳



