export const formStyles = {
  form: `
    display: flex;
    flex-direction: column;
    gap: 30px;
    max-width: 600px;
    margin: auto;
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding: 2rem;
    border: 1px solid #ccc;
    box-shadow: 0px 0px 8px #ccc;
    background-color: #fff;
    border-radius: 8px;
    text-align: center;
  `,
  field: `
    padding: 15px;
    &:focus {
      border-color: #007bff;
    }
  `,
  checkboxLabel: `
    font-size: 18px;
  `,
  checkboxInput: `
    margin-right: 5px;
    width: 20px;
    height: 20px;
  `,
  select: `
    display: block;
    width: 100%;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    font-size: 18px;
  `,
  errorMessage: `
    color: #ff0000;
  `,
  label: `
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    font-size: 20px;
  `,
  submitButton: `
    background-color: #007bff;
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 20px;
    &:hover {
      background-color: #0056b3;
    }
  `,
  instructionText: `
    text-align: center;
    margin-top: 2rem;
    font-size: 28px;
    font-weight: bold;
    border-bottom: 2px solid #007bff;
    padding-bottom: 0.5rem;
  `,
  // New styles added here
  StyledContainer: `
    position: relative;
    text-align: center;
    padding: 20px;
    max-width: 600px;
    margin: 40px auto;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  `,
  DataParagraph: `
    font-size: 18px;
    margin: 10px 0;
  `,
  Heading: `
    color: #333;
    margin-bottom: 20px;
    font-size: 32px;
  `,
  StyledSubmitButton: `
    background-color: #0056b3;
    border: none;
    color: white;
    padding: 10px 24px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-top: 20px;
    cursor: pointer;
    border-radius: 4px;
  `,
  // New React Select custom styles
  customSelectStyles: {
    control: (base) => ({
      ...base,
      minHeight: 56, // Adjust the height of the select input
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: 8, // Adjust the padding for the dropdown indicator
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: 8, // Adjust the padding for the clear indicator
    }),
    valueContainer: (base) => ({
      ...base,
      padding: '0px 8px', // Adjust the padding for the value container
    }),
    option: (base) => ({
      ...base,
      borderBottom: '1px dotted #ccc', // Style for options
      padding: '10px 20px', // Padding for options
      '&:hover': {
        backgroundColor: '#f8f8f8', // Background color on hover for options
      },
    }),
  },
};
