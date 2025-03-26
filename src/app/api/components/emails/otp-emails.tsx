import { Html, Head, Preview, Body, Container, Text, Link, Section } from '@react-email/components';

interface EmailProps {
  otp: string;
}

export default function EmailTemplate({ otp }: EmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your SAIMS Verification Code</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={title}>SAIMS Verification</Text>
          <Section style={section}>
            <Text style={text}>Your OTP code is:</Text>
            <Text style={code}>{otp}</Text>
            <Text style={text}>This code will expire in 15 minutes.</Text>
          </Section>
          <Text style={footer}>
            If you didn't request this, please ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Inter, Arial, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
};

const title = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#1e2b4a',
};

const section = {
  padding: '24px',
  border: '1px solid #e9ecef',
  borderRadius: '4px',
  backgroundColor: '#f8f9fa',
  margin: '24px 0',
};

const text = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#212529',
};

const code = {
  fontSize: '32px',
  fontWeight: '700',
  letterSpacing: '0.1em',
  textAlign: 'center' as const,
  margin: '16px 0',
  color: '#ff7b1d',
};

const footer = {
  fontSize: '14px',
  color: '#6c757d',
  marginTop: '24px',
};