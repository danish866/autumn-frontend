

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchChallengesApi } from '../apis/challenge';
import code from '../assets/code.svg';
import camera from '../assets/camera.svg';
import computer from '../assets/computer.svg';

const ActiveChallenges = () => {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [data, err] = await fetchChallengesApi();
      if (err) {
        setError(err);
        setChallenges([]);
      } else {
        setChallenges(data);
        setError('');
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // fallback icon for demo
  const fallbackIcons = [code, camera, computer];

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
        {loading ? (
          <div className="text-lg text-gray-500 py-12">Loading challenges...</div>
        ) : error ? (
          <div className="text-red-500 py-12">{error}</div>
        ) : (
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {challenges.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">No challenges found.</div>
            ) : (
              challenges.map((challenge, idx) => (
                <div
                  key={challenge.id || idx}
                  className="bg-white rounded-3xl shadow-xl flex flex-col items-center p-10 hover:shadow-2xl transition-shadow duration-300"
                >
                  <img
                    src={fallbackIcons[idx % fallbackIcons.length]}
                    alt={challenge.title + ' icon'}
                    className="h-40 w-40 object-contain mb-6"
                  />
                  <div className="font-bold text-2xl text-gray-800 text-center">
                    {challenge.title}
                  </div>
                  <div className="text-gray-600 text-center mt-2 text-base line-clamp-3" dangerouslySetInnerHTML={{ __html: challenge.description }} />
                  <div className="mt-4 text-sm text-gray-500">
                    {challenge.start_date} - {challenge.end_date}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveChallenges;
