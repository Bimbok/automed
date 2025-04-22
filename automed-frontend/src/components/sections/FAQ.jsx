import React, { useState } from 'react';

const FAQ = () => {
  const faqs = [
    {
      id: 1,
      question: 'How does AutoMed ensure accurate medicine quality analysis?',
      answer: 'AutoMed uses advanced AI algorithms and machine learning to analyze multiple quality parameters of medicines. Our system continuously learns from data patterns and pharmaceutical standards to provide precise quality assessments. The platform is regularly updated with the latest pharmaceutical guidelines and quality standards.',
    },
    {
      id: 2,
      question: 'What types of quality parameters does AutoMed analyze?',
      answer: 'AutoMed analyzes a comprehensive range of quality parameters including chemical composition, physical properties, dissolution rates, stability, and contamination levels. The system can detect subtle variations that might indicate quality issues, helping prevent potential problems before they affect product quality.',
    },
    {
      id: 3,
      question: 'Is AutoMed suitable for both small and large pharmaceutical companies?',
      answer: 'Yes, AutoMed is designed to scale with your needs. Our platform is equally effective for small research labs and large pharmaceutical manufacturers. We offer different tiers of service to accommodate various production volumes and analysis requirements.',
    },
    {
      id: 4,
      question: 'How does AutoMed handle data security and compliance?',
      answer: 'We maintain the highest standards of data security and compliance. AutoMed is compliant with pharmaceutical industry regulations including GMP, GLP, and FDA guidelines. All data is encrypted, and we implement strict access controls to ensure the confidentiality of your quality analysis data.',
    },
    {
      id: 5,
      question: 'Can AutoMed integrate with existing laboratory systems?',
      answer: 'Yes, AutoMed offers seamless integration with most laboratory information management systems (LIMS) and quality management systems. Our API allows for easy data exchange and automated workflows, ensuring smooth integration with your existing infrastructure.',
    },
    {
      id: 6,
      question: 'What kind of support and training does AutoMed provide?',
      answer: 'We provide comprehensive support including 24/7 technical assistance, regular system updates, and detailed training programs. Our support team includes pharmaceutical quality experts who can help with both technical and regulatory aspects of quality analysis.',
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600">
            Find answers to common questions about medicine quality analysis and our platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={faq.id}
              className="border border-slate-200 rounded-lg overflow-hidden bg-white transition-all duration-200 hover:shadow-md"
            >
              <button
                className="flex justify-between items-center w-full p-6 text-left"
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
              >
                <h3 className="text-lg font-medium text-slate-900">{faq.question}</h3>
                <svg
                  className={`h-6 w-6 text-indigo-500 transform transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="p-6 pt-0 text-slate-600">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600">
            Still have questions?
            <a href="#contact" className="text-indigo-600 font-medium ml-1 hover:text-indigo-700">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;