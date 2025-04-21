// App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    batchNumber: '',
    expiryDate: '',
    param1: '',
    param2: ''
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
        param1: parseFloat(formData.param1),
        param2: parseFloat(formData.param2)
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
        <input name="param1" type="number" step="any" placeholder="Param 1" onChange={handleChange} className="w-full p-2 border" required />
        <input name="param2" type="number" step="any" placeholder="Param 2" onChange={handleChange} className="w-full p-2 border" required />
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
