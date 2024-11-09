import React, { useEffect } from "react";
import Tabs from "../../components/Tabs";
// compornents
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";
import EmailTemplate from "../EmailTemplate/EmailTemplate";
import Compaigns from "./components/Compaigns/Compaigns";
import EmailAccounts from "./components/EmailAccounts/EmailAccounts";
import Sequence from "./components/Sequence/Sequence";
import { useDispatch, useSelector } from "react-redux";
import { getWarmupApi, sendWarmupEmail } from "../../redux/services/warmup";
import { getEmailAccountsApi } from "../../redux/services/email";
import { toast } from "react-toastify";
import Layout from "../../layout/Layout";
import LineChart from "../../components/Charts/LineChart";
import {
  getCompaignsEmailAnalytics,
  getCompaignsLeadAnalytics,
} from "../../redux/services/dashboard";

const DashboardContent = () => {
  const { user_id, token } = useSelector((state) => state.auth);
  const { emails } = useSelector((state) => state.email);
  const { email_report, lead_report } = useSelector((state) => state.dashboard);

  const dispatch = useDispatch();
  const tabsData = [
    {
      id: "dashboard",
      label: "Dashboard",
      content: <Dashboard />,
    },

    {
      id: "email_compaign",
      label: "Email Compaigns",
      content: <Compaigns />,
    },

    // {
    //   id: "profile",
    //   label: "Profile",
    //   content: <Settings />,
    // },
    {
      id: "templates",
      label: "Templates",
      content: <EmailTemplate />,
    },
    {
      id: "sequence",
      label: "Sequence",
      content: <Sequence />,
    },
    {
      id: "email-accounts",
      label: "Email Accounts",
      content: <EmailAccounts />,
    },
  ];
  const emailProposals = [
    {
      email: "mu24081999@gmail.com",
      subject: "Website Development Proposal",
      html: `
        <h1>Proposal for Website Development</h1>
        <p>Dear Client,</p>
        <p>We are excited to offer our services to create an amazing website tailored to your needs. Below are the details:</p>
        <ul>
          <li><strong>Project Timeline:</strong> 4-6 weeks</li>
          <li><strong>Cost Estimate:</strong> $5000 - $7000</li>
          <li><strong>Technologies:</strong> React, Node.js, MongoDB</li>
        </ul>
        <p>Looking forward to discussing further.</p>
        <p>Best regards,<br>Your Company</p>
      `,
    },
    {
      email: "umarrajpoot274@gmail.com",
      subject: "Mobile App Development Proposal",
      html: `
        <h1>Proposal for Mobile App Development</h1>
        <p>Hello,</p>
        <p>We are pleased to submit our proposal for developing a feature-rich mobile application for your business. Key details:</p>
        <ul>
          <li><strong>Platform:</strong> iOS and Android</li>
          <li><strong>Cost Estimate:</strong> $10,000 - $15,000</li>
          <li><strong>Timeline:</strong> 8-10 weeks</li>
        </ul>
        <p>We believe our experience aligns perfectly with your requirements.</p>
        <p>Regards,<br>Development Team</p>
      `,
    },
    {
      email: "mu24081999@gmail.com",
      subject: "SEO and Digital Marketing Proposal",
      html: `
        <h1>Proposal for SEO & Digital Marketing Services</h1>
        <p>Hi there,</p>
        <p>We would love to assist you in improving your online presence through SEO and digital marketing strategies. Key highlights:</p>
        <ul>
          <li><strong>Monthly Fee:</strong> $1500</li>
          <li><strong>Duration:</strong> 6 months</li>
          <li><strong>Services:</strong> SEO, Social Media Marketing, PPC Campaigns</li>
        </ul>
        <p>Let's connect to explore how we can grow your business!</p>
        <p>Sincerely,<br>Marketing Experts</p>
      `,
    },
  ];
  // Helper function to get 2 random emails from the fetched data
  const getRandomEmails = (emails, email_count) => {
    const shuffled = emails.sort(() => 0.5 - Math.random()); // Shuffle the array
    return shuffled.slice(0, email_count); // Pick the first 2 emails
  };
  const data = getRandomEmails(emailProposals, 2);
  console.log("🚀 ~ DashboardContent ~ data:", data);

  // Function to send email using the backend
  const sendEmail = async (toEmail, fromEmail) => {
    try {
      const params = {
        email_id: 1,
        // google_app_password: "umssnlleadatrdji",
        google_app_password: fromEmail?.password,
        email_type: "gmail",
        email_to: toEmail?.email,
        // mail_provider,
        sender_first_name: "Muhammad Umar",
        sender_last_name: "Liaqat",
        subject: "SEO & Digital Marketing Services Proposal",
        // auth_type,
        body: toEmail?.html,
      };
      const response = dispatch(sendWarmupEmail(token, params));
      return true;
    } catch (error) {
      toast.error("Failed to send email:" + error.message);
    }
  };
  // Effect to trigger sending email daily
  useEffect(() => {
    const interval = setInterval(() => {
      Array.isArray(emails?.accountsData) &&
        emails?.accountsData?.forEach((element) => {
          data?.map(async (email) => {
            await sendEmail(email, element);
          });
        });
    }, 24 * 60 * 60 * 1000); // Run every 24 hours

    return () => clearInterval(interval); // Cleanup on unmount
  }, [data, sendEmail, emails]);
  useEffect(() => {
    const query = `user_id=${user_id}`;
    dispatch(getEmailAccountsApi(token, query));
    dispatch(getCompaignsEmailAnalytics(token));
    dispatch(getCompaignsLeadAnalytics(token));

    return () => {};
  }, [user_id, token, dispatch]);
  return (
    <div>
      {/* <Tabs tabsData={tabsData} /> */}
      <Dashboard />
      <LineChart emailData={email_report} leadData={lead_report} />
    </div>
  );
};

export default DashboardContent;
