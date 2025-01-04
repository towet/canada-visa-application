import { ApplicationForm } from '@/components/ApplicationForm';

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Canada Visa Application</h1>
          <p className="text-gray-600">Fill in your details below for an instant consideration</p>
        </div>
        <ApplicationForm />
      </div>
    </div>
  );
}
