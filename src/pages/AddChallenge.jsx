import { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

  const quillRef = useRef(null);

  const handleQuillChange = (value) => {
    setForm((prev) => ({ ...prev, description: value }));
  };

  // Optional: image upload handler for ReactQuill
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range ? range.index : 0, 'image', reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'link', 'image'
  ];

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
            <div className="w-full border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-400 pb-2">
              <ReactQuill
                ref={quillRef}
                value={form.description}
                onChange={handleQuillChange}
                modules={modules}
                formats={formats}
                style={{ minHeight: 200, height: 200, marginBottom: 34 }}
                className=""
                placeholder="Enter challenge description. You can upload images using the toolbar."
                required
              />
            </div>
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
