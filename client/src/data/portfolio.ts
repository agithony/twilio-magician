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
  image: "/images/magician-portrait.png",
};

export const conceptContent = {
  headline: "What is the Twilio Magician?",
  description:
    "A one-of-a-kind performance that merges classic stage magic with live tech demos powered by Twilio and AI.",
  features: [
    {
      title: "Real Magic",
      description:
        "Classic sleight of hand and stage illusions that captivate any audience, from intimate groups to packed conference halls.",
      icon: "wand",
    },
    {
      title: "Real Technology",
      description:
        "Every trick is powered by Twilio APIs — SMS, Voice, Video, and more. The audience's own devices become part of the show.",
      icon: "code",
    },
    {
      title: "Real Impact",
      description:
        "Audiences don't just watch — they participate. They leave inspired by the possibilities of what technology can do.",
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
    id: "demo-reel",
    title: "The Twilio Magician — Demo Reel",
    embedUrl: "https://www.youtube.com/embed/placeholder1",
    thumbnail: "/images/videos/demo-reel-thumb.jpg",
    description: "A highlight reel showcasing the best moments from live performances.",
  },
  {
    id: "conference-show",
    title: "Live at SIGNAL Conference",
    embedUrl: "https://www.youtube.com/embed/placeholder2",
    thumbnail: "/images/videos/conference-thumb.jpg",
    description: "Full performance from the Twilio SIGNAL developer conference.",
  },
  {
    id: "behind-scenes",
    title: "Behind the Magic",
    embedUrl: "https://www.youtube.com/embed/placeholder3",
    thumbnail: "/images/videos/behind-scenes-thumb.jpg",
    description: "A behind-the-scenes look at how the tricks are built with Twilio.",
  },
];

export const galleryImages: GalleryImage[] = [
  { id: "g1", src: "/images/gallery/event-1.jpg", alt: "Live performance at corporate event", event: "Corporate Gala 2024" },
  { id: "g2", src: "/images/gallery/event-2.jpg", alt: "Stage magic with audience participation", event: "SIGNAL Conference" },
  { id: "g3", src: "/images/gallery/event-3.jpg", alt: "Close-up magic with playing cards", event: "Private Event" },
  { id: "g4", src: "/images/gallery/event-4.jpg", alt: "Audience reaction to phone reveal", event: "Tech Summit 2024" },
  { id: "g5", src: "/images/gallery/event-5.jpg", alt: "On stage with dramatic lighting", event: "Developer Conference" },
  { id: "g6", src: "/images/gallery/event-6.jpg", alt: "Card trick with Twilio integration", event: "Product Launch" },
];

export const whyItWorks = {
  headline: "Why It Works",
  description:
    "The Twilio Magician isn't just a magic show — it's a live demonstration of technology's potential wrapped in wonder.",
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
      title: "Versatility",
      description:
        "From 20-person boardrooms to 2,000-seat conference halls, the show scales to any audience and any event.",
    },
  ],
};

export const socialLinks: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com/anthonyjdella", icon: "github" },
];
