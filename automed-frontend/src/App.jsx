// App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    batchNumber: '',
    expiryDate: '',
    chemical_stability: '',
    contamination_level: '',
    ph_level: '',
    sterility_index: '',
    temperature_exposure: '',
    moisture_content: ''
  });

  const [medicines, setMedicines] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      batchNumber: formData.batchNumber,
      expiryDate: formData.expiryDate,
      qualityParams: {
        chemical_stability: parseFloat(formData.chemical_stability),
        contamination_level: parseFloat(formData.contamination_level),
        ph_level: parseFloat(formData.ph_level),
        sterility_index: parseFloat(formData.sterility_index),
        temperature_exposure: parseFloat(formData.temperature_exposure),
        moisture_content: parseFloat(formData.moisture_content)
      }
    };

    try {
      await axios.post('http://localhost:5000/api/medicines', payload);
      fetchMedicines();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMedicines = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/medicines');
      setMedicines(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Medicine Quality Entry</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input name="name" placeholder="Medicine Name" onChange={handleChange} className="w-full p-2 border" required />
        <input name="batchNumber" placeholder="Batch Number" onChange={handleChange} className="w-full p-2 border" required />
        <input name="expiryDate" type="date" onChange={handleChange} className="w-full p-2 border" required />
        <input name="chemical_stability" type="number" step="any" placeholder="Chemical Stability" onChange={handleChange} className="w-full p-2 border" required />
        <input name="contamination_level" type="number" step="any" placeholder="Contamination Level" onChange={handleChange} className="w-full p-2 border" required />
        <input name="ph_level" type="number" step="any" placeholder="pH Level" onChange={handleChange} className="w-full p-2 border" required />
        <input name="sterility_index" type="number" step="any" placeholder="Sterility Index" onChange={handleChange} className="w-full p-2 border" required />
        <input name="temperature_exposure" type="number" step="any" placeholder="Temperature Exposure" onChange={handleChange} className="w-full p-2 border" required />
        <input name="moisture_content" type="number" step="any" placeholder="Moisture Content" onChange={handleChange} className="w-full p-2 border" required />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>

      <h2 className="text-xl font-semibold mt-8 mb-2">Stored Medicines</h2>
      <div className="space-y-2">
        {medicines.map((med, index) => (
          <div key={index} className="border p-2 rounded shadow">
            <div><strong>{med.name}</strong> (Batch {med.batchNumber})</div>
            <div>Expires: {new Date(med.expiryDate).toLocaleDateString()}</div>
            <div>AI Result: <span className={med.aiResult?.result === 'Pass' ? 'text-green-600' : 'text-red-600'}>{med.aiResult?.result}</span></div>
            <div>Confidence: {med.aiResult?.confidence}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
