export interface Trick {
  id: string;
  name: string;
  description: string;
  twilioProduct: string;
  techExplanation: string;
  image: string;
}

export interface Video {
  id: string;
  title: string;
  embedUrl: string;
  thumbnail: string;
  description: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  event: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export const siteConfig = {
  name: "The Twilio Magician",
  tagline: "Where Technology Meets Magic",
  airtableFormUrl: "https://airtable.com/appnNQSAZVcnyFYko/pagMU6e0bYNlpYS6H",
  email: "adellavecchia@twilio.com",
};

export const aboutContent = {
  headline: "Meet the Magician",
  paragraphs: [
    "Anthony Dellavecchia is a Developer Evangelist at Twilio, where he helps developers learn, build, and get inspired. He's also the Twilio Magician — a persona born somewhere along the way, as he started doing magic with Twilio. Real magic.",
    "What started as a creative way to teach Twilio quickly became something bigger. Full-on magic shows powered by real APIs — where cards appear on phones, voices reveal chosen numbers, and messages arrive at the exact moment of the reveal. Every trick surprises, teaches, and sticks with audiences long after the show ends.",
    "Anthony brings this unique blend of code and wonder to developer conferences, corporate events, trade shows, and private events worldwide.",
  ],
  image: "/images/magician-portrait.jpeg",
};

export const conceptContent = {
  headline: "What is the Twilio Magician?",
  description:
    "A one-of-a-kind performance that merges magic with live tech demos powered by Twilio and AI.",
  features: [
    {
      title: "Real Magic",
      description:
        "Card tricks, mind reading, and impossible predictions — performed live with nothing but a phone.",
      icon: "wand",
    },
    {
      title: "Real Technology",
      description:
        "Every trick is powered by Twilio APIs and AI — SMS, Voice, Video, and more. The audience's own phones become part of the show.",
      icon: "code",
    },
    {
      title: "Real Impact",
      description:
        "It's a tech demo disguised as a magic show. Audiences walk away talking about both the tricks and the tech behind them.",
      icon: "sparkles",
    },
  ],
};

export const tricks: Trick[] = [
  {
    id: "mind-reader",
    name: "The Mind Reader",
    description:
      "An audience member thinks of a card. Without a word spoken, a text message arrives on their phone revealing their exact choice.",
    twilioProduct: "Twilio SMS",
    techExplanation:
      "Using Twilio's Programmable Messaging API, the reveal is sent as an SMS at the perfect dramatic moment.",
    image: "/images/tricks/mind-reader.jpg",
  },
  {
    id: "voice-from-beyond",
    name: "The Voice from Beyond",
    description:
      "A sealed prediction is placed on stage. Then a mysterious phone call plays a recorded voice that matches the prediction perfectly.",
    twilioProduct: "Twilio Voice",
    techExplanation:
      "Twilio's Programmable Voice API triggers a call with dynamically generated TwiML to deliver the reveal.",
    image: "/images/tricks/voice-beyond.jpg",
  },
  {
    id: "digital-vanish",
    name: "The Digital Vanish",
    description:
      "A chosen card vanishes from the deck and reappears — digitally — on the audience member's phone screen via a video call.",
    twilioProduct: "Twilio Video",
    techExplanation:
      "Twilio's Video API creates a real-time video room where the vanished card makes its dramatic digital reappearance.",
    image: "/images/tricks/digital-vanish.jpg",
  },
  {
    id: "impossible-prediction",
    name: "The Impossible Prediction",
    description:
      "Before the show, audience members text a number. Their collective choices are analyzed and a seemingly impossible prediction is revealed.",
    twilioProduct: "Twilio Functions",
    techExplanation:
      "Twilio Functions processes incoming SMS in real-time, aggregating audience responses to drive the prediction logic.",
    image: "/images/tricks/impossible-prediction.jpg",
  },
  {
    id: "teleportation",
    name: "The Teleportation",
    description:
      "A signed card disappears and is found inside a sealed envelope — confirmed by a WhatsApp message with photographic proof.",
    twilioProduct: "Twilio WhatsApp",
    techExplanation:
      "The WhatsApp Business API sends a media message with the photo at the climactic moment of the reveal.",
    image: "/images/tricks/teleportation.jpg",
  },
  {
    id: "crowd-oracle",
    name: "The Crowd Oracle",
    description:
      "The entire audience votes via text. The collective decision drives the outcome of the trick in real-time.",
    twilioProduct: "Twilio Sync",
    techExplanation:
      "Twilio Sync aggregates audience votes in real-time, with results displayed live on screen as votes pour in.",
    image: "/images/tricks/crowd-oracle.jpg",
  },
];

export const videos: Video[] = [
  {
    id: "v1",
    title: "Twilio Magic at CascadiaJS",
    embedUrl: "https://www.youtube.com/embed/jiQo0nQGXP0",
    thumbnail: "",
    description: "A full Twilio-powered magic performance live on stage at CascadiaJS.",
  },
  {
    id: "v2",
    title: "SF HQ Office with Omar and Chris",
    embedUrl: "https://drive.google.com/file/d/1N48sWCVggEfWE37yWwveBB7GWwjZ8uoz/preview",
    thumbnail: "",
    description: "Close-up magic at the Twilio SF headquarters with special guests.",
  },
  {
    id: "v3",
    title: "Street Magic in SF",
    embedUrl: "https://drive.google.com/file/d/1CASbjUnRpvSD2V9t3DXkN0w20kRazHLV/preview",
    thumbnail: "",
    description: "Taking Twilio-powered tricks to the streets of San Francisco.",
  },
  {
    id: "v4",
    title: "Street Magic at Food Truck",
    embedUrl: "https://drive.google.com/file/d/1WlWrVFvDud8W8bmoP9HpIIYyQ2_v2bFm/preview",
    thumbnail: "",
    description: "Surprising unsuspecting foodies with some impromptu magic.",
  },
  {
    id: "v5",
    title: "Magic at VSLive",
    embedUrl: "https://drive.google.com/file/d/1gYPcP4BajimyBQc5QZcuIPGA1CEYfKH1/preview",
    thumbnail: "",
    description: "Live magic performance at the VSLive developer conference.",
  },
  {
    id: "v6",
    title: "Street Magic with Trak",
    embedUrl: "https://drive.google.com/file/d/1T7k2MYH5aNrGOuz0HjWDuxx8uwHod8g2/preview",
    thumbnail: "",
    description: "An impromptu street magic session with Trak.",
  },
  {
    id: "v7",
    title: "Magic with Tony",
    embedUrl: "https://drive.google.com/file/d/1Xwu_v922eQfH6Ww8_Hrh0eiE_0KDraAd/preview",
    thumbnail: "",
    description: "A close-up magic session featuring some audience favorites.",
  },
  {
    id: "v8",
    title: "SF Office with Hemaleka",
    embedUrl: "https://drive.google.com/file/d/1bR5VmOMLPOkhNvIHKDfrVVGon8neEYtY/preview",
    thumbnail: "",
    description: "Twilio magic tricks at the SF office with Hemaleka.",
  },
];

export const galleryImages: GalleryImage[] = [
  { id: "g1", src: "/images/gallery/gallery-1.jpg", alt: "Live magic performance", event: "" },
  { id: "g2", src: "/images/gallery/gallery-2.jpg", alt: "Twilio-powered card trick", event: "" },
  { id: "g3", src: "/images/gallery/gallery-3.jpg", alt: "Audience participation moment", event: "" },
  { id: "g4", src: "/images/gallery/gallery-4.jpg", alt: "On stage with dramatic lighting", event: "" },
  { id: "g5", src: "/images/gallery/gallery-5.jpg", alt: "Close-up magic", event: "" },
];

export const whyItWorks = {
  headline: "Why It Works",
  description:
    "It's not just a magic show — it's a live demo of Twilio products.",
  reasons: [
    {
      title: "Engagement",
      description:
        "Audiences don't passively watch. Their phones ring, messages arrive, and they become part of the performance.",
    },
    {
      title: "Memorability",
      description:
        "People forget presentations. They never forget the moment a magician made their phone do the impossible.",
    },
    {
      title: "Education",
      description:
        "Each trick subtly demonstrates a Twilio product in action. Audiences learn what the platform can do by experiencing it firsthand.",
    },
    {
      title: "Connection",
      description:
        "Magic breaks down walls. In seconds, an entire room goes from strangers to a shared experience — laughing, gasping, and talking to each other.",
    },
  ],
};

export const socialLinks: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com/anthonyjdella", icon: "github" },
];
