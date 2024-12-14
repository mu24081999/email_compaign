import React from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const navigateTo = useNavigate();
  return (
    <div>
      <Button className="mx-5 my-3" onClick={() => navigateTo("/")}>
        Back
      </Button>
      <div className="bg-gray-100 text-gray-800">
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
          <h1 className="text-2xl font-bold text-center text-gray-900">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-600 text-center mt-1">
            Effective Date: 14-December-2024
          </p>
          <p className="mt-4 text-gray-700">
            SenderSide.com ("we," "our," or "us") respects your privacy and is
            committed to protecting your personal information. This Privacy
            Policy explains how we collect, use, share, and protect the data you
            provide when using our services. By using SenderSide.com, you agree
            to the terms outlined below.
          </p>

          <section className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">
              1. Information We Collect
            </h2>
            <p className="mt-2 text-gray-700">
              We may collect and process the following types of information:
            </p>
            <ul className="list-disc ml-5 mt-2 text-gray-700">
              <li>
                <strong>Personal Information:</strong> Name, email address,
                phone number, and payment details.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about your activity on
                our platform, including call durations, message logs, and
                virtual number usage.
              </li>
              <li>
                <strong>Device Information:</strong> IP address, browser type,
                and operating system details.
              </li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">
              2. How We Use Your Information
            </h2>
            <p className="mt-2 text-gray-700">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc ml-5 mt-2 text-gray-700">
              <li>
                To provide and maintain our inbound and outbound communication
                services.
              </li>
              <li>To process payments and manage billing.</li>
              <li>To monitor call and message usage for quality assurance.</li>
              <li>
                To comply with legal obligations and prevent fraudulent
                activities.
              </li>
              <li>
                To communicate updates, offers, or notifications related to our
                services.
              </li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">
              3. Service Pricing and Billing
            </h2>
            <ul className="list-disc ml-5 mt-2 text-gray-700">
              <li>
                <strong>Voice Call Rates:</strong> $0.028 per minute (one-minute
                rounding). Calls under 60 seconds are rounded up to a full
                minute.
              </li>
              <li>
                <strong>Messaging Rates:</strong>
                <ul className="list-disc ml-6 mt-1">
                  <li>Outbound SMS/MMS: $0.0300 per message.</li>
                  <li>Inbound SMS/MMS: $0.0200 per message.</li>
                </ul>
              </li>
              <li>
                <strong>Virtual Numbers:</strong> $3.50 per virtual number
                (monthly charge).
              </li>
              <li>
                All billing is calculated in accordance with our system's
                capabilities and policies.
              </li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">
              4. Data Sharing and Disclosure
            </h2>
            <p className="mt-2 text-gray-700">
              We do not sell your personal information. However, we may share
              your data in the following circumstances:
            </p>
            <ul className="list-disc ml-5 mt-2 text-gray-700">
              <li>
                <strong>With Service Providers:</strong> Third parties who
                assist us in delivering services (e.g., payment processors, SMS
                gateways).
              </li>
              <li>
                <strong>For Legal Compliance:</strong> If required by law or in
                response to valid legal requests.
              </li>
              <li>
                <strong>To Prevent Fraud or Security Issues:</strong> Sharing
                data to protect against misuse of our services.
              </li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">
              5. Data Retention
            </h2>
            <p className="mt-2 text-gray-700">
              We retain your information only for as long as necessary to
              fulfill the purposes described in this policy or as required by
              law. Billing records and communication logs may be stored for
              compliance purposes.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">
              6. Your Privacy Rights
            </h2>
            <p className="mt-2 text-gray-700">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc ml-5 mt-2 text-gray-700">
              <li>Access, correct, or delete your personal information.</li>
              <li>Opt-out of marketing communications.</li>
              <li>Request information about how your data is used.</li>
            </ul>
            <p className="mt-2 text-gray-700">
              For inquiries, please contact us at
              <a
                href="mailto:sales@senderside.com"
                className="text-blue-600 underline"
              >
                sales@senderside.com
              </a>
              .
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">
              7. Data Security
            </h2>
            <p className="mt-2 text-gray-700">
              We implement strict security measures to protect your personal
              information, including:
            </p>
            <ul className="list-disc ml-5 mt-2 text-gray-700">
              <li>Encryption of sensitive data.</li>
              <li>Secure servers and firewalls.</li>
              <li>Regular security audits and monitoring.</li>
            </ul>
            <p className="mt-2 text-gray-700">
              However, no method of transmission is 100% secure, and we cannot
              guarantee absolute protection.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">
              8. Changes to This Policy
            </h2>
            <p className="mt-2 text-gray-700">
              We may update this Privacy Policy periodically. Changes will be
              communicated via our website or email. Continued use of our
              services after updates signifies your acceptance of the revised
              terms.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">
              9. Contact Us
            </h2>
            <p className="mt-2 text-gray-700">
              If you have any questions about this Privacy Policy or your data,
              please contact us:
            </p>
            <ul className="list-disc ml-5 mt-2 text-gray-700">
              <li>
                Email:
                <a
                  href="mailto:sales@senderside.com"
                  className="text-blue-600 underline"
                >
                  sales@senderside.com
                </a>
              </li>
              <li>
                Website:
                <a
                  href="https://senderside.com"
                  className="text-blue-600 underline"
                >
                  https://senderside.com
                </a>
              </li>
            </ul>
          </section>

          <p className="mt-8 text-center text-gray-600">
            Thank you for trusting SenderSide.com! We love to serve.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Content;
