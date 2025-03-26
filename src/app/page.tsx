'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  const router = useRouter();

  const features = [
    {
      icon: '📝',
      title: 'Application Management',
      description: 'Streamline student applications with customizable forms'
    },
    {
      icon: '⏱️',
      title: 'Attendance Tracking',
      description: 'Biometric and digital attendance systems'
    },
    {
      icon: '📊', 
      title: 'Performance Evaluation',
      description: 'Comprehensive evaluation tools'
    }
  ];

  const steps = [
    {
      number: 1,
      title: 'Student Application',
      description: 'Submit through our secure portal'
    },
    {
      number: 2,
      title: 'HR Review',
      description: 'Managers review applications'
    },
    {
      number: 3,
      title: 'Program Management',
      description: 'Track attendance and performance'
    },
    {
      number: 4,
      title: 'Evaluation',
      description: 'Generate reports and certificates'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-orange-600">SAIMS</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <Button variant="ghost" onClick={() => router.push('#features')}>Features</Button>
            <Button variant="ghost" onClick={() => router.push('#how-it-works')}>How It Works</Button>
            <Button variant="ghost" onClick={() => router.push('/auth/login')}>Login</Button>
            <Button onClick={() => router.push('/auth/register')}>Register</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-orange-50 py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Streamline Your Student Internship Program
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              SAIMS provides a comprehensive solution for managing student attachés and interns
            </p>
            <div className="flex space-x-4">
              <Button 
                size="lg" 
                onClick={() => router.push('/auth/register')}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => router.push('#demo')}
              >
                Request Demo
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/images/dashboard-preview.png"
              alt="SAIMS Dashboard"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-2xl mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How SAIMS Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="demo" className="bg-orange-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Internship Program?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of institutions using SAIMS to streamline their student attachment programs
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              size="lg" 
              className="bg-orange-600 hover:bg-orange-700"
              onClick={() => router.push('/auth/register')}
            >
              Get Started Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => router.push('#contact')}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SAIMS</h3>
              <p>Student Attachés and Interns Management System</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Button variant="link" className="text-white" onClick={() => router.push('#features')}>Features</Button></li>
                <li><Button variant="link" className="text-white" onClick={() => router.push('#how-it-works')}>How It Works</Button></li>
                <li><Button variant="link" className="text-white" onClick={() => router.push('/auth/login')}>Login</Button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Button variant="link" className="text-white">Privacy Policy</Button></li>
                <li><Button variant="link" className="text-white">Terms of Service</Button></li>
              </ul>
            </div>
            <div id="contact">
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <p>Email: info@saims.edu</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} SAIMS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}