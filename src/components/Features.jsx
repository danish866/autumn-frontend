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
const Features = () => {
  return (
    <div className="bg-white-500">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-bold">
          Incentives
        </h3>
        <div className="mt-6 gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {
            features.map((feature, index) => (
              <div className="py-4" key={index} >
                
                <div>
                  <img className="h-20 w-20" src={feature.image}/>
                </div>
                <div className="mt-4 font-medium text-base">
                  {feature.title}
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {feature.description}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Features;