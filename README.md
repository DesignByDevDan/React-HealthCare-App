# React HealthCare App

A modern healthcare management platform built using Next.js 13+, React, and TypeScript. This application features role-based dashboards for patients, doctors, and admins, and uses Supabase for authentication and data storage. The user interface is designed with ShadCN UI components and MagicUI BentoGrid, and supports both dark and light themes.

## Features

- **Role-Based Dashboards**
  - **Patients:** Manage and schedule appointments, view medical records, and message your doctor.
  - **Doctors:** Access patient profiles and medical records, manage appointments, and communicate with patients.
  - **Admins:** Oversee user management and perform administration tasks.

- **Modern UI Components**
  - **ShadCN UI:** For a polished and consistent design, including a responsive sidebar.
  - **MagicUI BentoGrid:** For dynamic, responsive dashboard layouts.

- **Authentication & Data Management**
  - **Supabase:** Integrated authentication and data storage.

- **Theming**
  - Supports dark and light mode using the next-themes provider.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or later)
- npm or yarn
- A Supabase project (for authentication and database services)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/DesignByDevDan/React-HealthCare-App.git
   cd React-HealthCare-App
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables:**

   Create a `.env.local` file in the root of the project with your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```plaintext
React-HealthCare-App/
├── app/
│   ├── layout.tsx           # Global layout with Sidebar & ThemeProvider
│   ├── page.tsx             # Home/Landing page
│   ├── dashboard/           # Patient dashboard pages
│   ├── doctor/              # Doctor-specific pages (login, dashboard, patient details)
│   ├── admin/               # Admin-specific pages (login, dashboard)
│   ├── appointments/        # Appointment management pages (list, new appointment)
│   └── ...                  # Other pages (e.g., medical-records, messages)
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── sidebar.tsx      # ShadCN Sidebar component and its sub-components
│   │   ├── theme-provider.tsx
│   │   └── ...              # Other UI components
│   └── magicui/
│       └── bento-grid.tsx   # MagicUI BentoGrid & BentoCard components
├── lib/
│   └── supabase.ts          # Supabase client initialization
├── styles/
│   └── globals.css          # Global styles
├── .env.local               # Environment variables (not committed)
├── .gitignore
├── README.md
└── package.json
```

## Deployment

You can deploy this Next.js application on platforms like [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or any other Node.js hosting service.

## Contributing

Contributions are welcome! Please fork the repository, create a new branch for your feature or bug fix, and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
