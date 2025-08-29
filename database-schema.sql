-- ========================================
-- EDUPLATFORM DATABASE SCHEMA
-- Udemy-style platform with subscription blogs + one-time course purchases
-- ========================================

-- ========================================
-- CORE TABLES
-- ========================================

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Plans table (for blog subscriptions only)
CREATE TABLE plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    price_inr DECIMAL(10,2) NOT NULL,
    duration_days INTEGER NOT NULL, -- 0 for free, 30 for monthly, etc.
    features JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User subscriptions (for blog access)
CREATE TABLE user_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES plans(id),
    payment_status VARCHAR(20) NOT NULL CHECK (payment_status IN ('PAID', 'FAILED', 'PENDING')),
    subscription_status VARCHAR(20) NOT NULL CHECK (subscription_status IN ('ACTIVE', 'EXPIRED', 'CANCELLED')),
    amount_inr DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    payment_date TIMESTAMP WITH TIME ZONE,
    subscription_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    subscription_end TIMESTAMP WITH TIME ZONE,
    payment_gateway VARCHAR(100),
    payment_reference VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blogs table
CREATE TABLE blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    content_type VARCHAR(20) NOT NULL CHECK (content_type IN ('FREE', 'PREMIUM')),
    author_id UUID REFERENCES users(id),
    tags TEXT[],
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    featured_image_url TEXT,
    read_time_minutes INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Courses table (one-time purchase, lifetime access)
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    price_inr DECIMAL(10,2) NOT NULL,
    original_price_inr DECIMAL(10,2), -- For discount display
    currency VARCHAR(3) DEFAULT 'INR',
    access_type VARCHAR(20) DEFAULT 'LIFETIME',
    duration VARCHAR(100), -- e.g., "6 Months", "12 Weeks"
    level VARCHAR(50), -- Beginner, Intermediate, Advanced
    category VARCHAR(100),
    instructor_id UUID REFERENCES users(id),
    featured_image_url TEXT,
    preview_video_url TEXT,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course modules
CREATE TABLE course_modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course lessons
CREATE TABLE course_lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID NOT NULL REFERENCES course_modules(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content_type VARCHAR(20) NOT NULL CHECK (content_type IN ('VIDEO', 'TEXT', 'QUIZ', 'ASSIGNMENT')),
    content_url TEXT,
    duration_minutes INTEGER,
    order_index INTEGER NOT NULL,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User courses (tracks purchased courses)
CREATE TABLE user_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    payment_status VARCHAR(20) NOT NULL CHECK (payment_status IN ('PAID', 'FAILED', 'PENDING')),
    access_status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (access_status IN ('ACTIVE', 'EXPIRED', 'REVOKED')),
    amount_paid_inr DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    payment_gateway VARCHAR(100),
    payment_reference VARCHAR(255),
    purchase_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE, -- NULL for lifetime access
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, course_id) -- Prevent duplicate purchases
);

-- ========================================
-- INDEXES FOR PERFORMANCE
-- ========================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

CREATE INDEX idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX idx_user_subscriptions_status ON user_subscriptions(subscription_status, payment_status);
CREATE INDEX idx_user_subscriptions_dates ON user_subscriptions(subscription_start, subscription_end);

CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_content_type ON blogs(content_type);
CREATE INDEX idx_blogs_published ON blogs(is_published, published_at);
CREATE INDEX idx_blogs_author ON blogs(author_id);

CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_courses_published ON courses(is_published, published_at);
CREATE INDEX idx_courses_instructor ON courses(instructor_id);
CREATE INDEX idx_courses_category ON courses(category);

CREATE INDEX idx_course_modules_course_id ON course_modules(course_id);
CREATE INDEX idx_course_modules_order ON course_modules(course_id, order_index);

CREATE INDEX idx_course_lessons_module_id ON course_lessons(module_id);
CREATE INDEX idx_course_lessons_order ON course_lessons(module_id, order_index);

CREATE INDEX idx_user_courses_user_id ON user_courses(user_id);
CREATE INDEX idx_user_courses_course_id ON user_courses(course_id);
CREATE INDEX idx_user_courses_status ON user_courses(payment_status, access_status);

-- ========================================
-- TRIGGERS FOR UPDATED_AT
-- ========================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_plans_updated_at BEFORE UPDATE ON plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_subscriptions_updated_at BEFORE UPDATE ON user_subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_course_modules_updated_at BEFORE UPDATE ON course_modules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_course_lessons_updated_at BEFORE UPDATE ON course_lessons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_courses_updated_at BEFORE UPDATE ON user_courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- ACCESS CONTROL FUNCTIONS
-- ========================================

