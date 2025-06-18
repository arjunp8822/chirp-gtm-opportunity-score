# Chirp GTM Opportunity Score

A modern, AI-powered deal analysis tool that evaluates sales opportunities using advanced machine learning. Built with Next.js, React, and OpenAI.

## Features

- 🤖 **AI-Powered Analysis**: Uses OpenAI's GPT-4 to analyze deal data
- 📊 **Comprehensive Scoring**: Evaluates 7 key dimensions of deal success
- 📁 **File Upload Support**: Drag & drop or click to upload deal documents
- 🎨 **Modern UI**: Clean, responsive design with smooth animations
- 📱 **Mobile Friendly**: Works seamlessly on all devices
- ⚡ **Fast Performance**: Optimized for speed and user experience

## Scoring Dimensions

The tool analyzes deals across 7 key dimensions:

1. **Technographic Fit** (15% weight) - Technology stack alignment
2. **Psychographic Fit** (10% weight) - Values and attitudes alignment
3. **Problem/Solution Fit** (25% weight) - How well the solution addresses the problem
4. **Relationship Heat** (15% weight) - Strength of relationship
5. **Momentum** (20% weight) - Forward progress in the deal
6. **Risk** (10% weight) - Factors that could derail the deal
7. **Historical Pattern Match** (5% weight) - Comparison to past successful deals

## Tech Stack

- **Framework**: Next.js 15.3.3
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **AI Integration**: OpenAI GPT-4
- **Icons**: React Icons
- **Utilities**: clsx, tailwind-merge

## Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd chirp-gtm-opportunity-score
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Get your OpenAI API key**

   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key
   - Add it to your `.env.local` file

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Input Deal Data**: Paste your deal notes, call transcripts, or email threads into the text area
2. **Upload Files**: Alternatively, drag and drop or click to upload text files
3. **Analyze**: Click "Calculate Opportunity Score" to start the AI analysis
4. **Review Results**: View your comprehensive deal assessment with detailed scores
5. **Get Recommendations**: Request personalized action items and strategies

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles
│   ├── layout.js       # Root layout
│   └── page.js         # Main page component
├── components/         # Reusable React components
│   ├── Button.jsx     # Button component with variants
│   ├── FileUpload.jsx # File upload with drag & drop
│   ├── InputScreen.jsx # Main input interface
│   ├── LoadingScreen.jsx # Loading state
│   ├── ResultsScreen.jsx # Results display
│   ├── ScoreCard.jsx  # Individual score display
│   ├── TextArea.jsx   # Auto-resizing textarea
│   └── EmailCapture.jsx # Email collection form
└── lib/               # Utility functions
    ├── openai.js      # OpenAI API integration
    └── utils.js       # Helper functions
```

## Component Architecture

The application uses a modern component-based architecture:

- **Reusable Components**: Button, TextArea, FileUpload, ScoreCard
- **Screen Components**: InputScreen, LoadingScreen, ResultsScreen, EmailCapture
- **Utility Functions**: OpenAI integration, score calculation, styling helpers
- **State Management**: React hooks for local state management

## Customization

### Colors

Modify the color scheme in `src/app/globals.css`:

```css
:root {
  --secondary-color: #63ca72; /* Primary accent color */
  --brand-color: #1e293b; /* Text color */
  --site-background: #f8fafc; /* Background color */
}
```

### Scoring Weights

Adjust the scoring weights in `src/lib/utils.js`:

```javascript
const weights = {
  technographicFit: 0.15,
  psychographicFit: 0.1,
  problemSolutionFit: 0.25,
  // ... adjust as needed
};
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue on GitHub or contact the development team.
