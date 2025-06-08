import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function PrivacyPolicy() {
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
          <h1 className="text-4xl font-bold text-workplace-dark mb-4">Privacy Policy</h1>
        </div>

        <div className="bg-white p-8 rounded-lg border border-gray-200 space-y-8">
          <div>
            <p className="text-workplace-gray mb-4">
              Workplace Janitorial Services (us, we, or our) operates the Workplace Janitorial Services website (the Service).
            </p>
            <p className="text-workplace-gray mb-4">
              This page informs you of our policies regarding the collection, use and disclosure of Personal Information when you use our Service.
            </p>
            <p className="text-workplace-gray mb-4">
              We will not use or share your information with anyone except as described in this Privacy Policy.
            </p>
            <p className="text-workplace-gray">
              We use your Personal Information for providing and improving the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.
            </p>
          </div>

          <hr className="border-gray-300" />

          <div>
            <h2 className="text-2xl font-bold text-workplace-dark mb-4">Information Collection And Use</h2>
            <p className="text-workplace-gray mb-4">
              While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information (Personal Information) may include, but is not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-workplace-gray ml-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Telephone number</li>
              <li>Address</li>
            </ul>
          </div>

          <hr className="border-gray-300" />

          <div>
            <h2 className="text-2xl font-bold text-workplace-dark mb-4">Log Data</h2>
            <p className="text-workplace-gray">
              We collect information that your browser sends whenever you visit our Service (Log Data). This Log Data may include information such as your computer's Internet Protocol (IP) address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages and other statistics.
            </p>
          </div>

          <hr className="border-gray-300" />

          <div>
            <h2 className="text-2xl font-bold text-workplace-dark mb-4">Cookies</h2>
            <p className="text-workplace-gray mb-4">
              Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer's hard drive.
            </p>
            <p className="text-workplace-gray">
              We use cookies to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
            </p>
          </div>

          <hr className="border-gray-300" />

          <div>
            <h2 className="text-2xl font-bold text-workplace-dark mb-4">Service Providers</h2>
            <p className="text-workplace-gray">
              We may employ third party companies and individuals to facilitate our Service, to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.
            </p>
            <p className="text-workplace-gray mt-4">
              These third parties have access to your Personal Information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
          </div>

          <hr className="border-gray-300" />

          <div>
            <h2 className="text-2xl font-bold text-workplace-dark mb-4">Security</h2>
            <p className="text-workplace-gray">
              The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
            </p>
          </div>

          <hr className="border-gray-300" />

          <div>
            <h2 className="text-2xl font-bold text-workplace-dark mb-4">Links To Other Sites</h2>
            <p className="text-workplace-gray mb-4">
              Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
            </p>
            <p className="text-workplace-gray">
              We have no control over, and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
            </p>
          </div>

          <hr className="border-gray-300" />

          <div>
            <h2 className="text-2xl font-bold text-workplace-dark mb-4">Children's Privacy</h2>
            <p className="text-workplace-gray mb-4">
              Our Service does not address anyone under the age of 18 (Children).
            </p>
            <p className="text-workplace-gray">
              We do not knowingly collect personally identifiable information from children under 18. If you are a parent or guardian and you are aware that your child has provided us with Personal Information, please contact us. If we discover that a child under 18 has provided us with Personal Information, we will delete such information from our servers immediately.
            </p>
          </div>

          <hr className="border-gray-300" />

          <div>
            <h2 className="text-2xl font-bold text-workplace-dark mb-4">Compliance With Laws</h2>
            <p className="text-workplace-gray">
              We will disclose your Personal Information where required to do so by law or subpoena.
            </p>
          </div>

          <hr className="border-gray-300" />

          <div>
            <h2 className="text-2xl font-bold text-workplace-dark mb-4">Changes To This Privacy Policy</h2>
            <p className="text-workplace-gray mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
            <p className="text-workplace-gray">
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </div>

          <hr className="border-gray-300" />

          <div>
            <h2 className="text-2xl font-bold text-workplace-dark mb-4">Contact Us</h2>
            <p className="text-workplace-gray">
              If you have any questions about this Privacy Policy, please contact us.
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