-- Function to check if user has access to a blog
CREATE OR REPLACE FUNCTION can_access_blog(user_uuid UUID, blog_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    blog_content_type VARCHAR(20);
    user_plan_name VARCHAR(50);
    has_active_subscription BOOLEAN;
BEGIN
    -- Get blog content type
    SELECT content_type INTO blog_content_type
    FROM blogs WHERE id = blog_id;

    -- If blog not found, return false
    IF blog_content_type IS NULL THEN
        RETURN FALSE;
    END IF;

    -- If blog is free, always allow access
    IF blog_content_type = 'FREE' THEN
        RETURN TRUE;
    END IF;

    -- If blog is premium, check user subscription
    IF blog_content_type = 'PREMIUM' THEN
        -- Check if user has active subscription
        SELECT 
            p.name,
            CASE WHEN us.subscription_status = 'ACTIVE' AND us.payment_status = 'PAID' THEN TRUE ELSE FALSE END
        INTO user_plan_name, has_active_subscription
        FROM user_subscriptions us
        JOIN plans p ON us.plan_id = p.id
        WHERE us.user_id = user_uuid
        AND us.subscription_status = 'ACTIVE'
        AND us.payment_status = 'PAID'
        AND (us.subscription_end IS NULL OR us.subscription_end > NOW())
        ORDER BY us.created_at DESC
        LIMIT 1;

        -- Return true if user has subscribed plan
        RETURN has_active_subscription AND user_plan_name = 'subscribed';
    END IF;

    RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

-- Function to check if user owns a course
CREATE OR REPLACE FUNCTION can_access_course(user_uuid UUID, course_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    has_purchased BOOLEAN;
BEGIN
    -- Check if user has purchased the course
    SELECT 
        CASE WHEN payment_status = 'PAID' AND access_status = 'ACTIVE' THEN TRUE ELSE FALSE END
    INTO has_purchased
    FROM user_courses 
    WHERE user_id = user_uuid AND course_id = course_id;

    -- Return true if user has purchased and has active access
    RETURN COALESCE(has_purchased, FALSE);
END;
$$ LANGUAGE plpgsql;

-- Function to get user's current blog subscription plan
CREATE OR REPLACE FUNCTION get_user_blog_plan(user_uuid UUID)
RETURNS TABLE(
    plan_name VARCHAR(50),
    display_name VARCHAR(100),
    subscription_status VARCHAR(20),
    payment_status VARCHAR(20),
    amount_inr DECIMAL(10,2),
    subscription_end TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.name,
        p.display_name,
        us.subscription_status,
        us.payment_status,
        us.amount_inr,
        us.subscription_end
    FROM user_subscriptions us
    JOIN plans p ON us.plan_id = p.id
    WHERE us.user_id = user_uuid
    AND us.subscription_status = 'ACTIVE'
    AND us.payment_status = 'PAID'
    AND (us.subscription_end IS NULL OR us.subscription_end > NOW())
    ORDER BY us.created_at DESC
    LIMIT 1;
    
    -- If no active subscription, return free plan
    IF NOT FOUND THEN
        RETURN QUERY
        SELECT 
            'free'::VARCHAR(50),
            'Free Plan'::VARCHAR(100),
            'ACTIVE'::VARCHAR(20),
            'PAID'::VARCHAR(20),
            0.00::DECIMAL(10,2),
            NULL::TIMESTAMP WITH TIME ZONE;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to get user's purchased courses
CREATE OR REPLACE FUNCTION get_user_purchased_courses(user_uuid UUID)
RETURNS TABLE(
    course_id UUID,
    course_title VARCHAR(255),
    purchase_date TIMESTAMP WITH TIME ZONE,
    amount_paid_inr DECIMAL(10,2),
    access_status VARCHAR(20)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id,
        c.title,
        uc.purchase_date,
        uc.amount_paid_inr,
        uc.access_status
    FROM user_courses uc
    JOIN courses c ON uc.course_id = c.id
    WHERE uc.user_id = user_uuid
    AND uc.payment_status = 'PAID'
    AND uc.access_status = 'ACTIVE'
    ORDER BY uc.purchase_date DESC;
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- SAMPLE DATA INSERTION
-- ========================================

-- Insert default plans
INSERT INTO plans (name, display_name, description, price_inr, duration_days, features) VALUES
('free', 'Free Plan', 'Access to free blogs only', 0.00, 0, '["Free blogs access", "Basic features"]'),
('subscribed', 'Subscribed Plan', 'Access to all blogs (free + premium)', 999.00, 30, '["All blogs access", "Premium blog content", "Email support"]');

-- ========================================
-- SAMPLE QUERIES
-- ========================================

-- 1. Check if a user can view a specific blog
-- SELECT can_access_blog('user-uuid-here', 'blog-uuid-here');

-- 2. Check if a user owns a specific course
-- SELECT can_access_course('user-uuid-here', 'course-uuid-here');

-- 3. Get user's current blog subscription plan
-- SELECT * FROM get_user_blog_plan('user-uuid-here');

-- 4. Get user's purchased courses
-- SELECT * FROM get_user_purchased_courses('user-uuid-here');

-- 5. Get all blogs user can access
-- SELECT b.* FROM blogs b 
-- WHERE b.is_published = true 
-- AND (b.content_type = 'FREE' OR can_access_blog('user-uuid-here', b.id));

-- 6. Get all courses user has purchased
-- SELECT c.* FROM courses c 
-- JOIN user_courses uc ON c.id = uc.course_id
-- WHERE uc.user_id = 'user-uuid-here'
-- AND uc.payment_status = 'PAID'
-- AND uc.access_status = 'ACTIVE';

-- 7. Handle course purchase flow (insert into user_courses)
-- INSERT INTO user_courses (user_id, course_id, payment_status, access_status, amount_paid_inr, payment_gateway, payment_reference)
-- VALUES ('user-uuid-here', 'course-uuid-here', 'PAID', 'ACTIVE', 499.00, 'razorpay', 'pay_ref_123');

-- 8. Get user's active blog subscription with plan details
-- SELECT 
--     us.*,
--     p.name as plan_name,
--     p.display_name,
--     p.features
-- FROM user_subscriptions us
-- JOIN plans p ON us.plan_id = p.id
-- WHERE us.user_id = 'user-uuid-here'
-- AND us.subscription_status = 'ACTIVE'
-- AND us.payment_status = 'PAID'
-- AND (us.subscription_end IS NULL OR us.subscription_end > NOW());

-- 9. Get course purchase statistics
-- SELECT 
--     c.title,
--     COUNT(uc.id) as total_purchases,
--     COUNT(CASE WHEN uc.payment_status = 'PAID' THEN 1 END) as successful_purchases,
--     SUM(CASE WHEN uc.payment_status = 'PAID' THEN uc.amount_paid_inr ELSE 0 END) as total_revenue_inr
-- FROM courses c
-- LEFT JOIN user_courses uc ON c.id = uc.course_id
-- GROUP BY c.id, c.title
-- ORDER BY total_revenue_inr DESC;

-- 10. Check if user can access course content (for course detail page)
-- SELECT 
--     c.*,
--     CASE 
--         WHEN can_access_course('user-uuid-here', c.id) THEN 'UNLOCKED'
--         ELSE 'LOCKED'
--     END as access_status
-- FROM courses c
-- WHERE c.id = 'course-uuid-here';

-- ========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================

-- Enable RLS on tables
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_courses ENABLE ROW LEVEL SECURITY;

-- RLS Policy for blogs (users can only see published blogs they have access to)
CREATE POLICY "Users can view accessible blogs" ON blogs
    FOR SELECT USING (
        is_published = true AND (
            content_type = 'FREE' OR 
            can_access_blog(auth.uid(), id)
        )
    );

-- RLS Policy for courses (users can see all published courses, but access is controlled by user_courses)
CREATE POLICY "Users can view all published courses" ON courses
    FOR SELECT USING (is_published = true);

-- RLS Policy for course modules (only accessible if user owns the course)
CREATE POLICY "Users can view modules of owned courses" ON course_modules
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_courses uc 
            WHERE uc.course_id = course_modules.course_id 
            AND uc.user_id = auth.uid()
            AND uc.payment_status = 'PAID'
            AND uc.access_status = 'ACTIVE'
        )
    );

-- RLS Policy for course lessons (only accessible if user owns the course)
CREATE POLICY "Users can view lessons of owned courses" ON course_lessons
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM course_modules cm
            JOIN user_courses uc ON uc.course_id = cm.course_id
            WHERE cm.id = course_lessons.module_id
            AND uc.user_id = auth.uid()
            AND uc.payment_status = 'PAID'
            AND uc.access_status = 'ACTIVE'
        )
    );

