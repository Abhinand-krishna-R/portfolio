import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import Heading from '../components/ui/Heading';
import Paragraph from '../components/ui/Paragraph';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import { socials } from '../data/socials';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Build a mailto: URI so the message is sent via the user's own email client.
    const subject = encodeURIComponent(
      formData.subject || `Portfolio Contact from ${formData.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:${socials.email}?subject=${subject}&body=${body}`;

    setStatus('sent');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="relative min-h-screen pb-24">
      <AnimatedBackground />

      <Container>
        <Section id="contact" className="pt-24" title="Get In Touch" subtitle="Have an opening, a technical query, or want to collaborate on a mobile project? Let's connect.">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
            
            {/* Contact Information & Log console */}
            <div className="lg:col-span-5 space-y-6">
              <Card padding="md" hoverable={false} className="border border-neutral-900 bg-neutral-900/10">
                <Heading level="h4" className="mb-6">Direct Pathways</Heading>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-blue-500 mt-1 shrink-0" />
                    <div>
                      <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider block">Email Address</span>
                      <a href={`mailto:${socials.email}`} className="text-sm text-neutral-200 hover:text-blue-400 transition-colors">
                        {socials.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-blue-500 mt-1 shrink-0" />
                    <div>
                      <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider block">Phone Number</span>
                      <a href={`tel:${socials.phone.replace(/\s+/g, '')}`} className="text-sm text-neutral-200 hover:text-blue-400 transition-colors">
                        {socials.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-blue-500 mt-1 shrink-0" />
                    <div>
                      <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider block">Current Location</span>
                      <span className="text-sm text-neutral-200">{socials.location}</span>
                    </div>
                  </div>
                </div>
              </Card>


            </div>

            {/* Contact Form Card */}
            <div className="lg:col-span-7">
              <Card padding="lg" hoverable={false} className="border border-neutral-900 bg-neutral-900/10">
                {status === 'sent' ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mb-4" />
                  <Heading level="h3" className="mb-2">Email Client Opened</Heading>
                  <Paragraph size="md" className="text-neutral-500 mb-6">
                    Your message has been composed in your email client. Hit send when you're ready!
                  </Paragraph>
                  <Button onClick={() => setStatus('idle')} variant="secondary" size="sm">
                    Send another message
                  </Button>
                </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                        className="bg-neutral-950 border border-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                      
                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                        className="bg-neutral-950 border border-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="subject" className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="bg-neutral-950 border border-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="bg-neutral-950 border border-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      icon={<Send className="w-3.5 h-3.5" />}
                    >
                      Open Email Client
                    </Button>
                  </form>
                )}
              </Card>
            </div>

          </div>
        </Section>
      </Container>
    </div>
  );
};

export default Contact;
