# Create Custom Attributes

Learn how to create and manage custom attributes for tracking user characteristics in Contentstack Personalize.

## Overview

Attributes are user characteristics or behaviors you want to track for personalization. While Personalize provides standard attributes (like browser, device, location), custom attributes let you track business-specific data like subscription status, purchase history, or campaign parameters.

**Time Required**: ~2-5 minutes per attribute

**Prerequisites**:
- ✅ Personalize project created
- ✅ Clear understanding of what user data you want to track

---

## Understanding Attributes

### Standard Attributes (Built-in)

Contentstack Personalize automatically tracks:

| Attribute | Description | Example Values |
|-----------|-------------|----------------|
| `browser` | User's browser | Chrome, Firefox, Safari |
| `device` | Device type | Desktop, Mobile, Tablet |
| `os` | Operating system | Windows, macOS, iOS, Android |
| `location.country` | User's country | US, UK, IN, DE |
| `location.region` | State/Province | California, Texas, Ontario |
| `location.city` | City name | San Francisco, London |
| `referrer` | Page referrer URL | https://google.com |
| `url` | Current page URL | https://example.com/products |

### Custom Attributes (You Define)

Create custom attributes for business-specific data:

| Use Case | Attribute Key | Example Values |
|----------|---------------|----------------|
| Marketing | `utm_source` | google, facebook, email |
| | `utm_medium` | cpc, social, newsletter |
| | `utm_campaign` | spring_sale, product_launch |
| User Profile | `subscription_tier` | free, premium, enterprise |
| | `age` | 25, 34, 52 |
| | `account_type` | personal, business |
| Behavior | `lifetime_value` | 0, 500, 5000 |
| | `last_purchase_date` | 2024-01-15 |
| | `cart_value` | 49.99, 129.99 |

---

## Step 1: Create Attribute via UI

### Method 1: Using Contentstack UI

1. **Navigate to Attributes**  
   In your Personalize project, click **"Attributes"** in the left sidebar

2. **Click "+ Create Attribute"** or **"+ New Attribute"**

3. **Fill in Attribute Details**:

   | Field | Description | Example |
   |-------|-------------|---------|
   | **Name** | Display name (user-friendly) | `UTM Source` |
   | **Key** | Technical identifier (code) | `utm_source` |
   | **Description** | Purpose and usage (optional) | `UTM source parameter from marketing campaigns` |
   | **Data Type** | Type of value (optional) | `String`, `Number`, `Boolean` |

4. **Click "Create"** or **"Save"**

#### Key Naming Conventions

✅ **Good Key Names**:
```
utm_source
subscription_tier
age
account_type
last_purchase_date
```

❌ **Avoid**:
```
UTMSource (use snake_case, not camelCase)
utm source (no spaces)
utm-source (no hyphens)
source (too generic)
```

---

## Step 2: Create Attribute via API

### Using OAuth Authentication

```javascript
// Step 1: Get OAuth Token
const tokenResponse = await fetch('https://app.contentstack.com/apps-api/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_CLIENT_SECRET'
  })
});

const { access_token, organization_uid } = await tokenResponse.json();

// Step 2: Create Attribute
const attributeResponse = await fetch('https://personalize-api.contentstack.com/attributes', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${access_token}`,
    'organization_uid': organization_uid,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'UTM Source',
    key: 'utm_source',
    description: 'UTM source parameter from marketing campaigns (e.g., google, facebook, email)'
  })
});

