import instagram from '../assets/instagram.svg'
import facebook from '../assets/facebook.svg'
import twitter from '../assets/twitter.svg'
const Footer = () => {
  return (
    <div className="bg-white-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between items-center">
          <div className="flex gap-2">
            <img className="w-6 h-6" src={instagram} alt="Instagram" />
            <img className="w-6 h-6" src={facebook} alt="Facebook" />
            <img className="w-6 h-6" src={twitter} alt="Twitter" />
          </div>
          <div className="mt-4 font-medium text-sm text-gray-500 gap-2">
          © 2025 Autumn Inc. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer