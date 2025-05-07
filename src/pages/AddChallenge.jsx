import { useState } from 'react';

const AddChallenge = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle form submission (API call)
    setForm({ name: '', description: '', startDate: '', endDate: '' });
    // Optionally redirect or show a success message
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-100 py-12">
      <div className="w-full max-w-2xl px-4 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-8">Add Challenge</h2>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 w-full flex flex-col gap-6">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            {/* Replace textarea with a rich text editor if needed */}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block font-medium mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition self-end"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddChallenge;
