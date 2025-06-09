import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ChevronLeft, ChevronRight, Building2, Settings, CheckCircle, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface OnboardingFormData {
  // Step 1: Basic Information
  institutionName: string;
  institutionType: string;
  establishedYear: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  
  // Step 2: Technical Contact
  techContactName: string;
  techContactEmail: string;
  techContactPhone: string;
  currentSystem: string;
  integrationPreference: string;
}

const InstitutionOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<OnboardingFormData>({
    defaultValues: {
      institutionName: "",
      institutionType: "",
      establishedYear: "",
      contactPerson: "",
      contactEmail: "",
      contactPhone: "",
      address: "",
      techContactName: "",
      techContactEmail: "",
      techContactPhone: "",
      currentSystem: "",
      integrationPreference: "",
    },
  });

  const steps = [
    { number: 1, title: "Basic Information", icon: Building2 },
    { number: 2, title: "Technical Contact", icon: Settings },
    { number: 3, title: "Review & Submit", icon: CheckCircle },
  ];

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: OnboardingFormData) => {
    console.log("Form submitted:", data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-ds-bg flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4">
          <CardContent className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-ds-primary mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-ds-text-primary mb-4">
              Application Submitted Successfully!
            </h1>
            <p className="text-lg text-ds-text-secondary mb-8">
              Thank you for your interest in joining the Smart Education Governance Platform. 
              Our team will review your application and contact you within 3-5 business days.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-ds-text-muted">
                Reference ID: <span className="font-mono font-semibold">ON-{Date.now()}</span>
              </p>
              <div className="flex justify-center space-x-4">
                <Button asChild variant="outline">
                  <Link to="/">Return to Home</Link>
                </Button>
                <Button asChild>
                  <Link to="/institution">Access Portal</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ds-bg">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2 text-ds-text-secondary hover:text-ds-primary">
              <Home className="w-4 h-4" />
              <span className="text-sm">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-3">
              <Building2 className="w-6 h-6 text-ds-primary" />
              <div>
                <h1 className="text-lg font-semibold text-ds-text-primary">Institution Onboarding</h1>
                <p className="text-sm text-ds-text-secondary">Step {currentStep} of 3</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isCompleted 
                      ? 'bg-ds-primary border-ds-primary text-white' 
                      : isActive 
                        ? 'border-ds-primary text-ds-primary bg-white' 
                        : 'border-ds-border text-ds-text-muted bg-white'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      isActive ? 'text-ds-primary' : isCompleted ? 'text-ds-primary' : 'text-ds-text-muted'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${
                      isCompleted ? 'bg-ds-primary' : 'bg-ds-border'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {React.createElement(steps[currentStep - 1].icon, { className: "w-5 h-5 text-ds-primary" })}
                  <span>{steps[currentStep - 1].title}</span>
                </CardTitle>
                <CardDescription>
                  {currentStep === 1 && "Please provide basic information about your institution"}
                  {currentStep === 2 && "Technical contact and system integration preferences"}
                  {currentStep === 3 && "Review all information before submitting"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="institutionName"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Institution Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter institution name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="institutionType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution Type *</FormLabel>
                          <FormControl>
                            <Input placeholder="University, College, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="establishedYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Established Year</FormLabel>
                          <FormControl>
                            <Input placeholder="YYYY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactPerson"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Contact Person *</FormLabel>
                          <FormControl>
                            <Input placeholder="Full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="email@institution.edu" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+971 XX XXX XXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Institution Address *</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Complete address including emirate" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 2: Technical Contact */}
                {currentStep === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="techContactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Technical Contact Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="IT Manager/Technical Lead" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="techContactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Technical Contact Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="tech@institution.edu" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="techContactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Technical Contact Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+971 XX XXX XXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="currentSystem"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Student Information System</FormLabel>
                          <FormControl>
                            <Input placeholder="Banner, Blackboard, Custom, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="integrationPreference"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Integration Preference</FormLabel>
                          <FormControl>
                            <Textarea placeholder="API integration, Automated data sync, Real-time integration, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 3: Review */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="bg-ds-secondary p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-ds-text-primary mb-4">Application Summary</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>Institution:</strong> {form.watch("institutionName")}</p>
                          <p><strong>Type:</strong> {form.watch("institutionType")}</p>
                          <p><strong>Contact:</strong> {form.watch("contactPerson")}</p>
                          <p><strong>Email:</strong> {form.watch("contactEmail")}</p>
                        </div>
                        <div>
                          <p><strong>Tech Contact:</strong> {form.watch("techContactName")}</p>
                          <p><strong>Tech Email:</strong> {form.watch("techContactEmail")}</p>
                          <p><strong>Current System:</strong> {form.watch("currentSystem")}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Important:</strong> By submitting this application, you agree to comply with all 
                        platform requirements and data sharing policies. Our team will review your application 
                        and contact you within 3-5 business days.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>
              
              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center space-x-2 bg-ds-primary hover:bg-ds-primary-dark"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="flex items-center space-x-2 bg-ds-primary hover:bg-ds-primary-dark"
                >
                  <span>Submit Application</span>
                  <CheckCircle className="w-4 h-4" />
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default InstitutionOnboarding;
