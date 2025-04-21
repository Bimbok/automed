import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MedicineQualityAnalysis from '../components/sections/MedicineQualityAnalysis';

const MedicineQualityPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-20">
        <MedicineQualityAnalysis />
      </div>
      <Footer />
    </div>
  );
};

export default MedicineQualityPage;