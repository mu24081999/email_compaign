import React from 'react';

const templates = [
  {
    id: 1,
    name: 'Welcome Series',
    description: 'A series of welcome emails for new subscribers',
    emails: [
      { subject: 'Welcome to our community!', delay: '0 days' },
      { subject: 'Getting Started Guide', delay: '2 days' },
      { subject: 'Tips & Tricks', delay: '5 days' }
    ]
  },
  {
    id: 2,
    name: 'Product Launch',
    description: 'Sequence for new product launches',
    emails: [
      { subject: 'Coming Soon - Exciting News!', delay: '0 days' },
      { subject: 'Launch Day is Here!', delay: '7 days' },
      { subject: 'Last Chance Offer', delay: '10 days' }
    ]
  }
];

function EmailTemplate({ selectedTemplate, onTemplateSelect }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select Email Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedTemplate?.id === template.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => onTemplateSelect(template)}
          >
            <h3 className="font-semibold text-lg">{template.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{template.description}</p>
            <div className="space-y-2">
              {template.emails.map((email, index) => (
                <div key={index} className="text-sm text-gray-700">
                  <span className="font-medium">{email.subject}</span>
                  <span className="text-gray-500 ml-2">({email.delay})</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmailTemplate;