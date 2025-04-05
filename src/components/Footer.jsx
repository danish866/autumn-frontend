import instagram from '../assets/instagram.svg'
import facebook from '../assets/facebook.svg'
import twitter from '../assets/twitter.svg'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-50 to-blue-100 border-t border-blue-100 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4 mb-2 md:mb-0">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img className="w-7 h-7 hover:scale-110 transition-transform" src={instagram} alt="Instagram" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img className="w-7 h-7 hover:scale-110 transition-transform" src={facebook} alt="Facebook" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <img className="w-7 h-7 hover:scale-110 transition-transform" src={twitter} alt="Twitter" />
            </a>
          </div>
          <div className="font-medium text-sm text-gray-500 text-center">
            © 2025 Autumn Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer