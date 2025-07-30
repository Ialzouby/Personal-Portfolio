import GetInTouch from "@/components/Pages/Contact/GetInTouch";
import Footer from "@/components/Shared/Footer/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <GetInTouch />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
