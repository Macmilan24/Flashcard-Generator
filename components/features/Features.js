import { Box, Container, Typography } from "@mui/material";

export default function Features() {
  return (
    <Container maxWidth="lg" className="my-16">
      <Typography
        variant="h4"
        align="center"
        className="font-bold text-2xl md:text-4xl mb-8"
      >
        Why is it so <span className="text-blue-500">great?</span>
      </Typography>
      <Box className="flex flex-wrap justify-between items-center">
        {/* Feature 1 */}
        <Box className="text-center p-6 mb-6 transition-transform transform hover:-translate-y-2 hover:shadow-lg hover:bg-gray-50 rounded-md">
          <Box className="flex justify-center mb-4">
            <span className="bg-blue-100 p-3 rounded-full">
              {/* You can replace this with an icon */}
              🖋️
            </span>
          </Box>
          <Typography variant="h6" className="font-semibold mb-2">
            Easy Text Input
          </Typography>
          <Typography className="text-gray-600">
            Simply input the text and let our software handle the rest.
          </Typography>
        </Box>

        {/* Feature 2 */}
        <Box className="text-center p-6 mb-6 transition-transform transform hover:-translate-y-2 hover:shadow-lg hover:bg-gray-50 rounded-md">
          <Box className="flex justify-center mb-4">
            <span className="bg-blue-100 p-3 rounded-full">
              {/* You can replace this with an icon */}
              🤖
            </span>
          </Box>
          <Typography variant="h6" className="font-semibold mb-2">
            Advanced AI
          </Typography>
          <Typography className="text-gray-600">
            Generate flashcards with cutting-edge AI technology.
          </Typography>
        </Box>

        {/* Feature 3 */}
        <Box className="text-center p-6 mb-6 transition-transform transform hover:-translate-y-2 hover:shadow-lg hover:bg-gray-50 rounded-md">
          <Box className="flex justify-center mb-4">
            <span className="bg-blue-100 p-3 rounded-full">
              {/* You can replace this with an icon */}
              🎨
            </span>
          </Box>
          <Typography variant="h6" className="font-semibold mb-2">
            Customizable
          </Typography>
          <Typography className="text-gray-600">
            Fully customize your flashcards to suit your needs.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
