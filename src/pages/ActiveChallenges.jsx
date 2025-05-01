

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
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">Active Challenges</h2>
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl px-4">
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
  );
};

export default ActiveChallenges;
