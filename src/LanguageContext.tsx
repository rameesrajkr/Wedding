import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ml";

export interface Translations {
  togetherWithFamilies: string;
  weddingDate: string;
  weddingDayTime: string;
  countdownTitle: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  countdownSubtitle: string;
  celebrationBegun: string;
  venueTitle: string;
  venueSubtitle: string;
  venueTempleName: string;
  venueDescription: string;
  getDirections: string;
  scanMapQr: string;
  scanMapQrTitle: string;
  scanMapQrSubtitle: string;
  closePreview: string;
  copyAddress: string;
  guestbookTitle: string;
  guestbookSubtitle: string;
  leaveWishes: string;
  yourName: string;
  yourNamePlaceholder: string;
  relationToCouple: string;
  yourWellWishes: string;
  messagePlaceholder: string;
  postWishes: string;
  postingWish: string;
  filterLabel: string;
  filterAll: string;
  relWellWisher: string;
  relFamily: string;
  relFriendBride: string;
  relFriendGroom: string;
  relColleague: string;
  noWishes: string;
  beFirstWish: string;
  formError: string;
  withAllOurLove: string;
  excitedCelebrate: string;
  footerContact: string;
  footerCopyright: string;
  musicPlayingTitle: string;
  musicPausedTitle: string;
  brideTitle: string;
  groomTitle: string;
  brideName: string;
  groomName: string;
  brideParents: string;
  groomParents: string;
  brideParentsNames: string;
  groomParentsNames: string;
  weddingDetailsTitle: string;
  weddingDetailsSubtitle: string;
  thalikettuLocationTitle: string;
  thalikettuLocation: string;
  muhurthamTitle: string;
  muhurthamTime: string;
  receptionTitle: string;
  receptionDetail: string;
  weddingDateTitle: string;
  galleryTitle: string;
  gallerySubtitle: string;
  contactTitle: string;
  contactSubtitle: string;
  familyContact: string;
  contactNumber: string;
  callUs: string;
  whatsappUs: string;
  backToTop: string;
  navDetails: string;
  navVenue: string;
  navCountdown: string;
  navGallery: string;
  navWishes: string;
  navContact: string;
}

const mlTranslations: Translations = {
  togetherWithFamilies: "ഞങ്ങളുടെ വിവാഹാഘോഷത്തിലേക്ക് സ്നേഹപൂർവ്വം സ്വാഗതം",
  weddingDate: "2026 ആഗസ്റ്റ് 30",
  weddingDayTime: "ഞായറാഴ്ച രാവിലെ 10:00 മണിക്ക്",
  countdownTitle: "ഞങ്ങളുടെ ശുഭദിനത്തിലേക്കുള്ള കൗണ്ട്ഡൗൺ",
  days: "ദിവസങ്ങൾ",
  hours: "മണിക്കൂറുകൾ",
  minutes: "മിനിറ്റുകൾ",
  seconds: "സെക്കൻഡുകൾ",
  countdownSubtitle: "ഞങ്ങളുടെ വിവാഹത്തിൽ പങ്കെടുക്കാൻ 2026 ആഗസ്റ്റ് 30-ന് ഞങ്ങളോടൊപ്പം ചേരുക. നിങ്ങളുടെ സാന്നിധ്യവും ആശംസകളും ഞങ്ങളുടെ ഈ ദിവസത്തെ സവിശേഷവും ഓർമ്മിക്കപ്പെടുന്നതുമാക്കും.",
  celebrationBegun: "✨ ആഘോഷങ്ങൾ ആരംഭിച്ചിരിക്കുന്നു! ✨",
  venueTitle: "വിവാഹ വേദി",
  venueSubtitle: "നിങ്ങളെ അവിടെ കാണാൻ ഞങ്ങൾ കാത്തിരിക്കുന്നു! സുഗമമായി എത്തിച്ചേരാൻ സഹായിക്കുന്ന വിവരങ്ങൾ താഴെ നൽകുന്നു.",
  venueTempleName: "ശ്രീ നാരായണ ഹാൾ, പെരിങ്ങോട്ടുകര",
  venueDescription: "കേരളത്തിലെ തൃശൂർ പെരിങ്ങോട്ടുകര സോമശേഖര ക്ഷേത്രം റോഡിൽ സ്ഥിതി ചെയ്യുന്ന പ്രൗഢഗംഭീരമായ വിവാഹ മണ്ഡപം. സമാധാനപരമായ അന്തരീക്ഷവും മികച്ച സൗകര്യങ്ങളും നിറഞ്ഞ വേദി.",
  getDirections: "വഴി അറിയുക",
  scanMapQr: "QR സ്കാൻ ചെയ്യുക",
  scanMapQrTitle: "വേദി മാപ്പ് സ്കാൻ ചെയ്യുക",
  scanMapQrSubtitle: "ഗൂഗിൾ മാപ്സ് നാവിഗേഷൻ ലഭിക്കാൻ നിങ്ങളുടെ മൊബൈൽ ക്യാമറ ഉപയോഗിച്ച് ഈ QR കോഡ് സ്കാൻ ചെയ്യുക.",
  closePreview: "ക്ലോസ് ചെയ്യുക",
  copyAddress: "വിലാസം കോപ്പി ചെയ്യുക",
  guestbookTitle: "ആശംസകളും ഗസ്റ്റ്ബുക്കും",
  guestbookSubtitle: "ഞങ്ങൾക്കായി അഭിനന്ദനങ്ങളോ ഉപദേശങ്ങളോ സ്നേഹപൂർണ്ണമായ ചിന്തകളോ പങ്കുവെക്കുക. അവ വായിക്കാൻ ഞങ്ങൾ ഏറെ ആഗ്രഹിക്കുന്നു!",
  leaveWishes: "നിങ്ങളുടെ ആശംസകൾ അറിയിക്കൂ",
  yourName: "നിങ്ങളുടെ പേര്",
  yourNamePlaceholder: "നിങ്ങളുടെ പേര് ഇവിടെ എഴുതുക...",
  relationToCouple: "ബന്ധം",
  yourWellWishes: "നിങ്ങളുടെ ആശംസകൾ",
  messagePlaceholder: "ഒരു മധുരമുള്ള സന്ദേശമോ ഉപദേശമോ അനുഗ്രഹമോ ഇവിടെ എഴുതുക...",
  postWishes: "ആശംസകൾ സമർപ്പിക്കുക",
  postingWish: "സമർപ്പിക്കുന്നു...",
  filterLabel: "ഫിൽട്ടർ ചെയ്യുക:",
  filterAll: "എല്ലാം",
  relWellWisher: "ശുഭകാംക്ഷി",
  relFamily: "കുടുംബാംഗം",
  relFriendBride: "വധുവിന്റെ സുഹൃത്ത്",
  relFriendGroom: "വരന്റെ സുഹൃത്ത്",
  relColleague: "സഹപ്രവർത്തകൻ",
  noWishes: "ഈ വിഭാഗത്തിൽ ഇതുവരെ ആശംസകളൊന്നും രേഖപ്പെടുത്തിയിട്ടില്ല.",
  beFirstWish: "ആദ്യമായി നിങ്ങളുടെ അനുഗ്രഹം പങ്കുവെക്കൂ!",
  formError: "ദയവായി നിങ്ങളുടെ പേരും ആശംസകളും പൂർണ്ണമായി രേഖപ്പെടുത്തുക.",
  withAllOurLove: "സ്നേഹത്തോടെ",
  excitedCelebrate: "നിങ്ങളോടൊപ്പം ഈ സന്തോഷം പങ്കിടുവാൻ ഞങ്ങൾ കാത്തിരിക്കുന്നു",
  footerContact: "എന്തെങ്കിലും സംശയങ്ങളുണ്ടെങ്കിൽ celebrate@rasikaandamal.com എന്ന വിലാസത്തിൽ ബന്ധപ്പെടുക. കേരളത്തിൽ കാണാം!",
  footerCopyright: "© 2026 രസിക & അമൽ വിവാഹം • സ്നേഹത്തോടെയും ആദരവോടെയും തയ്യാറാക്കിയത്",
  musicPlayingTitle: "പാട്ട് നിർത്തുക",
  musicPausedTitle: "പാട്ട് കേൾക്കുക",
  brideTitle: "വധു",
  groomTitle: "വരൻ",
  brideName: "രസിക രാജ്",
  groomName: "അമൽരാജ്",
  brideParents: "രാജന്റെയും സിന്ധുവിന്റെയും മകൾ",
  groomParents: "രാഘവന്റെയും ലീലയുടെയും മകൻ",
  brideParentsNames: "രാജൻ & സിന്ധു",
  groomParentsNames: "രാഘവൻ & ലീല",
  weddingDetailsTitle: "വിവാഹ വിശേഷങ്ങൾ",
  weddingDetailsSubtitle: "ഞങ്ങളുടെ സന്തോഷത്തിൽ പങ്കുചേരാൻ നിങ്ങളെല്ലാവരെയും സ്നേഹപൂർവ്വം ക്ഷണിക്കുന്നു.",
  thalikettuLocationTitle: "താലികെട്ട് സ്ഥലം",
  thalikettuLocation: "തൃപ്രയാർ ക്ഷേത്രം",
  muhurthamTitle: "മുഹൂർത്തം",
  muhurthamTime: "രാവിലെ 10:00 മണിക്ക് - 11:00 മണിക്ക് ഇടയിൽ",
  receptionTitle: "വിരുന്ന് / സദ്യ",
  receptionDetail: "വിവാഹ ചടങ്ങുകൾക്ക് ശേഷം പരമ്പരാഗത രീതിയിലുള്ള വിവാഹ സദ്യ ഉണ്ടായിരിക്കുന്നതാണ്.",
  weddingDateTitle: "വിവാഹ തീയതി",
  galleryTitle: "നിമിഷങ്ങൾ (ഫോട്ടോ ഗാലറി)",
  gallerySubtitle: "ഞങ്ങളുടെ പ്രിയപ്പെട്ട ചില സുന്ദരമായ ചിത്രങ്ങൾ താഴെ നൽകുന്നു.",
  contactTitle: "ബന്ധപ്പെടുക",
  contactSubtitle: "കൂടുതൽ വിവരങ്ങൾക്കോ സഹായങ്ങൾക്കോ ദയവായി ഞങ്ങളുടെ കുടുംബാംഗങ്ങളെ താഴെ നൽകിയിട്ടുള്ള നമ്പറുകളിൽ ബന്ധപ്പെടാവുന്നതാണ്.",
  familyContact: "കുടുംബ ബന്ധങ്ങൾ",
  contactNumber: "ബന്ധപ്പെടാനുള്ള നമ്പർ",
  callUs: "വിളിക്കുക",
  whatsappUs: "വാട്സാപ്പ്",
  backToTop: "മുകളിലേക്ക്",
  navDetails: "വിവരങ്ങൾ",
  navVenue: "വേദി",
  navCountdown: "കൗണ്ട്ഡൗൺ",
  navGallery: "ചിത്രങ്ങൾ",
  navWishes: "ആശംസകൾ",
  navContact: "ബന്ധപ്പെടുക"
};

