import React, { useState, useRef } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { UploadIcon } from '../icons'; // We'll create this icon

// This is our MOCK OCR service from a previous step, now imported here.
// In a real app, this would be in a service file.
const parseReceipt = async (file) => {
  console.log(`Simulating OCR for: ${file.name}`);
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
  return {
    description: 'Mocked: Coffee Meeting',
    originalAmount: (Math.random() * 20 + 5).toFixed(2), // Random amount between 5 and 25
    originalCurrency: 'USD',
  };
};


const ScanAndEditForm = ({ onSubmit, isLoading, defaultCurrency }) => {
  const [expense, setExpense] = usetate({
    date: new Date().toISOString().slice(0, 10),
    description: '',
    category: '',
    originalAmount: '',
    originalCurrency: defaultCurrency || 'USD',
  });
  
  const [ocrStatus, setOcrStatus] = useState('idle'); // 'idle', 'processing', 'processed'
  const [receiptFile, setReceiptFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setReceiptFile(file);
    setOcrStatus('processing');

    try {
      // Call the mock OCR service
      const ocrData = await parseReceipt(file);
      
      // Pre-fill the form with data from OCR
      setExpense(prev => ({
        ...prev,
        ...ocrData,
      }));
      
      setOcrStatus('processed');
    } catch (error) {
      console.error("OCR failed:", error);
      alert("Could not read the receipt. Please enter details manually.");
      setOcrStatus('idle');
    }
  };

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // We would also need to upload the `receiptFile` here in a real app
    onSubmit(expense);
  };

  // Trigger the hidden file input
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Step 1: Upload Interface */}
      {ocrStatus !== 'processed' && (
        <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          <button
            type="button"
            onClick={handleUploadClick}
            disabled={ocrStatus === 'processing'}
            className="mx-auto flex flex-col items-center space-y-2 text-gray-600 hover:text-blue-600"
          >
            <UploadIcon className="h-12 w-12 text-gray-400" />
            <span className="font-semibold">
              {ocrStatus === 'processing' ? 'Processing...' : 'Upload or Take a Photo'}
            </span>
            <span className="text-sm text-gray-500">PNG, JPG up to 10MB</span>
          </button>
        </div>
      )}

      {/* Step 2: Edit and Confirm Form */}
      {ocrStatus === 'processed' && (
        <>
          <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-md text-center text-sm">
            We've pre-filled the form from your receipt. Please review and complete it.
          </div>
          <Input label="Date" type="date" name="date" value={expense.date} onChange={handleChange} required />
          <Input label="Description" name="description" value={expense.description} onChange={handleChange} required placeholder="e.g., Client Lunch Meeting" />
          <Input label="Category" name="category" value={expense.category} onChange={handleChange} required placeholder="Select a category" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Amount" type="number" name="originalAmount" value={expense.originalAmount} onChange={handleChange} required />
            <Input label="Currency" name="originalCurrency" value={expense.originalCurrency} onChange={handleChange} required />
          </div>
          <div className="pt-4">
            <Button type="submit" variant="primary" disabled={isLoading} className="w-full">
              {isLoading ? 'Submitting...' : 'Submit Expense'}
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default ScanAndEditForm;import React, { useState, useRef } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { UploadIcon } from '../icons'; // We'll create this icon

// This is our MOCK OCR service from a previous step, now imported here.
// In a real app, this would be in a service file.
const parseReceipt = async (file) => {
  console.log(`Simulating OCR for: ${file.name}`);
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
  return {
    description: 'Mocked: Coffee Meeting',
    originalAmount: (Math.random() * 20 + 5).toFixed(2), // Random amount between 5 and 25
    originalCurrency: 'USD',
  };
};


const ScanAndEditForm = ({ onSubmit, isLoading, defaultCurrency }) => {
  const [expense, setExpense] = usetate({
    date: new Date().toISOString().slice(0, 10),
    description: '',
    category: '',
    originalAmount: '',
    originalCurrency: defaultCurrency || 'USD',
  });
  
  const [ocrStatus, setOcrStatus] = useState('idle'); // 'idle', 'processing', 'processed'
  const [receiptFile, setReceiptFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setReceiptFile(file);
    setOcrStatus('processing');

    try {
      // Call the mock OCR service
      const ocrData = await parseReceipt(file);
      
      // Pre-fill the form with data from OCR
      setExpense(prev => ({
        ...prev,
        ...ocrData,
      }));
      
      setOcrStatus('processed');
    } catch (error) {
      console.error("OCR failed:", error);
      alert("Could not read the receipt. Please enter details manually.");
      setOcrStatus('idle');
    }
  };

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // We would also need to upload the `receiptFile` here in a real app
    onSubmit(expense);
  };

  // Trigger the hidden file input
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Step 1: Upload Interface */}
      {ocrStatus !== 'processed' && (
        <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          <button
            type="button"
            onClick={handleUploadClick}
            disabled={ocrStatus === 'processing'}
            className="mx-auto flex flex-col items-center space-y-2 text-gray-600 hover:text-blue-600"
          >
            <UploadIcon className="h-12 w-12 text-gray-400" />
            <span className="font-semibold">
              {ocrStatus === 'processing' ? 'Processing...' : 'Upload or Take a Photo'}
            </span>
            <span className="text-sm text-gray-500">PNG, JPG up to 10MB</span>
          </button>
        </div>
      )}

      {/* Step 2: Edit and Confirm Form */}
      {ocrStatus === 'processed' && (
        <>
          <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-md text-center text-sm">
            We've pre-filled the form from your receipt. Please review and complete it.
          </div>
          <Input label="Date" type="date" name="date" value={expense.date} onChange={handleChange} required />
          <Input label="Description" name="description" value={expense.description} onChange={handleChange} required placeholder="e.g., Client Lunch Meeting" />
          <Input label="Category" name="category" value={expense.category} onChange={handleChange} required placeholder="Select a category" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Amount" type="number" name="originalAmount" value={expense.originalAmount} onChange={handleChange} required />
            <Input label="Currency" name="originalCurrency" value={expense.originalCurrency} onChange={handleChange} required />
          </div>
          <div className="pt-4">
            <Button type="submit" variant="primary" disabled={isLoading} className="w-full">
              {isLoading ? 'Submitting...' : 'Submit Expense'}
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default ScanAndEditForm;