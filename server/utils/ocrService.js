// This is a mock OCR service.
// In a real application, you would replace this with calls to a real OCR API
// like Google Cloud Vision, AWS Textract, etc.

const parseReceipt = async (filePath) => {
  console.log(`Parsing receipt from: ${filePath}`);

  // --- MOCK LOGIC ---
  // Simulate an API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simulate extracting data. In a real scenario, you'd parse the API response.
  const mockExtractedData = {
    vendor: 'The Coffee Shop',
    date: new Date().toISOString().split('T')[0], // Today's date
    amount: (Math.random() * 50 + 5).toFixed(2), // Random amount between 5 and 55
    currency: 'USD',
    category: 'Meals & Entertainment',
  };

  // In a real implementation, you would have error handling here.
  
  return mockExtractedData;
};

module.exports = { parseReceipt };