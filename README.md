# Canada Visa Application Form

A modern, mobile-responsive web application for submitting Canada visa applications, built with Next.js.

## Features

- Multi-step form with intuitive navigation
- Comprehensive validation using Zod and react-hook-form
- Mobile-responsive design
- Real-time form validation
- Secure form submission via Formspree
- Modern UI components using shadcn/ui
- Toast notifications for user feedback

## Steps in the Application Process

1. **Personal Information**
   - Full Name
   - Phone Number
   - Email Address
   - ID Number
   - Date of Birth
   - Country of Residence
   - Level of Education

2. **Job Selection**
   - Choose from available positions
   - Indicate travel readiness

3. **Payment Information**
   - MPESA payment instructions
   - Transaction code validation

4. **Confirmation**
   - Select preferred communication channel
   - Accept terms and conditions

## Technology Stack

- Next.js 14
- React Hook Form
- Zod Validation
- Tailwind CSS
- shadcn/ui Components
- Formspree for form submission

## Getting Started

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file and add your Formspree endpoint:
   ```
   NEXT_PUBLIC_FORMSPREE_ENDPOINT=your-endpoint-here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This application is deployed on Netlify. The deployment configuration is handled through the `netlify.toml` file.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
