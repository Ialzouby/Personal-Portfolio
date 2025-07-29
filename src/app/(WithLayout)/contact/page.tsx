import FadeDown from "@/components/motionEffect/FadeDown";
import GetInTouch from "@/components/Pages/Contact/GetInTouch";
import Footer from "@/components/Shared/Footer/Footer";
import Link from "next/link";
import {
  PiFacebookLogo,
  PiInstagramLogo,
  PiLinkedinLogo,
  PiStackOverflowLogo,
  PiXLogo,
  PiYoutubeLogo,
  PiEnvelope,
  PiPhone,
  PiMapPin,
} from "react-icons/pi";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Contact Info */}
            <FadeDown>
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-6">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Let's Connect</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Get In Touch
                </h1>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Building something interesting? Have feedback or just want to chat? 
                  I'm always open to new ideas and conversations.
                </p>

                {/* Contact Methods */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <PiEnvelope className="text-white text-lg" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-gray-600">ialzouby@charlotte.edu</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <PiMapPin className="text-white text-lg" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-gray-600">Charlotte, NC</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  <Link href="#" className="w-10 h-10 bg-gray-100 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 rounded-lg flex items-center justify-center transition-all duration-300 group">
                    <PiLinkedinLogo className="text-gray-600 group-hover:text-white text-lg" />
                  </Link>
                  <Link href="#" className="w-10 h-10 bg-gray-100 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 rounded-lg flex items-center justify-center transition-all duration-300 group">
                    <PiXLogo className="text-gray-600 group-hover:text-white text-lg" />
                  </Link>
                  <Link href="#" className="w-10 h-10 bg-gray-100 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 rounded-lg flex items-center justify-center transition-all duration-300 group">
                    <PiInstagramLogo className="text-gray-600 group-hover:text-white text-lg" />
                  </Link>
                  <Link href="#" className="w-10 h-10 bg-gray-100 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 rounded-lg flex items-center justify-center transition-all duration-300 group">
                    <PiStackOverflowLogo className="text-gray-600 group-hover:text-white text-lg" />
                  </Link>
                </div>
              </div>
            </FadeDown>

            {/* Right Side - Contact Form */}
            <FadeDown>
              <GetInTouch />
            </FadeDown>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
