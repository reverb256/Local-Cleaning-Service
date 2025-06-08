import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Eye, Lock, UserCheck } from "lucide-react";
import { Link } from "wouter";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-workplace-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-workplace-dark mb-4">Privacy Standards</h1>
          <p className="text-xl text-workplace-gray">
            Workplace Janitorial Services - Comprehensive Privacy Protection Framework
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-lg border-2 border-workplace-blue">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-workplace-blue mr-3" />
              <h2 className="text-2xl font-bold text-workplace-dark">Information Collection & Use</h2>
            </div>
            <div className="space-y-4 text-workplace-gray">
              <p>
                Workplace Janitorial Services collects information solely to provide superior cleaning services to our commercial clients in Winnipeg and surrounding areas.
              </p>
              <h3 className="text-lg font-semibold text-workplace-dark">Personal Information We Collect:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Business contact information (name, title, email, phone)</li>
                <li>Facility details (address, square footage, cleaning requirements)</li>
                <li>Service preferences and scheduling information</li>
                <li>Billing and payment information</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg border-2 border-workplace-blue">
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 text-workplace-blue mr-3" />
              <h2 className="text-2xl font-bold text-workplace-dark">Data Protection & Security</h2>
            </div>
            <div className="space-y-4 text-workplace-gray">
              <p>
                Your information is protected through industry-leading security measures and strict access controls.
              </p>
              <h3 className="text-lg font-semibold text-workplace-dark">Security Measures:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Encrypted data transmission and storage</li>
                <li>Limited access on need-to-know basis</li>
                <li>Regular security audits and updates</li>
                <li>Compliance with Canadian privacy legislation (PIPEDA)</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg border-2 border-workplace-blue">
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 text-workplace-blue mr-3" />
              <h2 className="text-2xl font-bold text-workplace-dark">Information Sharing</h2>
            </div>
            <div className="space-y-4 text-workplace-gray">
              <p>
                Workplace Janitorial Services does not sell, trade, or share your personal information with third parties except as outlined below:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>With your explicit consent</li>
                <li>To provide requested services (scheduling, billing)</li>
                <li>When required by law or regulation</li>
                <li>To protect our rights or property</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg border-2 border-workplace-blue">
            <div className="flex items-center mb-4">
              <UserCheck className="w-6 h-6 text-workplace-blue mr-3" />
              <h2 className="text-2xl font-bold text-workplace-dark">Your Rights</h2>
            </div>
            <div className="space-y-4 text-workplace-gray">
              <p>
                Under Canadian privacy law, you have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal information</li>
                <li>Request corrections to inaccurate data</li>
                <li>Withdraw consent where applicable</li>
                <li>File complaints about our privacy practices</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at (204) 334-2817 or visit our office at 2-761 Marion Street, Winnipeg, MB R2J 0K6.
              </p>
            </div>
          </div>

          <div className="bg-workplace-blue text-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Contact Our Privacy Officer</h2>
            <p className="mb-4">
              For questions about this privacy policy or our data practices:
            </p>
            <div className="space-y-2">
              <p><strong>Phone:</strong> (204) 334-2817</p>
              <p><strong>Address:</strong> 2-761 Marion Street, Winnipeg, MB R2J 0K6</p>
              <p><strong>Last Updated:</strong> January 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}