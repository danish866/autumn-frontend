import code from '../assets/code.svg';
import camera from '../assets/camera.svg';
import message from '../assets/message.svg';
import certificate from '../assets/certificate.svg';
import community from '../assets/community.svg';
import computer from '../assets/computer.svg';

const features = [
  {
    title: "Monthly Code Challenges",
    description: "Engage in monthly coding challenges to enhance your skills",
    image: code
  },
  {
    title: "Video Solutions on Youtube",
    description: "Assess your skills by watching solution videos on youtube",
    image: camera
  },
  {
    title: "Personalised Feedback",
    description: "Receive feedback and suggestions from expert developers",
    image: message
  },
  {
    title: "Learn from community",
    description: "Check out submission in various technologies for collaborative learning",
    image: community
  },
  {
    title: "Diverse Programming Tasks",
    description: "Explore a variety of programming tasks to expand your knowledge",
    image: computer
  },
  {
    title: "Certificate of Achievement",
    description: "Receive feedback and suggestions from expert developers",
    image: certificate
  }
  
]

import { useNavigate } from 'react-router-dom';

const Features = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-[calc(100vh-4rem-3.5rem)] flex items-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 w-full">
        <h3 className="text-3xl font-extrabold text-center text-black mb-10 tracking-tight">
          Incentives
        </h3>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            // Add click handler only for the first card (Monthly Code Challenges)
            const isCodeChallenge = feature.title === "Monthly Code Challenges";
            return (
              <div
                className={
                  "bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 flex flex-col items-center text-center" +
                  (isCodeChallenge ? " cursor-pointer hover:ring-2 hover:ring-blue-400" : "")
                }
                key={index}
                onClick={isCodeChallenge ? () => navigate('/active-challenges') : undefined}
                tabIndex={isCodeChallenge ? 0 : undefined}
                role={isCodeChallenge ? "button" : undefined}
                aria-label={isCodeChallenge ? "Go to Active Challenges" : undefined}
              >
                <img
                  className="h-20 w-20 mb-4"
                  src={feature.image}
                  alt={feature.title + ' icon'}
                />
                <div className="font-semibold text-lg text-gray-800 mb-2">
                  {feature.title}
                </div>
                <div className="text-sm text-gray-600">
                  {feature.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Features;