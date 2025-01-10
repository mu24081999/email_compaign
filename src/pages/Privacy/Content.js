import React from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const navigateTo = useNavigate();
  return (
    <div>
      <Button className="mx-5 my-3 bg-black" onClick={() => navigateTo("/")}>
        Back
      </Button>
      <div className="">
        <div className=" bg-gray-50">
          <div className=" text-gray-900 max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
            <div className="max-w-7xl mx-auto px-6 py-12">
              <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
              <p className="text-lg mb-6">Effective Date: 10-Jan-2025</p>
              <p className="mb-4">
                Senderside.com ("Senderside," "we," "our," or "us") is committed
                to protecting your privacy. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                use our website and services (collectively, the "Services"). By
                using the Services, you agree to the practices described in this
                Privacy Policy.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                1. Information We Collect
              </h2>
              <h3 className="text-xl font-semibold mb-2">
                1.1 Personal Information
              </h3>
              <p className="mb-4">
                We may collect personal information that you provide to us
                directly, such as:
                <ul className="list-disc pl-6">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Payment information</li>
                </ul>
              </p>
              <h3 className="text-xl font-semibold mb-2">
                1.2 Non-Personal Information
              </h3>
              <p className="mb-4">
                We may collect non-personal information about your interactions
                with our Services, including:
                <ul className="list-disc pl-6">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device information</li>
                  <li>Pages visited</li>
                  <li>Date and time of access</li>
                </ul>
              </p>
              <h3 className="text-xl font-semibold mb-2">
                1.3 Cookies and Tracking Technologies
              </h3>
              <p className="mb-4">
                We use cookies, web beacons, and similar technologies to enhance
                your experience on our site. For more details, see Section 7.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="mb-4">
                We use the information we collect for purposes such as:
                <ul className="list-disc pl-6">
                  <li>Providing and improving our Services</li>
                  <li>Processing payments and fulfilling transactions</li>
                  <li>
                    Responding to your inquiries and customer service requests
                  </li>
                  <li>
                    Sending promotional communications, if you have opted in
                  </li>
                  <li>Ensuring the security of our Services</li>
                  <li>Complying with legal obligations</li>
                </ul>
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                3. How We Share Your Information
              </h2>
              <p className="mb-4">
                We do not sell your personal information. However, we may share
                your information with third parties in the following
                circumstances:
                <ul className="list-disc pl-6">
                  <li>
                    Service Providers: To vendors and contractors who perform
                    services on our behalf, such as payment processing and data
                    analysis.
                  </li>
                  <li>
                    Legal Compliance: To comply with legal obligations, enforce
                    our terms, or protect our rights.
                  </li>
                  <li>
                    Business Transfers: In connection with a merger, sale, or
                    transfer of our business.
                  </li>
                </ul>
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                4. Data Retention
              </h2>
              <p className="mb-4">
                We retain your personal information for as long as necessary to
                fulfill the purposes outlined in this Privacy Policy, unless a
                longer retention period is required or permitted by law.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                5. Your Rights
              </h2>
              <p className="mb-4">
                Depending on your location, you may have the following rights:
                <ul className="list-disc pl-6">
                  <li>
                    Access: Request a copy of the personal information we hold
                    about you.
                  </li>
                  <li>
                    Rectification: Request corrections to your personal
                    information.
                  </li>
                  <li>
                    Deletion: Request the deletion of your personal information.
                  </li>
                  <li>
                    Data Portability: Request a copy of your personal data in a
                    structured format.
                  </li>
                  <li>
                    Opt-Out: Withdraw consent for marketing communications.
                  </li>
                </ul>
                To exercise these rights, please contact us at{" "}
                <a
                  href="mailto:privacy@senderside.com"
                  className="text-blue-600"
                >
                  privacy@senderside.com
                </a>
                .
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                6. Security Measures
              </h2>
              <p className="mb-4">
                We implement appropriate technical and organizational measures
                to protect your personal information from unauthorized access,
                disclosure, alteration, or destruction. However, no security
                system is completely foolproof, and we cannot guarantee absolute
                security.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                7. Cookies and Tracking Technologies
              </h2>
              <h3 className="text-xl font-semibold mb-2">
                7.1 What Are Cookies?
              </h3>
              <p className="mb-4">
                Cookies are small text files stored on your device that help us
                recognize your browser and remember information about your
                visit.
              </p>
              <h3 className="text-xl font-semibold mb-2">
                7.2 How We Use Cookies
              </h3>
              <p className="mb-4">
                We use cookies to:
                <ul className="list-disc pl-6">
                  <li>Improve site functionality</li>
                  <li>Analyze site performance</li>
                  <li>Provide targeted advertising</li>
                </ul>
              </p>
              <h3 className="text-xl font-semibold mb-2">
                7.3 Managing Cookies
              </h3>
              <p className="mb-4">
                You can control or disable cookies through your browser
                settings. Note that some features of our site may not function
                properly without cookies.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                8. Third-Party Links
              </h2>
              <p className="mb-4">
                Our Services may contain links to third-party websites. We are
                not responsible for the privacy practices or content of these
                third-party sites. We encourage you to review their privacy
                policies before providing any personal information.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                9. International Data Transfers
              </h2>
              <p className="mb-4">
                If you are located outside of [Insert Country], your information
                may be transferred to and processed in [Insert Country] or other
                jurisdictions. By using our Services, you consent to the
                transfer of your information to these locations.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                10. Children's Privacy
              </h2>
              <p className="mb-4">
                Our Services are not intended for individuals under the age of
                18. We do not knowingly collect personal information from
                children under 18. If we become aware that we have collected
                such information, we will take steps to delete it.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                11. Changes to This Privacy Policy
              </h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with an updated effective date. Your
                continued use of our Services constitutes your acceptance of the
                revised Privacy Policy.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                12. Contact Us
              </h2>
              <p className="mb-4">
                If you have any questions or concerns about this Privacy Policy,
                please contact us at:
                <br />
                Email:{" "}
                <a
                  href="mailto:privacy@senderside.com"
                  className="text-blue-600"
                >
                  privacy@senderside.com
                </a>
              </p>

              <p className="mt-8">
                Thank you for trusting Senderside.com with your information!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
