import React from 'react';
import ArtecLogo from '../assets/logo-artec-2.png'; 
import OdooLogo from '../assets/Odoo.png';   
import Medal13 from '../assets/medal-13.png';     
import Medal14 from '../assets/medal-14.png';     

const Section2 = () => {
  return (
    <section className="px-6 md:px-20 py-16 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Text Section */}
        <div className="md:w-1/2 text-left space-y-6">
          <h2 className="text-xl font-semibold">SARL ARTEC INT</h2>
          <p className="text-gray-700">
            Artec Int is an Algerian Integrated Solutions provider. We operate in several
            countries in Africa, Europe and Middle East.
          </p>
          <p className="text-gray-700">
            Our experienced people can easily accelerate your digital transformation by
            assisting you, from the identification of your needs and definition of your
            business case till the successful project delivery within pre-agreed budget and
            time plan.
          </p>
          <p className="text-gray-700">
            We are ensuring a technical and business support to several companies. As a result,
            we’re making them able to achieve their operations and business objectives by
            providing innovative technologies. ERP Algerie, best in class consultancy and high
            quality pre & post sale services.
          </p>
          <a href="#contact" className="text-gray-800 font-medium hover:underline inline-flex items-center">
            Contact us <span className="ml-2">➡</span>
          </a>
        </div>

        {/* Logo Section */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start space-y-6">
          <img src={ArtecLogo} alt="ARTEC INT" className="h-32 md:h-20" />
          <div className="flex flex-wrap items-center gap-4">
            <img src={OdooLogo} alt="Odoo Silver Partner" className="h-36" />
            <img src={Medal13} alt="Odoo v13 Badge" className="h-44" />
            <img src={Medal14} alt="Odoo v14 Badge" className="h-44" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
