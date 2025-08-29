# 🎯 **Subscription-Based Platform - Complete Implementation Guide**

## 📋 **Overview**

This is a comprehensive subscription-based platform with three tiers:
- **Free Plan** → Users can only see free blogs
- **Subscribed Plan** → Users can see all blogs (free + premium) but not courses
- **Premium Plan** → Users can see all blogs and all courses

## 🗄️ **Database Schema**

### **Core Tables**

#### 1. **users** - User Account Information
```sql
- id (UUID, Primary Key)
- email (VARCHAR, Unique)
- full_name (VARCHAR)
- avatar_url (TEXT)
- created_at, updated_at (Timestamps)
```

#### 2. **plans** - Subscription Plan Details
```sql
- id (UUID, Primary Key)
- name (VARCHAR) - 'free', 'subscribed', 'premium'
- display_name (VARCHAR) - 'Free Plan', 'Subscribed Plan', 'Premium Plan'
- price_inr (DECIMAL(10,2)) - Price in Indian Rupees
- duration_days (INTEGER) - 0 for free, 30 for monthly, 365 for yearly
- features (JSONB) - Plan features as JSON array
- is_active (BOOLEAN)
```

#### 3. **user_subscriptions** - User Subscription Details
```sql
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key to users)
- plan_id (UUID, Foreign Key to plans)
- payment_status (VARCHAR) - 'PAID', 'FAILED', 'PENDING'
- subscription_status (VARCHAR) - 'ACTIVE', 'EXPIRED', 'CANCELLED'
- amount_inr (DECIMAL(10,2)) - Payment amount in INR
- currency (VARCHAR) - Default 'INR'
- payment_date, subscription_start, subscription_end (Timestamps)
- payment_gateway, payment_reference (Payment details)
```

#### 4. **blogs** - Blog Content
```sql
- id (UUID, Primary Key)
- title, slug, excerpt, content (Content fields)
- content_type (VARCHAR) - 'FREE' or 'PREMIUM'
- author_id (UUID, Foreign Key to users)
- tags (TEXT[]) - Array of tags
- is_published (BOOLEAN)
- published_at (Timestamp)
```

#### 5. **courses** - Course Content
```sql
- id (UUID, Primary Key)
- title, slug, description (Content fields)
- content_type (VARCHAR) - 'FREE' or 'PREMIUM'
- instructor_id (UUID, Foreign Key to users)
- duration_weeks, level, category (Course metadata)
- price_inr (DECIMAL(10,2)) - Course price in INR
- is_published (BOOLEAN)
```

#### 6. **course_modules** & **course_lessons** - Course Structure
```sql
- Hierarchical structure for courses
- Modules contain lessons
- is_locked field for premium content
- order_index for proper sequencing
```

## 🔐 **Access Control Logic**

### **Blog Access Rules**
```typescript
// Free Plan: Only FREE blogs
if (userPlan === 'free') {
  return blog.content_type === 'FREE';
}

// Subscribed Plan: All blogs (FREE + PREMIUM)
if (userPlan === 'subscribed') {
  return true; // Access to all blogs
}

// Premium Plan: All blogs (FREE + PREMIUM)
if (userPlan === 'premium') {
  return true; // Access to all blogs
}
```

### **Course Access Rules**
```typescript
// Free Plan: Only FREE courses
if (userPlan === 'free') {
  return course.content_type === 'FREE';
}

// Subscribed Plan: Only FREE courses
if (userPlan === 'subscribed') {
  return course.content_type === 'FREE';
}

// Premium Plan: All courses (FREE + PREMIUM)
if (userPlan === 'premium') {
  return true; // Access to all courses
}
```

## 🚀 **Implementation Steps**

### **Step 1: Database Setup**
1. Run the complete SQL schema from `database-schema.sql`
2. Verify all tables are created successfully
3. Check that default plans are inserted

### **Step 2: Service Integration**
1. Import `SubscriptionService` in your components
2. Use `useSubscriptionAccess` hook for React components
3. Implement access control checks before rendering content

### **Step 3: Component Updates**
1. Update blog components to check access
2. Update course components to check access
3. Add subscription prompts for locked content

## 💻 **Usage Examples**

### **React Component with Access Control**
```tsx
import { useSubscriptionAccess } from '@/services/subscriptionService';

const BlogList = ({ userId }: { userId: string }) => {
  const { 
    userPlan, 
    loading, 
    canAccessBlog, 
    getAccessibleBlogs,
    isPremiumUser 
  } = useSubscriptionAccess(userId);

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const accessibleBlogs = await getAccessibleBlogs(userId);
      setBlogs(accessibleBlogs);
    };
    
    if (userId) {
      fetchBlogs();
    }
  }, [userId, getAccessibleBlogs]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Your Plan: {userPlan?.display_name}</h2>
      {blogs.map(blog => (
        <BlogCard 
          key={blog.id} 
          blog={blog} 
          canAccess={blog.content_type === 'FREE' || isPremiumUser}
        />
      ))}
    </div>
  );
};
```

### **Direct Service Usage**
```typescript
import { SubscriptionService } from '@/services/subscriptionService';

// Check if user can access a specific blog
const canAccess = await SubscriptionService.canAccessBlog(userId, blogId);

// Get user's current plan
const userPlan = await SubscriptionService.getUserPlan(userId);

// Get all accessible blogs
const blogs = await SubscriptionService.getAccessibleBlogs(userId, 10);

// Get all accessible courses
const courses = await SubscriptionService.getAccessibleCourses(userId, 10);
```

