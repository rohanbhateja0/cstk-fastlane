# Create Personalize Project

Learn how to create and configure a Personalize project in Contentstack.

## Overview

A Personalize project is the container for all your personalization activities including attributes, audiences, experiences, and events. Each project is connected to a specific Contentstack stack.

**Time Required**: ~5 minutes

**Prerequisites**:
- ✅ Contentstack account with Personalize enabled
- ✅ At least one stack created in Contentstack
- ✅ Organization admin or appropriate permissions

---

## Step 1: Access Personalize

1. **Log in** to your Contentstack account at https://app.contentstack.com

2. **Locate Personalize** in the left sidebar navigation  
   (Look for the personalization icon or "Personalize" menu item)

3. **Click on Personalize** to open the Personalize dashboard

**If you don't see Personalize**:
- Contact your organization admin
- Or reach out to [Contentstack support](https://www.contentstack.com/support) to enable Personalize for your organization

---

## Step 2: Create New Project

1. **Click "+ New Project"** or **"Create Project"** button

2. **Fill in Project Details**:
   
   | Field | Description | Example |
   |-------|-------------|---------|
   | **Project Name** | Descriptive name for your project | "Website Personalization" |
   | **Description** | Purpose and scope (optional) | "A/B testing and personalization for marketing campaigns" |
   | **Connected Stack** | Select the stack to connect | "Production Website Stack" |

3. **Click "Create"** or **"Save"**

---

## Step 3: Get Project UID

After creating the project, you'll need the Project UID for integration:

1. **Navigate to Project Settings**  
   Click the ⚙️ Settings icon in the left navigation

2. **Find Project Details**  
   Under the "General" tab, locate the **Project Details** section

3. **Copy Project UID**  
   - The Project UID is a 24-character identifier
   - Click the **Copy** icon next to the UID
   - Save this UID - you'll need it for SDK integration

**Example Project UID**: `68e04cd3f03a4b4eeee3451e`

---

## Step 4: Configure Project Settings

### General Settings

Navigate to **Settings** → **General**:

| Setting | Description | Recommendation |
|---------|-------------|----------------|
| **Project Name** | Display name | Keep descriptive and clear |
| **Description** | Project purpose | Document use case and goals |
| **Connected Stack** | Linked Contentstack stack | Verify correct stack |
| **Time Zone** | Analytics time zone | Match your business timezone |

### Data Collection Settings

Navigate to **Settings** → **Data Collection**:

```typescript
// Configure data retention and privacy settings
{
  "data_retention_days": 90,  // How long to keep user data
  "respect_do_not_track": true,  // Honor DNT browser setting
  "ip_anonymization": true,  // Anonymize IP addresses
  "gdpr_compliant": true  // Enable GDPR compliance features
}
```

**Recommendations**:
- ✅ Enable IP anonymization for privacy
- ✅ Set appropriate data retention period
- ✅ Configure GDPR settings if serving EU users
- ✅ Enable Do Not Track respect for privacy compliance

---

## Step 5: Set Up Environments (Optional)

If you have multiple deployment environments:

1. **Go to Settings** → **Environments**

2. **Add Environments**:
   - **Development**: For testing integrations
   - **Staging**: For QA and pre-production testing
   - **Production**: For live website

3. **Configure Environment URLs**:
   ```
   Development: https://dev.yourdomain.com
   Staging: https://staging.yourdomain.com
   Production: https://www.yourdomain.com
   ```

**Benefits**:
- Test personalization before going live
- Separate analytics for each environment
- Safer experimentation

---

## Project Configuration Reference

### Complete Configuration Example

```json
{
  "project": {
    "name": "Website Personalization",
    "description": "A/B testing and segmentation for marketing site",
    "uid": "68e04cd3f03a4b4eeee3451e",
    "stack": {
      "uid": "blt33c1b1e577f25486",
      "name": "Marketing Website"
    },
    "settings": {
      "timezone": "America/New_York",
      "data_retention_days": 90,
      "privacy": {
        "respect_dnt": true,
        "ip_anonymization": true,
        "gdpr_enabled": true
      }
    },
    "environments": [
      {
        "name": "Development",
        "url": "https://dev.example.com"
      },
      {
        "name": "Production",
        "url": "https://www.example.com"
      }
    ]
  }
}
```

---

## Verify Project Setup

### Checklist

- [ ] Project created successfully
- [ ] Project UID copied and saved
- [ ] Connected to correct stack
- [ ] Project settings configured
- [ ] Time zone set correctly
- [ ] Privacy settings configured (if required)
- [ ] Environments added (if applicable)

### Test Project Access

Verify you can access your project:

1. **Navigate back** to Personalize dashboard
2. **Select your project** from the projects list
3. **Verify sections** are accessible:
   - ✅ Attributes
   - ✅ Audiences
   - ✅ Experiences
   - ✅ Events
   - ✅ Settings

---

## Managing Multiple Projects

### When to Create Multiple Projects

Create separate projects for:
- ✅ Different websites or applications
- ✅ Completely different user bases
- ✅ Independent marketing initiatives
- ✅ Testing vs. production separation

### When to Use One Project

Use a single project for:
- ✅ Same website across environments
- ✅ Related personalization efforts
- ✅ Shared user attributes and audiences
- ✅ Unified analytics and reporting

---

## Project Roles and Permissions

### Available Roles

| Role | Permissions | Use Case |
|------|-------------|----------|
| **Admin** | Full access to all features | Project managers, leads |
| **Editor** | Create and edit experiences | Marketing team |
| **Analyst** | View analytics only | Data analysts, stakeholders |
| **Developer** | API access, technical setup | Engineering team |

### Managing Team Access

1. **Go to Settings** → **Team**
2. **Click "+ Add Member"**
3. **Enter email address**
4. **Select role**
5. **Send invitation**

---

## Next Steps

Now that your project is set up, proceed with:

1. **[Create Custom Attributes](./attributes)** - Define user characteristics to track
2. **[Set Up Audiences](./audiences)** - Create audience segments
3. **[Configure Events](./events)** - Define conversion tracking
4. **[Create Experiences](./experiences)** - Build A/B tests or segmented experiences

---

## Troubleshooting

### Can't Find Personalize Menu

**Problem**: Personalize not visible in navigation

**Solutions**:
- Verify Personalize is enabled for your organization
- Check user permissions with org admin
- Contact Contentstack support to enable Personalize

### Can't Create Project

**Problem**: Create button is disabled or fails

**Solutions**:
- Verify you have sufficient permissions
- Check if you've reached project limits
- Ensure you have at least one stack created
- Try refreshing the page

### Project UID Not Visible

**Problem**: Can't find Project UID

**Solutions**:
- Go to Project Settings → General tab
- Scroll to "Project Details" section
- UID should be displayed with copy icon
- If missing, try different browser or clear cache

---

## Additional Resources

- [Contentstack Personalize Overview](https://www.contentstack.com/docs/personalize)
- [Create Personalize Project (Official)](https://www.contentstack.com/docs/personalize/create-personalize-project)
- [Personalize Key Concepts](https://www.contentstack.com/docs/personalize/glossary-and-key-features)

---

**Project created?** [Next: Create Attributes →](./attributes)

