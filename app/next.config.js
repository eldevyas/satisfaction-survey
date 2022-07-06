/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig





module.exports = {
    async headers() {
      return [
        {
          source: "/_next/data/questions.json",
          headers: [
            { key: "Access-Control-Allow-Origin", value: "http://localhost/SatisfactionSurvey/pages/api/questions.json" },
          ],
        },
      ]
    },
}