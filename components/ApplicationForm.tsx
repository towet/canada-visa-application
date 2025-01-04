'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters'),
  email: z.string().email('Invalid email address'),
  idNumber: z.string().min(6, 'ID number must be at least 6 characters'),
  dateOfBirth: z.string(),
  countyOfResidence: z.string().min(2, 'County must be at least 2 characters'),
  educationLevel: z.string(),
  jobPosition: z.string(),
  readyToTravel: z.enum(['yes', 'no', 'maybe']),
  transactionCode: z.string().length(10, 'Transaction code must be exactly 10 characters')
    .refine((val) => /^[A-Za-z0-9]+$/.test(val), 'Transaction code must contain only letters and numbers'),
  communicationPreference: z.enum(['email', 'sms', 'whatsapp']),
  termsAccepted: z.boolean().refine(val => val === true, 'You must accept the terms'),
});

const jobPositions = [
  'Teachers', 'Bakery Workers', 'Processing Equipment Cleaners',
  'Industrial Butchers and Meat Cutters', 'Poultry Production Workers',
  'Food and Beverage Servers', 'Room Attendants', 'Front Desk Agents',
  'Caregivers', 'Truck drivers', 'Welder', 'Housekeepers',
  'Security guards', 'Gardeners', 'Nannies', 'Chefs',
  'Kitchen Helpers', 'Fish Plant Workers', 'Hotel Front Desk Clerks',
  'Casino Occupations', 'Hostesses', 'Bartenders', 'Light Duty Cleaners',
  'Specialized Cleaners', 'Janitors, Caretakers and Building Superintendents',
  'Plumber', 'Dry Cleaning and Laundry\'s', 'Hotel Valets',
  'Housekeeping/Cleaning Staffs', 'Electricians', 'Cleaners',
  'Guards', 'Machine operators', 'Receptionists and secretaries',
  'Store keepers', 'Drivers', 'Babysitters', 'Parent\'s helpers'
];

export function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      termsAccepted: false,
    },
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const validateCurrentStep = () => {
    const currentFields = {
      1: ['fullName', 'phoneNumber', 'email', 'idNumber', 'dateOfBirth', 'countyOfResidence', 'educationLevel'],
      2: ['jobPosition', 'readyToTravel'],
      3: ['transactionCode'],
      4: ['communicationPreference', 'termsAccepted'],
    };

    const fieldsToValidate = currentFields[step as keyof typeof currentFields] || [];
    let isValid = true;

    for (const field of fieldsToValidate) {
      const fieldState = form.getFieldState(field);
      const value = form.getValues(field);

      if (field === 'transactionCode' && step === 3) {
        if (!value || value.length !== 10 || !/^[A-Za-z0-9]+$/.test(value)) {
          form.setError('transactionCode', {
            type: 'manual',
            message: 'Transaction code must be exactly 10 characters and contain only letters and numbers'
          });
          isValid = false;
          continue;
        }
      }

      if (!value || fieldState.invalid) {
        isValid = false;
        form.trigger(field);
      }
    }

    return isValid;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch('https://formspree.io/f/mjkkpryk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...values,
          _subject: `New Canada Visa Application from ${values.fullName}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      const responseData = await response.json();
      
      if (responseData.ok) {
        setIsSuccess(true);
        toast({
          title: "Application Submitted Successfully!",
          description: "We will review your application and contact you soon.",
          duration: 5000,
        });
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly before proceeding.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-green-800 text-lg font-semibold">
            Application Submitted Successfully!
          </AlertTitle>
          <AlertDescription className="text-green-700 mt-2">
            Thank you for applying. We have received your application and will review it shortly.
            You will receive a confirmation email with further instructions.
          </AlertDescription>
        </Alert>
        <Button 
          className="mt-6 w-full"
          onClick={() => {
            setIsSuccess(false);
            form.reset();
            setStep(1);
          }}
        >
          Submit Another Application
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <Progress value={progress} className="w-full h-2" />
        <div className="flex justify-between mt-2 text-sm">
          <span className={step >= 1 ? 'text-primary' : ''}>Personal Info</span>
          <span className={step >= 2 ? 'text-primary' : ''}>Job Selection</span>
          <span className={step >= 3 ? 'text-primary' : ''}>Payment</span>
          <span className={step >= 4 ? 'text-primary' : ''}>Confirmation</span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your ID number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="countyOfResidence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country of Residence *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your county" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="educationLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level of Education *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="primary">Primary School</SelectItem>
                        <SelectItem value="secondary">Secondary School</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                        <SelectItem value="degree">Bachelor's Degree</SelectItem>
                        <SelectItem value="masters">Master's Degree</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="jobPosition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Job Position *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a position" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {jobPositions.map((job) => (
                          <SelectItem key={job} value={job}>{job}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="readyToTravel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Are you ready to travel? *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="maybe" />
                          </FormControl>
                          <FormLabel className="font-normal">Maybe</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">MPESA Payment Instructions</h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Go to M-PESA on your phone</li>
                    <li>Select "Lipa na M-PESA"</li>
                    <li>Select "Pay Bill"</li>
                    <li>Enter Business Number: 756756</li>
                    <li>Enter Account Number: 559761</li>
                    <li>Enter Amount: KSH 999</li>
                    <li>Enter your M-PESA PIN and confirm</li>
                  </ol>
                </CardContent>
              </Card>

              <FormField
                control={form.control}
                name="transactionCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>M-PESA Transaction Code *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Enter 10-character transaction code"
                        maxLength={10}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="communicationPreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Communication Channel *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select communication channel" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="sms">Call/SMS</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="mt-1"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I confirm that the information given above is true and I accept towards becoming a member of this organization
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={prevStep}
                disabled={isSubmitting}
              >
                Previous
              </Button>
            )}
            {step < totalSteps ? (
              <Button 
                type="button" 
                onClick={nextStep}
                disabled={isSubmitting}
                className="ml-auto"
              >
                Next
              </Button>
            ) : (
              <Button 
                type="submit"
                disabled={isSubmitting || !form.formState.isValid}
                className="ml-auto bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