const attribute = await attributeResponse.json();
console.log('Created attribute:', attribute.uid);
```

### Using Management Token (Legacy)

```javascript
const response = await fetch('https://api.contentstack.io/v3/personalize/projects/PROJECT_UID/attributes', {
  method: 'POST',
  headers: {
    'api_key': 'YOUR_API_KEY',
    'authorization': 'YOUR_MANAGEMENT_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'UTM Source',
    key: 'utm_source',
    description: 'UTM source parameter from marketing campaigns'
  })
});
```

---

## Common Attribute Examples

### Marketing Campaign Tracking

```javascript
// Create all UTM attributes
const utmAttributes = [
  {
    name: 'UTM Source',
    key: 'utm_source',
    description: 'Traffic source (e.g., google, facebook)'
  },
  {
    name: 'UTM Medium',
    key: 'utm_medium',
    description: 'Marketing medium (e.g., cpc, email, social)'
  },
  {
    name: 'UTM Campaign',
    key: 'utm_campaign',
    description: 'Campaign name (e.g., spring_sale)'
  },
  {
    name: 'UTM Term',
    key: 'utm_term',
    description: 'Paid search keywords'
  },
  {
    name: 'UTM Content',
    key: 'utm_content',
    description: 'Ad variation for A/B testing'
  }
];

// Create each attribute
for (const attr of utmAttributes) {
  await createAttribute(attr);
}
```

### User Profile Attributes

```javascript
const userAttributes = [
  {
    name: 'Subscription Tier',
    key: 'subscription_tier',
    description: 'User subscription level'
  },
  {
    name: 'Age',
    key: 'age',
    description: 'User age in years'
  },
  {
    name: 'Account Type',
    key: 'account_type',
    description: 'personal or business'
  },
  {
    name: 'Member Since',
    key: 'member_since',
    description: 'Account creation date'
  }
];
```

### E-commerce Attributes

```javascript
const ecommerceAttributes = [
  {
    name: 'Lifetime Value',
    key: 'lifetime_value',
    description: 'Total customer spend'
  },
  {
    name: 'Last Purchase Date',
    key: 'last_purchase_date',
    description: 'Date of most recent purchase'
  },
  {
    name: 'Cart Value',
    key: 'cart_value',
    description: 'Current shopping cart total'
  },
  {
    name: 'Product Category Interest',
    key: 'category_interest',
    description: 'Most viewed product category'
  }
];
```

---

## Step 3: Set Attribute Values

After creating attributes, set their values in your application:

### Client-Side (Browser)

```typescript
'use client';
import { usePersonalize } from '@/context/PersonalizeContext';

export default function MyComponent() {
  const personalize = usePersonalize();
  
  // Set single attribute
  const trackUTMParams = async () => {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source');
    
    if (utmSource) {
      await personalize.set({ utm_source: utmSource });
    }
  };
  
  // Set multiple attributes
  const trackUserProfile = async (user) => {
    await personalize.set({
      subscription_tier: user.subscription,
      age: user.age,
      member_since: user.createdAt
    });
  };
  
  // Set from form submission
  const handleFormSubmit = async (formData) => {
    await personalize.set({
      age: formData.age,
      account_type: formData.accountType
    });
  };
  
  return (
    <div>
      {/* Your component */}
    </div>
  );
}
```

### Server-Side (Middleware)

```typescript
// middleware.ts
import Personalize from '@contentstack/personalize-edge-sdk';

