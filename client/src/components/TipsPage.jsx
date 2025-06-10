import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  FaLightbulb,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";
import { Loader2 } from "lucide-react";

const TipsPage = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}tips`);
        const tipList = Array.isArray(res.data)
          ? res.data
          : res.data.tips || [];
        setTips(tipList);
      } catch (err) {
        console.error("Failed to load tips:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTips();
  }, []);

  const getTipTypeDetails = (tip) => {
    switch (tip.type) {
      case "action":
        return {
          icon: <FaCheckCircle className="text-green-500" />,
          borderColor: "border-green-300",
        };
      case "warning":
        return {
          icon: <FaExclamationTriangle className="text-orange-500" />,
          borderColor: "border-orange-300",
        };
      default:
        return {
          icon: <FaLightbulb className="text-blue-500" />,
          borderColor: "border-blue-300",
        };
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto p-6 w-full">
        <h2 className="text-4xl font-extrabold text-[#003366] mb-10 text-center select-none">
          Financial Tips
        </h2>

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader2 className="animate-spin text-[#003366] w-8 h-8" />
          </div>
        ) : tips.length === 0 ? (
          <p className="text-center text-[#7E909A] italic">
            No tips available.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2">
            {tips.map((tip, index) => {
              const { icon, borderColor } = getTipTypeDetails(tip);
              return (
                <div
                  key={index}
                  className={`flex flex-col p-6 bg-white rounded-lg border ${borderColor} shadow-md hover:shadow-lg transition cursor-pointer`}
                  title={tip.tip}
                >
                  <div className="flex items-center mb-4 space-x-3">
                    <div className="text-3xl">{icon}</div>
                    <h3 className="text-[#003366] font-semibold text-xl leading-snug flex-1">
                      {tip.title || `Tip #${index + 1}`}
                    </h3>
                  </div>

                  <p className="text-[#242C34] flex-grow text-base leading-relaxed">
                    {tip.tip}
                  </p>

                  {tip.link && (
                    <a
                      href={tip.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block self-start font-semibold text-[#007ACC] hover:text-[#66A3FF] underline transition-colors"
                      aria-label={`Learn more about: ${tip.tip}`}
                    >
                      Learn more →
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TipsPage;