-- RLS Policy for user subscriptions (users can only see their own subscriptions)
CREATE POLICY "Users can view own subscriptions" ON user_subscriptions
    FOR SELECT USING (user_id = auth.uid());

-- RLS Policy for user courses (users can only see their own course purchases)
CREATE POLICY "Users can view own course purchases" ON user_courses
    FOR SELECT USING (user_id = auth.uid());

-- ========================================
-- NOTES
-- ========================================

/*
KEY FEATURES OF THIS SCHEMA:

1. BLOG ACCESS (Subscription-based):
   - Free users: Only free blogs
   - Subscribed users: All blogs (free + premium)
   - No course access for either

2. COURSE ACCESS (One-time purchase):
   - Each course has individual INR price
   - Lifetime access after purchase
   - Stored in user_courses table
   - No subscription required

3. PAYMENT TRACKING:
   - user_subscriptions: For blog subscriptions
   - user_courses: For individual course purchases
   - Both track payment status and amounts in INR

4. ACCESS CONTROL:
   - can_access_blog(): Checks subscription for premium blogs
   - can_access_course(): Checks if user purchased the course
   - RLS policies enforce access at database level

5. UDEMY-STYLE BEHAVIOR:
   - Course cards show lock screen for non-owners
   - Enroll Now button triggers UPI payment
   - After payment, course unlocks forever
   - No monthly fees for courses
*/
