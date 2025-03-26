import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { ClientButton } from '@/app/api/components/clientButton';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>SAIMS - Student Attachés & Interns Management System</title>
        <meta name="description" content="Streamline your student internship program with SAIMS" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=Roboto:wght@700&display=swap" rel="stylesheet" />
      </Head>

      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="container nav-container">
          <div className="logo">
            <h1 className="text-orange">SAIMS</h1>
          </div>
          <div className="nav-menu">
            <Link href="#features" className="nav-link">Features</Link>
            <Link href="#how-it-works" className="nav-link">How It Works</Link>
            <Link href="#testimonials" className="nav-link">Testimonials</Link>
            <Link href="/sec/login" className="nav-link">Login</Link>
            <ClientButton href="/sec/register" variant="secondary">
              Register
            </ClientButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section bg-light-orange">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Streamline Your Student Internship Program</h1>
              <p className="mb-3">SAIMS provides a comprehensive solution for managing student attachés and interns from application to evaluation.</p>
              <div className="hero-actions">
                <ClientButton href="/sec/register" variant="primary">
                  Get Started
                </ClientButton>
                <ClientButton 
                  onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                  variant="secondary"
                >
                  Request Demo
                </ClientButton>
              </div>
            </div>
            <div className="hero-image-container">
              <Image 
                src="/images/dashboard-preview.png" 
                alt="SAIMS Dashboard Preview" 
                width={600}
                height={400}
                className="hero-image"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Other sections remain the same, just replace buttons with ClientButton */}
      
      {/* CTA Section */}
      <section id="demo" className="section bg-light-orange">
        <div className="container">
          <div className="cta-content">
            <h2 className="mb-2">Ready to Transform Your Internship Program?</h2>
            <p className="mb-4">Join hundreds of institutions using SAIMS to streamline their student attachment programs.</p>
            <div className="cta-actions">
              <ClientButton href="/sec/register" variant="primary">
                Get Started Now
              </ClientButton>
              <ClientButton 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                variant="secondary"
              >
                Contact Sales
              </ClientButton>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of your page... */}
    </>
  );
}