export async function middleware(req: NextRequest) {
  const projectUid = process.env.NEXT_PUBLIC_PERSONALIZATION_PROJECT_UID!;
  
  // Initialize SDK
  const personalize = await Personalize.init(projectUid, { request: req });
  
  // Set attributes from URL parameters
  const searchParams = req.nextUrl.searchParams;
  const utmSource = searchParams.get('utm_source');
  
  if (utmSource) {
    await personalize.set({
      utm_source: utmSource,
      utm_medium: searchParams.get('utm_medium') || '',
      utm_campaign: searchParams.get('utm_campaign') || ''
    });
  }
  
  return NextResponse.next();
}
```

---

## Managing Attributes

### Edit Attribute

1. **Navigate to Attributes** in your Personalize project
2. **Find the attribute** you want to edit
3. **Click the edit icon** (pencil)
4. **Modify fields** (Name, Description)
5. **Click "Save"**

**Note**: You cannot change the `key` after creation. If you need a different key, create a new attribute.

### Delete Attribute

1. **Navigate to Attributes**
2. **Find the attribute** to delete
3. **Click the delete icon** (trash can)
4. **Confirm deletion**

**Warning**: Deleting an attribute will:
- Remove it from all audiences using it
- Clear historical data for that attribute
- Break experiences relying on it

---

## Attribute Best Practices

### Naming Conventions

✅ **DO**:
- Use snake_case: `utm_source`, `subscription_tier`
- Be descriptive: `lifetime_value` not `ltv`
- Use consistent terminology across attributes
- Include units if applicable: `age_years`, `cart_value_usd`

❌ **DON'T**:
- Use camelCase: `utmSource`
- Use spaces: `utm source`
- Use abbreviations: `src`, `sub`
- Make keys too long: `user_subscription_tier_level_type`

### Data Types

| Type | Use For | Example |
|------|---------|---------|
| **String** | Text values | "premium", "google", "mobile" |
| **Number** | Numeric values | 25, 99.99, 1000 |
| **Boolean** | True/false | true, false |
| **Date** | Timestamps | "2024-01-15T10:30:00Z" |

### Value Consistency

Maintain consistent values:

✅ **Good**:
```javascript
subscription_tier: "free" | "premium" | "enterprise"
```

❌ **Bad**:
```javascript
subscription_tier: "Free" | "PREMIUM" | "Enterprise" | "Pro"
```

### Privacy Considerations

**Avoid storing**:
- Personally Identifiable Information (PII)
- Social Security Numbers
- Credit card information
- Passwords or auth tokens
- Email addresses (use hashed IDs instead)

**Safe to store**:
- Anonymized user IDs
- Behavioral data
- Preferences and settings
- Aggregated data
- Campaign parameters

---

## Testing Attributes

### Verify Attribute Creation

```javascript
// Check if attribute exists
const response = await fetch('/api/personalize?resource=attribute&action=getAll');
const { items } = await response.json();

const utmSource = items.find(attr => attr.key === 'utm_source');
console.log('UTM Source attribute:', utmSource);
```

### Test Attribute Setting

```javascript
// Set and verify
await personalize.set({ utm_source: 'test_value' });

// Check in browser console
console.log('Personalize attributes:', personalize.getAttributes());
```

### Debug in Browser

```javascript
// View all current attributes
window.ContentstackPersonalize.getAttributes();

// Set test value
window.ContentstackPersonalize.set({ test_attribute: 'test_value' });
```

---

## Troubleshooting

### Attribute Not Appearing

**Problem**: Created attribute doesn't show in UI

**Solutions**:
- Refresh the page
- Clear browser cache
- Check for error messages during creation
- Verify you're in the correct project

### Cannot Set Attribute Value

**Problem**: `personalize.set()` doesn't work

**Solutions**:
- Verify SDK is initialized: `const personalize = usePersonalize();`
- Check attribute key matches exactly (case-sensitive)
- Ensure you're calling from client component ('use client')
- Check browser console for errors

### Attribute Values Not Persisting

**Problem**: Values reset between page loads

**Solutions**:
- Verify cookies are enabled
- Check for ad blockers interfering
- Ensure SDK is initialized on every page
- Check if values are being overwritten

---

## Next Steps

Now that you've created attributes, you can:

1. **[Create Audiences](./audiences)** - Use attributes to define audience segments
2. **[Track with Events](./events)** - Combine attributes with event tracking
3. **[Build Experiences](./experiences)** - Use attributes in A/B tests

---

## Additional Resources

- [Official: Create Custom Attribute](https://www.contentstack.com/docs/personalize/create-custom-attribute)
- [Official: Add Attribute to Audience](https://www.contentstack.com/docs/personalize/add-custom-attribute-to-audience)
- [Personalize Edge SDK Reference](https://www.contentstack.com/docs/developers/personalize/personalize-edge-sdk)

---

**Attributes created?** [Next: Create Audiences →](./audiences)

