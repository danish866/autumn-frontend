

import { useNavigate } from 'react-router-dom';
import code from '../assets/code.svg';
import camera from '../assets/camera.svg';
import computer from '../assets/computer.svg';

const challenges = [
  {
    title: "Monthly Code Challenge",
    image: code
  },
  {
    title: "Video Solution Challenge",
    image: camera
  },
  {
    title: "Programming Task Challenge",
    image: computer
  }
];

const ActiveChallenges = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-100 py-12">
      <div className="w-full max-w-6xl px-4 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Active Challenges</h2>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
            onClick={() => navigate('/add-challenge')}
          >
            Add Challenge
          </button>
        </div>
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {challenges.map((challenge, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl shadow-xl flex flex-col items-center p-10 hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={challenge.image}
                alt={challenge.title + ' icon'}
                className="h-40 w-40 object-contain mb-6"
              />
              <div className="font-bold text-2xl text-gray-800 text-center">
                {challenge.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveChallenges;
