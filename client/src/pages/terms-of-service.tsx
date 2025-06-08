import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-workplace-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-workplace-dark mb-4">Terms of Service</h1>
        </div>

        <div className="bg-white p-8 rounded-lg border border-gray-200 space-y-8">
          <div>
            <p className="text-workplace-gray mb-4">
              Please read these Terms of Use (Terms, Terms of Use) carefully before using the Workplace Janitorial Services website (the Service) operated by Workplace Janitorial Services (us, we, or our).
            </p>
            <p className="text-workplace-gray mb-4">
              Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.
            </p>
            <p className="text-workplace-gray">
              By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
            </p>
          </div>

          <hr className="border-gray-300" />

          <div>
            <h2 className="text-2xl font-bold text-workplace-dark mb-4">Accounts</h2>
            <p className="text-workplace-gray mb-4">
              When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
            <p className="text-workplace-gray mb-4">
              You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
            </p>
            <p className="text-workplace-gray">
              You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>
          </div>

          <hr className="border-gray-300" />

          <div>
            <h2 className="text-2xl font-bold text-workplace-dark mb-4">Intellectual Property</h2>
            <p className="text-workplace-gray">
              The Service and its original content, features and functionality are and will remain the exclusive property of Workplace Janitorial Services and its licensors.
            </p>
          </div>

          <hr className="border-gray-300" />

          <div>
            <h2 className="text-2xl font-bold text-workplace-dark mb-4">Links To Other Web Sites</h2>
            <p className="text-workplace-gray mb-4">
              Our Service may contain links to third-party web sites or services that are not owned or controlled by Workplace Janitorial Services.
            </p>
            <p className="text-workplace-gray mb-4">
              Workplace Janitorial Services has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that Workplace Janitorial Services shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
            </p>
            <p className="text-workplace-gray">
              We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.
            </p>
          </div>

          <hr className="border-gray-300" />

          <div>
            <h2 className="text-2xl font-bold text-workplace-dark mb-4">Termination</h2>
            <p className="text-workplace-gray mb-4">
              We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            <p className="text-workplace-gray mb-4">
              All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
            </p>
            <p className="text-workplace-gray mb-4">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            <p className="text-workplace-gray mb-4">
              Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
            </p>
            <p className="text-workplace-gray">
              All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
            </p>
          </div>

          <hr className="border-gray-300" />

          <div>
            <h2 className="text-2xl font-bold text-workplace-dark mb-4">Disclaimer</h2>
            <p className="text-workplace-gray">
              Your use of the Service is at your sole risk. The Service is provided on an AS IS and AS AVAILABLE basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
            </p>
          </div>

          <hr className="border-gray-300" />

          <div>
            <h2 className="text-2xl font-bold text-workplace-dark mb-4">Governing Law</h2>
            <p className="text-workplace-gray mb-4">
              These Terms shall be governed and construed in accordance with the laws of Canada without regard to its conflict of law provisions.
            </p>
            <p className="text-workplace-gray">
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.
            </p>
          </div>

          <hr className="border-gray-300" />

          <div>
            <h2 className="text-2xl font-bold text-workplace-dark mb-4">Changes</h2>
            <p className="text-workplace-gray mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 15 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p className="text-workplace-gray">
              By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
            </p>
          </div>

          <hr className="border-gray-300" />

          <div>
            <h2 className="text-2xl font-bold text-workplace-dark mb-4">Contact Us</h2>
            <p className="text-workplace-gray">
              If you have any questions about these Terms, please contact us.
            </p>
          </div>

          <div className="bg-workplace-blue text-white p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">Call Workplace Janitorial for a FREE on-site office cleaning assessment & pricing!</h3>
            <p className="mb-4">We are just a call away!</p>
            <Link href="#contact">
              <Button className="bg-white text-workplace-blue hover:bg-gray-100">
                Contact us today!
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}