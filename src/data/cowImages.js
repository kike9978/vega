export const cowImages = [
  'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=400&h=300',
  'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=400&h=300',
  'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=400&h=300',
  'https://images.unsplash.com/photo-1599827552599-eadf5fb3c75f?auto=format&fit=crop&w=400&h=300',
  'https://images.unsplash.com/photo-1583953596962-3d5cb4b0f098?auto=format&fit=crop&w=400&h=300',
  'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=400&h=300', // Replaced broken image
  'https://images.unsplash.com/photo-1575875156954-1aff437185c4?auto=format&fit=crop&w=400&h=300',
  'https://images.unsplash.com/photo-1564085352725-08da0272627d?auto=format&fit=crop&w=400&h=300', 
  'https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?auto=format&fit=crop&w=400&h=300',
  'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=400&h=300' // Replaced broken image
];

// Function to get a deterministic image based on cow ID
export const getCowImage = (id) => {
  // Use the first 8 characters of the ID to generate a number
  const hash = id.slice(0, 8).split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  
  // Use modulo to get a consistent index for each ID
  return `${cowImages[hash % cowImages.length]}?auto=format&fit=crop&w=400&h=300`;
}; 