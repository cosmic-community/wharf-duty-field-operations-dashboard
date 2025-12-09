# 🚢 Wharf Duty Field Operations Dashboard

![Dashboard Preview](https://imgix.cosmicjs.com/97a54aa0-d51f-11f0-a679-efa620642f73-photo-1544551763-46a013bb70d5-1765299210736.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive field operations management dashboard for Novi Marine Brokers' wharf prospecting system across Atlantic Canada and the US Eastern Seaboard.

## ✨ Features

- **Wharf Database Management** - Complete searchable database of 500+ fishing wharves with GPS coordinates, priority levels, and visit history
- **Trip Planning & Route Optimization** - Plan daily wharf routes with time calculations and working hour validation
- **Visit Tracking & Analytics** - Log completed visits with boat counts, photos, observations, and CRM sync status
- **User & Role Management** - Role-based access for Admins, Brokers, Remote Workers, and Referral Agents with regional assignments
- **Advanced Filtering** - Multi-criteria search by province/state, fishing district, priority, wharf type, and last visit date
- **Real-Time Dashboard** - Statistics overview with total counts, completion rates, and recent activity
- **Responsive Design** - Optimized for desktop and tablet field operations
- **CRM Integration Ready** - Zoho CRM synchronization tracking for lead management

## 🎯 Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69384e1d8880fbd1d8a5d3cd&clone_repository=693856188880fbd1d8a5d460)

## 📋 Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Wharf Duty Day App
Product Requirements Specification
Client	4738773 Nova Scotia Limited o/a Novi Marine Brokers
Address	674 Main Street, Yarmouth, Nova Scotia B5A 1K3
Contact	Dane Devine, President — dane@novimarinebrokers.com
Version	1.0 — December 9, 2025
1. Executive Summary
Novi Marine Brokers requires a mobile-first field prospecting application that enables brokers and referral agents to systematically canvass fishing wharves across Atlantic Canada and the US Eastern Seaboard. The app will log wharf visits, capture vessel photos, track time on-site, and sync prospect data to the company's CRM and calling systems.
This tool supports Novi's hybrid brokerage model by building a comprehensive database of active fishing vessels and their locations, enabling targeted outreach for vessel sales, license transfers, and equipment brokerage.
2. Business Context
2.1 Company Background
Novi Marine Brokers has operated for 27+ years specializing in commercial fishing vessels, licenses, and quota across Atlantic Canada. The company handles transactions ranging from $480,000 to $3.75 million, focusing on lobster, scallop, and snow crab licenses across Eastern Canada's fishing districts.
2.2 Strategic Objectives
•	Build comprehensive vessel/location database to support outbound sales efforts
•	Enable systematic coverage of wharves as lobster catches shift north with climate change
•	Support two-tier referral agent network with standardized prospecting tools
•	Expand hybrid marketplace coverage from Eastern Canada to full Atlantic seaboard (Canada + USA)
•	Feed data into Zoho CRM lead scoring system for prioritized follow-up
2.3 Competitive Advantage
Novi maintains 25+ years of DFO (Department of Fisheries and Oceans) data collected since 1999, providing unique intelligence on fishing licenses and vessel history. This app extends that advantage by capturing real-time field data on vessel locations and activity patterns.
3. User Roles
Role	Description	App Access
Admin	Dane Devine, President	Full access: manage wharves, users, reports, settings
Broker	Field staff conducting wharf visits	Trip planning, check-in/out, photos, boat logging
Remote Worker	Call center staff for follow-up	View visit data, click-to-call, log call outcomes
Referral Agent	Regional partners (commission-based)	Trip planning, check-in/out, photos (region-limited)
 
4. Core Features
4.1 Wharf Database
Pre-loaded database of wharves with the following fields:
•	Wharf name (official DFO name + local name if different)
•	GPS coordinates (latitude/longitude)
•	Province/State and fishing district/LFA (Lobster Fishing Area)
•	Wharf type (public, private, commercial)
•	Historical average boat count (calculated from visit history)
•	Last visit date and days since last visit
•	Priority flag (high/medium/low based on activity)
4.2 Trip Planning
Base Location Setup
•	Set start/end location (hotel, home, or custom GPS point)
•	Save frequently used base locations for quick selection
•	8-hour working window (configurable per user)
Wharf Selection
•	Map view showing nearby wharves sorted by distance from base
•	Filter by: province, district, days since last visit, priority
•	Tap to add/remove wharves from day's route
•	Drag to reorder sequence
Time Estimation
•	Calculate drive time between stops (Google Maps/Mapbox API)
•	Estimate time at each wharf based on historical boat counts (1 min/boat default)
•	Include return trip to base in total time
•	Alert if planned route exceeds 8-hour window
•	Suggest wharves to remove if over time
4.3 Active Visit Logging
Check-In
•	"Arrived" button auto-captures: GPS coordinates, timestamp, wharf match
•	GPS verification against wharf database (within 100m tolerance)
•	Option to add new wharf if location not in database
Boat Count & Photos
•	Numeric input for total boats observed
•	Camera integration for vessel photos (auto-tagged with wharf, date, GPS)
•	Optional: tag individual boats with name if visible
•	Photo gallery per visit (unlimited)
Timer System
•	Auto-calculate allowed time: boat count × 1 minute
•	Countdown timer visible on screen
•	Audio/vibration alarm when time expires
•	Snooze option (+5 min) with reason required
Check-Out
•	"Done" button logs: departure time, actual time spent, status
•	Visit status options: completed, partial, skipped (with reason)
•	Notes field for observations
•	Auto-advance to next wharf in route
4.4 Route Tracking
•	Running countdown: "X hours Y minutes remaining (including return)"
•	Real-time recalculation as actual boat counts logged
•	"Head back now" alert when buffer time reached
•	End-of-day summary: wharves visited, boats counted, photos taken, total time
•	Route history saved for reporting and future reference
 
5. Data Model (Cosmic CMS)
5.1 Wharves
Field	Type	Notes
wharf_id	String (UUID)	Primary key
name	String	Official wharf name
local_name	String	Alternate name fishermen use
latitude	Float	GPS coordinate
longitude	Float	GPS coordinate
province_state	Enum	NS, NB, PE, NL, QC, ME, MA, etc.
fishing_district	String	LFA 33, LFA 34, Area 19, etc.
wharf_type	Enum	public, private, commercial
avg_boat_count	Integer	Calculated from visit history
last_visit_date	DateTime	Auto-updated on check-out
priority	Enum	high, medium, low
5.2 Visits
Field	Type	Notes
visit_id	String (UUID)	Primary key
wharf_id	Reference	FK to Wharves
user_id	Reference	FK to Users (broker/agent)
trip_id	Reference	FK to Trips
check_in_time	DateTime	Auto-logged on arrival
check_out_time	DateTime	Auto-logged on departure
gps_lat	Float	Actual GPS at check-in
gps_lng	Float	Actual GPS at check-in
boat_count	Integer	Number of boats observed
photos	Media[]	Array of photo references
status	Enum	completed, partial, skipped
notes	Text	Free-form observations
synced_to_crm	Boolean	Flag for Zoho sync status
 
6. System Integrations
6.1 Architecture Overview
The app uses a headless CMS architecture with Cosmic as the data layer, connected to existing Novi systems via n8n automation workflows.
System	Role	Integration Method
Cosmic CMS	Content/data storage	REST API, webhooks on create/update
Laravel	Backend/website	API endpoints for novimarinebrokers.com
Zoho CRM	Lead/prospect management	Zoho API via n8n, create Leads from visits
Dialpad	Click-to-call, call logging	Dialpad API, deep link for mobile calls
n8n	Workflow automation	Webhooks, scheduled syncs, data transforms
Google Maps	Drive time, routing	Distance Matrix API, Maps SDK
6.2 Data Flow
1.	Broker creates trip in app → saved to Cosmic
2.	Check-in at wharf → Cosmic webhook fires → n8n workflow triggered
3.	Photos uploaded to Cosmic Media → URLs stored on Visit record
4.	Check-out completes visit → n8n creates/updates Zoho Lead
5.	Zoho Lead scored by existing rating widget → prioritized for follow-up
6.	Remote worker views lead → click-to-call via Dialpad → call logged to Zoho
6.3 Zoho CRM Mapping
App Field	Zoho Module	Zoho Field
Wharf name + location	Leads	Lead Source / Address
Visit date/time	Activities	Task / Activity Date
Boat count	Leads (custom)	Boats_Observed__c
Photos	Attachments	Linked to Lead record
Fishing district	Leads (custom)	Fishing_District__c
 
7. Technical Requirements
7.1 Platform
•	Mobile-first: iOS and Android (React Native or Flutter recommended)
•	Progressive Web App fallback for desktop access
•	Offline capability required (queue uploads when connectivity restored)
7.2 Offline Mode
Many wharves are in areas with poor cellular coverage. The app must:
•	Cache wharf database locally for offline access
•	Queue visit logs and photos for sync when online
•	Use device GPS (not network-based) for location
•	Show clear sync status indicator
•	Conflict resolution: last-write-wins with audit log
7.3 Photo Handling
•	Compress images client-side before upload (target: <500KB)
•	Preserve EXIF data for GPS and timestamp verification
•	Auto-tag with wharf ID, visit ID, and capture time
•	Thumbnail generation for list views
7.4 Security
•	User authentication via Zoho (SSO) or email/password
•	Role-based access control (Admin, Broker, Remote Worker, Referral Agent)
•	Referral agents limited to assigned regions
•	API keys stored securely, never in client code
8. Development & Support
8.1 Development Team
Partner	Responsibility	Contact
CRMOZ / Tanya	Zoho CRM configuration, n8n workflows	Primary Zoho partner
Anji / VoLive	Mobile app development, Laravel backend	Primary dev partner
Edvantis	Additional development capacity	Overflow / specialized tasks
8.2 Data Seeding
Initial wharf database to be populated from DFO Small Craft Harbours registry and Novi's existing 25-year data archive. Estimated 500+ wharves across Atlantic Canada, expandable to US Eastern Seaboard.
9. Future Enhancements
•	AI-powered vessel identification from photos (match to registry data)
•	Real-time voice translation with voice cloning for Quebec/French-speaking markets
•	Route optimization AI (auto-suggest best wharf sequence)
•	Seasonal pattern analysis (predict best visit times by wharf)
•	Integration with vessel tracking/AIS data
•	Referral agent commission tracking dashboard
 
10. Approval
This specification is approved for development:
Client Approval
_________________________________
Dane Devine, President
4738773 Nova Scotia Limited
Date: _________________	Development Lead
_________________________________
Name: _________________
Company: _________________
Date: _________________"

### Code Generation Prompt

> Create a React dashboard that displays and manages my existing content

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript with strict type checking
- **Styling**: Tailwind CSS with custom maritime theme
- **Content Management**: Cosmic CMS with SDK v1.5.6
- **Data Fetching**: Server Components with depth parameter for relationships
- **Deployment**: Vercel-optimized with automatic type checking
- **UI Components**: Custom components with responsive design
- **Icons**: Lucide React for consistent iconography

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account with your content already set up
- Environment variables for Cosmic API access

### Installation

1. Clone this repository
2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Wharves with Relationships
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all wharves with priority filtering
const { objects: wharves } = await cosmic.objects
  .find({ 
    type: 'wharves',
    'metadata.priority.key': 'high'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Visits with Connected Objects
```typescript
// Get visits with related wharf and user data
const { objects: visits } = await cosmic.objects
  .find({ type: 'visits' })
  .props(['id', 'title', 'metadata'])
  .depth(1) // Includes wharf, user, and trip objects
```

### Creating a New Visit
```typescript
await cosmic.objects.insertOne({
  type: 'visits',
  title: `${wharf.title} - ${new Date().toLocaleDateString()}`,
  metadata: {
    visit_id: `VIS-${Date.now()}`,
    wharf: wharfId, // Object ID reference
    user: userId, // Object ID reference
    check_in_time: new Date().toISOString(),
    gps_lat: 43.8363,
    gps_lng: -66.118,
    boat_count: 26,
    status: { key: 'completed', value: 'Completed' },
    notes: 'Field observations...',
    synced_to_crm: false
  }
})
```

## 🗄️ Cosmic CMS Integration

This dashboard uses your existing Cosmic bucket structure:

### Content Types

**Wharves** (`wharves`)
- Wharf ID, official name, local name
- GPS coordinates (latitude/longitude)
- Province/State (select-dropdown)
- Fishing district (LFA designation)
- Wharf type (public/private/commercial)
- Average boat count, last visit date
- Priority level (high/medium/low)
- Wharf photo, notes

**Visits** (`visits`)
- Visit ID, check-in/out times
- Connected wharf (object metafield)
- Connected user (object metafield)
- Connected trip (object metafield)
- GPS coordinates, boat count
- Visit photos (files metafield)
- Visit status (completed/partial/skipped)
- Observations, CRM sync status

**Trips** (`trips`)
- Trip ID, trip date
- Connected user (object metafield)
- Base location (name, GPS coordinates)
- Planned wharves (objects metafield)
- Working hours, estimated time
- Trip status (planned/in_progress/completed/cancelled)
- Actual start/end times, trip notes

**Users** (`users`)
- Full name, email, phone
- User role (admin/broker/remote_worker/referral_agent)
- Assigned regions (check-boxes)
- Profile photo
- Active status

### Key Features

- **Depth Parameter**: Uses `depth=1` to automatically include related objects (wharf → user, trip → wharves)
- **Select Dropdowns**: Exact value matching for province_state, wharf_type, priority, user_role, trip_status, visit status
- **Object References**: Properly handles object and objects metafield types with ID-based queries
- **File Management**: Supports single file (profile_photo, wharf_photo) and multiple files (visit photos) metafields
- **Type Safety**: Complete TypeScript interfaces matching your Cosmic content model

## 📊 Dashboard Features

### Main Dashboard
- Total counts (wharves, visits, trips, users)
- Recent activity summary
- Quick stats (high priority wharves, active trips)
- Navigation to all content sections

### Wharves Management
- Complete wharf database view
- Filter by province/state, priority, wharf type
- Search by name or fishing district
- Sort by last visit date or average boat count
- View GPS coordinates and visit history

### Visits Tracking
- All completed wharf visits
- Filter by status (completed/partial/skipped)
- View connected wharf and broker information
- Photo galleries per visit
- Field observations and CRM sync status

### Trips Planning
- Planned and active trip routes
- View base location and planned wharves
- Time estimates and working hours
- Trip status tracking
- Route notes and actual times

### Users Administration
- User directory with roles
- Active/inactive status
- Regional assignments
- Profile photos
- Contact information

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Other Platforms

This Next.js application can be deployed to any platform that supports Node.js:
- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Railway

Make sure to set the environment variables in your deployment platform's settings.

## 🔒 Security Notes

- All environment variables are server-side only
- Cosmic SDK calls are made from Server Components
- No API keys exposed to the client
- Role-based access ready for authentication integration

## 📝 Type Checking

This project includes comprehensive TypeScript checking to prevent deployment failures:

```bash
# Run type checking
bun run type-check

# Type check runs automatically before build
bun run build
```

## 🤝 Contributing

This dashboard is built specifically for Novi Marine Brokers' wharf prospecting operations. For modifications or feature requests, please contact your development team.

## 📄 License

Proprietary - Novi Marine Brokers

---

Built with 💙 by [Cosmic](https://www.cosmicjs.com) - The Modern Headless CMS

<!-- README_END -->