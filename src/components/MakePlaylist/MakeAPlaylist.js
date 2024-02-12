import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { formStyles } from '../styles/formStyles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledForm = styled(Form)`
  ${formStyles.form};
`;

const StyledField = styled(Field)`
  ${formStyles.field};
`;

const StyledCheckboxLabel = styled.label`
  ${formStyles.checkboxLabel};
`;

const StyledCheckboxInput = styled(StyledField)`
  ${formStyles.checkboxInput};
`;

const StyledErrorMessage = styled.div`
  ${formStyles.errorMessage};
`;

const StyledLabel = styled.label`
  ${formStyles.label};
`;

const SubmitButton = styled.button`
  ${formStyles.submitButton};
`;

const InstructionText = styled.h2`
  ${formStyles.instructionText};
`;

const StyledSubmitButton = styled(SubmitButton)`
  margin-top: 20px;
`;

const validationSchema = Yup.object({
  includeGlobalCharts: Yup.boolean(),
  includeCountryCharts: Yup.boolean(),
  includeGenreCharts: Yup.boolean(),
});

const MyStyledForm = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Formik
        initialValues={{ includeGlobalCharts: false, includeCountryCharts: false, includeGenreCharts: false, country: '', genre: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          const { includeGlobalCharts, includeCountryCharts, includeGenreCharts } = values;
          if (!includeGlobalCharts && !includeCountryCharts && !includeGenreCharts) {
            toast.error("Please select at least one chart type.");
            setSubmitting(false);
            return;
          }
          setTimeout(() => {
            setSubmitting(false);
            navigate('/make-playlist2', { state: { formValues: values } });
          }, 400);
        }}
      >
        {({ values }) => (
          <>
            <StyledForm>
            <InstructionText>Choose the Charts You Want to Include</InstructionText>
              <StyledLabel>
                <StyledCheckboxInput name="includeGlobalCharts" type="checkbox" />
                <StyledCheckboxLabel>
                  Include Global Charts
                </StyledCheckboxLabel>
              </StyledLabel>
              <ErrorMessage name="includeGlobalCharts" component={StyledErrorMessage} />

              <StyledLabel>
                <StyledCheckboxInput name="includeCountryCharts" type="checkbox" />
                <StyledCheckboxLabel>
                  Include Country Charts
                </StyledCheckboxLabel>
              </StyledLabel>
              <ErrorMessage name="includeCountryCharts" component={StyledErrorMessage} />
              
              <StyledLabel>
                <StyledCheckboxInput name="includeGenreCharts" type="checkbox" />
                <StyledCheckboxLabel>
                  Include Genre Charts
                </StyledCheckboxLabel>
              </StyledLabel>
              <ErrorMessage name="includeGenreCharts" component={StyledErrorMessage} />

              <StyledSubmitButton type="submit">Continue</StyledSubmitButton>
            </StyledForm>
          </>
        )}
      </Formik>
      <ToastContainer position="top-center" autoClose={3000} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100%;
`;


export default MyStyledForm;