## 🔒 **Row Level Security (RLS)**

The database includes RLS policies that automatically enforce access control:

```sql
-- Blogs RLS Policy
CREATE POLICY "Users can view accessible blogs" ON blogs
    FOR SELECT USING (
        is_published = true AND (
            content_type = 'FREE' OR 
            can_access_blog(auth.uid(), id)
        )
    );

-- Courses RLS Policy
CREATE POLICY "Users can view accessible courses" ON courses
    FOR SELECT USING (
        is_published = true AND (
            content_type = 'FREE' OR 
            can_access_course(auth.uid(), id)
        )
    );
```

## 💰 **Payment Integration**

### **Payment Processing Flow**
```typescript
// 1. User selects a plan
const plan = await SubscriptionService.getPlanByName('premium');

// 2. Process payment through gateway (Razorpay, Stripe, etc.)
const paymentResult = await processPaymentWithGateway(plan.price_inr);

// 3. Create subscription record
if (paymentResult.success) {
  const subscription = await SubscriptionService.processPayment(
    userId,
    plan.id,
    plan.price_inr,
    'razorpay',
    paymentResult.reference
  );
}
```

### **Payment Status Tracking**
- **PAID**: Payment successful, subscription active
- **FAILED**: Payment failed, subscription not created
- **PENDING**: Payment processing, subscription pending

## 📊 **Sample Queries**

### **Check User Access**
```sql
-- Check if user has access to a blog
SELECT can_access_blog('user-uuid', 'blog-uuid');

-- Check if user has access to a course
SELECT can_access_course('user-uuid', 'course-uuid');

-- Get user's current plan
SELECT * FROM get_user_plan('user-uuid');
```

### **Content Access**
```sql
-- Get all blogs user can access
SELECT b.* FROM blogs b 
WHERE b.is_published = true 
AND (b.content_type = 'FREE' OR can_access_blog('user-uuid', b.id));

-- Get all courses user can access
SELECT c.* FROM courses c 
WHERE c.is_published = true 
AND (c.content_type = 'FREE' OR can_access_course('user-uuid', c.id));
```

### **Subscription Analytics**
```sql
-- Get subscription statistics
SELECT 
    p.name as plan_name,
    COUNT(us.id) as total_subscriptions,
    COUNT(CASE WHEN us.subscription_status = 'ACTIVE' THEN 1 END) as active_subscriptions,
    SUM(CASE WHEN us.payment_status = 'PAID' THEN us.amount_inr ELSE 0 END) as total_revenue_inr
FROM plans p
LEFT JOIN user_subscriptions us ON p.id = us.plan_id
GROUP BY p.id, p.name
ORDER BY p.name;
```

## 🎨 **UI Components to Update**

### **Blog Components**
- `PopularBlogsSection.tsx` - Add access control checks
- `BlogDetail.tsx` - Show lock for premium content
- `AllBlogs.tsx` - Filter based on user plan

### **Course Components**
- `CoursesSection.tsx` - Add access control checks
- `CourseDetail.tsx` - Show lock for premium content
- `AllCourses.tsx` - Filter based on user plan

### **Subscription Components**
- `Pricing.tsx` - Display plan options
- `PremiumDetails.tsx` - Show subscription benefits
- Add subscription prompts throughout the app

## 🔧 **Configuration**

### **Environment Variables**
```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Payment Gateway Configuration
VITE_RAZORPAY_KEY_ID=your_razorpay_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

### **Plan Configuration**
```typescript
// Default plans in database
const defaultPlans = [
  {
    name: 'free',
    display_name: 'Free Plan',
    price_inr: 0.00,
    duration_days: 0,
    features: ['Free blogs access', 'Basic features']
  },
  {
    name: 'subscribed',
    display_name: 'Subscribed Plan',
    price_inr: 999.00,
    duration_days: 30,
    features: ['All blogs access', 'Premium blog content', 'Email support']
  },
  {
    name: 'premium',
    display_name: 'Premium Plan',
    price_inr: 1999.00,
    duration_days: 30,
    features: ['All blogs access', 'All courses access', 'Premium content', 'Priority support', 'Live sessions']
  }
];
```

## 🚨 **Important Notes**

### **Security Considerations**
1. **Always verify access on the server side** - Client-side checks are for UX only
2. **Use RLS policies** - They provide an additional security layer
3. **Validate user authentication** - Check user ID before any access control
4. **Sanitize user inputs** - Prevent SQL injection and other attacks

### **Performance Considerations**
1. **Use indexes** - All necessary indexes are included in the schema
2. **Cache user plans** - Avoid repeated database calls
3. **Batch access checks** - Check multiple items at once when possible
4. **Use pagination** - Limit results for large datasets

### **Scalability Considerations**
1. **Plan for growth** - Schema supports multiple subscription tiers
2. **Monitor performance** - Watch query execution times
3. **Consider caching** - Redis for frequently accessed data
4. **Database optimization** - Regular maintenance and optimization

## 🎉 **Ready to Use!**

This subscription system is production-ready and includes:
- ✅ **Complete database schema** with all required tables
- ✅ **Access control functions** for blogs and courses
- ✅ **TypeScript service** with comprehensive methods
- ✅ **React hooks** for easy integration
- ✅ **Row Level Security** policies
- ✅ **Sample queries** for common operations
- ✅ **Payment integration** helpers
- ✅ **Comprehensive documentation**

Start implementing by running the database schema and integrating the `SubscriptionService` into your components! 🚀



