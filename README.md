# The Twilio Magician

A magic-themed portfolio website for Anthony Dellavecchia — Developer Evangelist at Twilio. The site showcases a unique blend of stage magic and Twilio-powered technology through an immersive, interactive experience.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS |
| **Animation** | GSAP, Framer Motion |
| **3D** | Three.js, React Three Fiber, Drei |
| **Audio** | Howler.js |
| **Server** | Fastify (static file serving) |
| **Deployment** | Docker, Azure Container Apps, GitHub Actions |

## Project Structure

```
twilio-magician/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── sections/        # Page sections (Hero, About, Tricks, etc.)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── three/           # Three.js scenes (Crystal Ball)
│   │   └── data/            # Portfolio content & config
│   └── public/
│       ├── images/          # Gallery, portrait, logos
│       └── sounds/          # Background music & SFX
├── server/                  # Fastify static file server
├── .github/workflows/       # CI/CD pipeline
├── Dockerfile               # Multi-stage Docker build
├── deploy.sh                # Manual Azure deployment script
└── pnpm-workspace.yaml      # pnpm monorepo config
```

## Prerequisites

- **Node.js** 20+
- **pnpm** (enabled via `corepack enable`)

## Getting Started

```bash
# Clone the repo
git clone git@github.com:anthonyjdella/twilio-magician.git
cd twilio-magician

# Install dependencies
pnpm install

# Start development (client + server concurrently)
pnpm dev
```

The client runs on `http://localhost:5173` and the server on `http://localhost:3001`.

## Building

```bash
# Build both client and server
pnpm build

# Start production server
pnpm start
```

The production server serves the built client on port `8080` (configurable via `PORT` env var).

## Deployment

### Azure Container Apps (CI/CD)

Deployment is automated via GitHub Actions on push to `main`.

**Setup:**

1. Create an Azure service principal:

   ```bash
   az ad sp create-for-rbac \
     --name "github-twilio-magician" \
     --role contributor \
     --scopes /subscriptions/<SUBSCRIPTION_ID> \
     --sdk-auth
   ```

2. Add the JSON output as a GitHub repository secret named `AZURE_CREDENTIALS`:
   - Go to **Settings > Secrets and variables > Actions > New repository secret**

3. Push to `main` — the workflow will automatically:
   - Create the resource group, container registry, and environment (if they don't exist)
   - Build the Docker image via ACR
   - Deploy or update the Container App

**Azure Resources:**

| Resource | Name |
|----------|------|
| Resource Group | `rg-twilio-magician` |
| Container Registry | `twiliomagician` |
| Container Apps Environment | `cae-twilio-magician` |
| Container App | `twilio-magician` |
| Region | `centralus` |

### Manual Deployment

```bash
# Interactive setup (prompts for resource names)
./deploy.sh
```

### Docker (Local)

```bash
docker build -t twilio-magician .
docker run -p 8080:8080 twilio-magician
```

## Key Features

- **Theater Curtain Loading Screen** — interactive curtain opening animation
- **3D Crystal Ball** — Three.js scene with metallic stand, orbital particles, and glass material
- **Flying Cards Canvas** — animated playing cards floating across the hero
- **Magic Wand Cursor** — custom canvas-drawn wand cursor with sparkle effect
- **GSAP Scroll Animations** — fade, slide, and stagger animations on scroll
- **Playing Card Portrait** — About section photo styled as a King of Hearts card
- **Video Gallery** — embedded YouTube and Google Drive videos with auto-thumbnails
- **Background Music** — auto-plays on first click, toggleable via navbar icon
- **Reduced Motion Support** — respects `prefers-reduced-motion` for all animations
- **Mobile Responsive** — particle counts, card counts, and animations adapt to screen size

## Easter Eggs

The site contains 9 hidden easter eggs, tracked in a "Magician's Journal" section with cryptic hints. Progress persists across visits via localStorage.

| # | Hint | Answer |
|---|------|--------|
| 1 | "Speak the word every magician knows..." | Type **abracadabra** on your keyboard |
| 2 | "How many cards in a full deck?" | Type **52** on your keyboard |
| 3 | "Gaze into the crystal long enough..." | Hover over the crystal ball area for **5 seconds** |
| 4 | "The King isn't always who he seems..." | Click the magician portrait card **3 times** |
| 5 | "Three knocks open the hidden door..." | **Triple-click** anywhere on the page |
| 6 | "Two taps summon the stars..." | **Double-click** anywhere on the page |
| 7 | "Even magicians have boundaries..." | **Right-click** anywhere on the page |
| 8 | "Some tricks can't be copied..." | **Highlight or copy** any text on the page |
| 9 | "Patience reveals what haste cannot..." | Stop interacting for **15 seconds** |

## Content Management

All site content is managed in `client/src/data/portfolio.ts`:

- **Tricks** — magic trick descriptions and Twilio product mappings
- **Videos** — YouTube and Google Drive embed URLs
- **Gallery** — image paths and alt text
- **About** — bio paragraphs and stats
- **Config** — site name, email, Airtable booking form URL

## License

All rights reserved.
