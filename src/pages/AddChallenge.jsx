import { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { addChallengeApi } from '../apis/challenge';
import { useNavigate } from 'react-router-dom';

const AddChallenge = () => {
  const [form, setForm] = useState(() => ({
    name: '',
    description: '',
    startDate: '',
    endDate: ''
  }));
  const navigate = useNavigate();
  // Get JWT from cookie (simple implementation, you may want to use a library for production)
  const getJwtFromCookie = () => {
    debugger
    const match = document.cookie.match(/(?:^|; )jwt=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : '';
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const quillRef = useRef(null);

  const handleQuillChange = (value) => {
    setForm((prev) => ({ ...prev, description: value }));
  };

  // Optional: image upload handler for ReactQuill
//   const imageHandler = () => {
//     const input = document.createElement('input');
//     input.setAttribute('type', 'file');
//     input.setAttribute('accept', 'image/*');
//     input.click();
//     input.onchange = async () => {
//       const file = input.files[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onload = () => {
//           const quill = quillRef.current.getEditor();
//           const range = quill.getSelection();
//           quill.insertEmbed(range ? range.index : 0, 'image', reader.result);
//         };
//         reader.readAsDataURL(file);
//       }
//     };
//   };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean']
      ]
    }
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'link', 'image'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const challengeData = {
      title: form.name,
      description: form.description,
      start_date: form.startDate,
      end_date: form.endDate
    };
    const jwt = getJwtFromCookie();
    const [result, error] = await addChallengeApi(challengeData, jwt);
    if (error) {
      alert(error);
    } else {
      setForm({ name: '', description: '', startDate: '', endDate: '' });
      navigate('/active-challenges');
    }
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
            <div className="w-full mb-6">
              
              <ReactQuill 
                ref={quillRef}
                theme="snow" 
                value={form.description ?? ''} 
                onChange={handleQuillChange}
                modules={modules}
                formats={formats}
                style={{ minHeight: 120, height: 120, marginBottom: '3rem' }}
                placeholder="Enter challenge description. You can upload images using the toolbar."
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
