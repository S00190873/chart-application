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

  chartContainer: `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 400px;
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
    margin-top: 20px;
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
  StyledThumb: `
  height: 30px;
  line-height: 30px;
  width: 30px;
  text-align: center;
  background-color: #000;
  color: #fff;
  border-radius: 50%;
  cursor: grab;
  font-size: 12px;
`,
  StyledTrack: `
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 2 ? "#ddd" : props.index === 1 ? "#0056b3" : "#ddd"};
  border-radius: 999px;
`,
  StyledBox: `
  border: 2px solid #0056b3;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #f0f0f0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  `,
  customSelectStyles: {
    control: (base) => ({
      ...base,
      minHeight: 56,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: 8,
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: 8,
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0px 8px",
    }),
    option: (base) => ({
      ...base,
      borderBottom: "1px dotted #ccc",
      padding: "10px 20px",
      "&:hover": {
        backgroundColor: "#f8f8f8",
      },
    }),
  },
};
