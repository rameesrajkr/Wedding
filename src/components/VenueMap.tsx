import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, QrCode, Copy, Check, Navigation } from "lucide-react";
import { useLanguage } from "../LanguageContext";

export default function VenueMap() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  const address = "Peringottukara Somasekara Temple, Somasekara Temple Road, Peringottukara, Thrissur, Kerala 680565";
  const mapsUrl = "https://maps.app.goo.gl/1rasDFWUwdYAsDRCA";
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(mapsUrl)}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
      {/* Centered Heading */}
      <div className="text-center mb-12">
        <h3 className="font-serif text-3xl sm:text-4xl font-light tracking-wide text-[#521659] mb-4">
          {t("venueTitle")}
        </h3>
        <div className="w-16 h-[1.5px] bg-amber-500 mx-auto mb-4" />
        <p className="font-sans text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
          {t("venueSubtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        {/* Left Column: Venue Details Card */}
        <motion.div 
          className="lg:col-span-5 flex flex-col"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="p-6 sm:p-8 bg-white rounded-3xl border border-purple-100 shadow-[0_15px_35px_rgba(82,22,89,0.04)] hover:shadow-[0_20px_45px_rgba(82,22,89,0.08)] transition-all duration-300 flex-1 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-50 rounded-full border border-purple-100/60 text-[#521659]">
                <MapPin className="w-4 h-4 flex-shrink-0 text-purple-600" />
                <span className="font-sans font-bold tracking-wider text-[10px] uppercase">{t("venueTempleName")}</span>
              </div>
              
              <h4 className="font-serif text-2xl sm:text-3xl font-light text-stone-900 leading-tight">
                {t("venueTempleName")}
              </h4>
              
              <p className="font-sans text-sm text-stone-600 leading-relaxed">
                {t("venueDescription")}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-purple-50">
              <div className="flex items-center space-x-2 bg-stone-50 p-3.5 rounded-xl border border-stone-200/60 shadow-inner">
                <span className="font-sans text-xs text-stone-600 truncate flex-1">{address}</span>
                <button
                  id="copy-address-btn"
                  onClick={handleCopyAddress}
                  className="p-2 hover:bg-purple-50 rounded-lg transition-colors text-stone-500 hover:text-purple-700 cursor-pointer"
                  title={t("copyAddress")}
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <motion.a
                  id="get-directions-btn"
                  href={mapsUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-800 hover:bg-purple-900 text-white rounded-xl text-xs font-semibold tracking-wider transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                  whileTap={{ scale: 0.98 }}
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{t("getDirections")}</span>
                </motion.a>

                <motion.button
                  id="view-qr-btn"
                  onClick={() => setShowQRModal(true)}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-white border border-purple-300 hover:border-purple-400 hover:bg-purple-50 text-purple-700 rounded-xl text-xs font-semibold tracking-wider transition-all shadow-sm hover:-translate-y-0.5 cursor-pointer"
                  whileTap={{ scale: 0.98 }}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>{t("scanMapQr")}</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Google Maps Interactive Embed Card */}
        <motion.div 
          className="lg:col-span-7 flex flex-col"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="p-3 bg-white rounded-3xl border border-purple-100 shadow-[0_15px_35px_rgba(82,22,89,0.04)] hover:shadow-[0_20px_45px_rgba(82,22,89,0.08)] transition-all duration-300 h-[320px] sm:h-[420px] lg:h-full min-h-[320px] relative overflow-hidden flex flex-col">
            <div className="flex-1 rounded-2xl overflow-hidden relative border border-stone-100">
              <iframe
                title="Venue Location Map"
                src="https://maps.google.com/maps?q=Peringottukara%20Somasekara%20Temple&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>

      {/* QR Code Scan Modal */}
      <AnimatePresence>
        {showQRModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-purple-200/80 shadow-2xl relative"
            >
              <div className="text-center">
                <h4 className="font-serif text-xl font-medium text-purple-900 mb-2">{t("scanMapQrTitle")}</h4>
                <p className="font-sans text-xs text-stone-500 mb-6 leading-relaxed">
                  {t("scanMapQrSubtitle")}
                </p>
                
                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 max-w-[220px] mx-auto mb-6 shadow-inner relative flex items-center justify-center">
                  <img
                    src={qrCodeUrl}
                    alt="Venue Location Map QR Code"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-w-[180px] rounded-lg border-2 border-white shadow-md"
                  />
                </div>

                <div className="space-y-3">
                  <button
                    id="close-qr-modal-btn"
                    onClick={() => setShowQRModal(false)}
                    className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                  >
                    {t("closePreview")}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