const enTranslations: Translations = {
  togetherWithFamilies: "TOGETHER, WE CELEBRATE OUR WEDDING",
  weddingDate: "August 30, 2026",
  weddingDayTime: "Sunday at 10:00 AM",
  countdownTitle: "Countdown to our Big Day",
  days: "Days",
  hours: "Hours",
  minutes: "Minutes",
  seconds: "Seconds",
  countdownSubtitle: "Join us on August 30, 2026, to celebrate our union. Your presence and wishes will make our day truly special and memorable.",
  celebrationBegun: "✨ The Celebration Has Begun! ✨",
  venueTitle: "The Celebration Venue",
  venueSubtitle: "We can't wait to see you there! Here are the details to help you find your way smoothly.",
  venueTempleName: "Sree Narayana Hall, Peringottukara",
  venueDescription: "Located along Somasekara Temple Road in Peringottukara, Thrissur, Kerala. A spacious, elegant hall providing a pleasant atmosphere for the wedding celebration.",
  getDirections: "GET DIRECTIONS",
  scanMapQr: "SCAN MAP QR",
  scanMapQrTitle: "Scan Venue Map",
  scanMapQrSubtitle: "Scan this QR code with your mobile camera to open Google Maps navigation instantly.",
  closePreview: "CLOSE PREVIEW",
  copyAddress: "Copy address",
  guestbookTitle: "Wishes & Guestbook",
  guestbookSubtitle: "Leave a message of congratulations, advice, or a warm thought for us. We would love to read them!",
  leaveWishes: "Leave Your Wishes",
  yourName: "Your Name",
  yourNamePlaceholder: "Your beautiful name...",
  relationToCouple: "Relation to Couple",
  yourWellWishes: "Your Well Wishes",
  messagePlaceholder: "Write a sweet message, word of advice, or blessing here...",
  postWishes: "POST WELL WISHES",
  postingWish: "POSTING WISH...",
  filterLabel: "Filter:",
  filterAll: "All",
  relWellWisher: "Well-wisher",
  relFamily: "Family",
  relFriendBride: "Friend of Bride",
  relFriendGroom: "Friend of Groom",
  relColleague: "Colleague",
  noWishes: "No wishes posted yet in this category.",
  beFirstWish: "Be the first to share your blessing!",
  formError: "Please fill in both your name and well wishes.",
  withAllOurLove: "With All Our Love",
  excitedCelebrate: "WE ARE EXCITED TO CELEBRATE WITH YOU",
  footerContact: "Please reach out to us at celebrate@rasikaandamal.com if you have any questions. Come share the joy of our forever with us!",
  footerCopyright: "© 2026 RASIKA & AMAL WEDDING • CRAFTED WITH ELEGANCE & LOVE",
  musicPlayingTitle: "Pause music",
  musicPausedTitle: "Play music",
  brideTitle: "The Bride",
  groomTitle: "The Groom",
  brideName: "Rasika Raj",
  groomName: "Amalraj",
  brideParents: "Daughter of Rajan & Sindhu",
  groomParents: "Son of Raghavan & Leela",
  brideParentsNames: "Rajan & Sindhu",
  groomParentsNames: "Raghavan & Leela",
  weddingDetailsTitle: "Wedding Details",
  weddingDetailsSubtitle: "We are blessed to start our journey and warmly invite you to be part of our celebration.",
  thalikettuLocationTitle: "Thalikettu Location",
  thalikettuLocation: "Thriprayar Temple",
  muhurthamTitle: "Muhurtham",
  muhurthamTime: "10:00 AM – 11:00 AM",
  receptionTitle: "Reception / Sadya",
  receptionDetail: "A traditional Kerala feast (Sadhya) will be served immediately following the wedding ceremony.",
  weddingDateTitle: "Wedding Date",
  galleryTitle: "Our Precious Moments",
  gallerySubtitle: "A glimpse of our journey captured in timeless pictures.",
  contactTitle: "Family Contact",
  contactSubtitle: "For any assistance or queries, please feel free to reach out to our families.",
  familyContact: "Family Contact",
  contactNumber: "Contact Number",
  callUs: "Call Us",
  whatsappUs: "WhatsApp",
  backToTop: "Back to Top",
  navDetails: "Details",
  navVenue: "Venue",
  navCountdown: "Countdown",
  navGallery: "Gallery",
  navWishes: "Wishes",
  navContact: "Contact"
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("wedding_lang");
    return (saved === "ml" ? "ml" : "en") as Language;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("wedding_lang", lang);
  };

  const t = (key: keyof Translations): string => {
    const currentTranslations = language === "ml" ? mlTranslations : enTranslations;
    return currentTranslations[key] || enTranslations[key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
