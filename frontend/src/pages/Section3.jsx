import React from 'react';

import IconSoftware from '../assets/icons/software.svg';
import IconBI from '../assets/icons/bi.svg';
import IconERP from '../assets/icons/erp.svg';
import IconInfra from '../assets/icons/infrastructure.svg';

const Section3 = () => {
  return (
    <section className="bg-[#3C66AF] text-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Title and Action */}
        <div className="flex flex-col md:flex-row items-start justify-between">
          <h2 className="text-3xl md:text-4xl font-semibold max-w-xl">
            Artec Int, The One Source for all your business tech needs
          </h2>
          <a href="#contact" className="text-white text-base mt-4 md:mt-0 hover:underline">
            Work With Us
          </a>
        </div>

        {/* 2x2 Grid Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Software Engineering */}
          <div className="flex items-start gap-6">
            <img src={IconSoftware} alt="Software Engineering" className="w-16 h-16" />
            <div>
              <h3 className="text-xl font-semibold">Software Engineering</h3>
              <p className="mt-2 text-white/90">
                Accelerate your digital transformation by assisting you, from the identification
                of your needs till the successful project delivery.
              </p>
            </div>
          </div>

          {/* Business Intelligence */}
          <div className="flex items-start gap-6">
            <img src={IconBI} alt="Business Intelligence" className="w-16 h-16" />
            <div>
              <h3 className="text-xl font-semibold">Business Intelligence</h3>
              <p className="mt-2 text-white/90">
                Artec Int BI solutions will help your decision process to become data-driven,
                optimize your business and increase your profit.
              </p>
            </div>
          </div>

          {/* ERP & CRM Solutions */}
          <div className="flex items-start gap-6">
            <img src={IconERP} alt="ERP & CRM Solutions" className="w-16 h-16" />
            <div>
              <h3 className="text-xl font-semibold">ERP & CRM Solutions</h3>
              <p className="mt-2 text-white/90">
                We offer you an all-in-one software solution to better manage and run your business.
                As an official Odoo partner we’ll offer you the best in class product, consultancy & support.
              </p>
            </div>
          </div>

          {/* Infrastructure Solutions */}
          <div className="flex items-start gap-6">
            <img src={IconInfra} alt="Infrastructure Solutions" className="w-16 h-16" />
            <div>
              <h3 className="text-xl font-semibold">Infrastructure Solutions</h3>
              <p className="mt-2 text-white/90">
                Artec Int provides system & infrastructure solutions and services to grant the best IT
                infrastructure for your business or company.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section3;
