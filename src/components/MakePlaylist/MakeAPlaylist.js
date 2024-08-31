// MakeAPlaylist.js
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import clickSound from "../../click.wav";
import "./MakeAPlaylist.css";

const MyStyledForm = () => {
  const navigate = useNavigate();

  const playClickSound = () => {
    const sound = new Audio(clickSound);
    sound.play();
  };

  const validationSchema = Yup.object({
    includeGlobalCharts: Yup.boolean(),
    includeCountryCharts: Yup.boolean(),
    includeGenreCharts: Yup.boolean(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const {
      includeGlobalCharts,
      includeCountryCharts,
      includeGenreCharts,
    } = values;

    if (
      !includeGlobalCharts &&
      !includeCountryCharts &&
      !includeGenreCharts
    ) {
      toast.error("Please select at least one chart type.");
      setSubmitting(false);
      return;
    }

    setSubmitting(false);

    if (includeCountryCharts || includeGenreCharts) {
      navigate("/make-playlist2", { state: { formValues: values } });
    } else {
      navigate("/make-playlist-year-selector", { state: { formValues: values } });
    }
  };

  return (
    <Formik
      initialValues={{
        includeGlobalCharts: false,
        includeCountryCharts: false,
        includeGenreCharts: false,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form className="form">
          <h2 className="instruction-text">
            Choose the Charts You Want to Include
          </h2>
          <div className="label">
            <Field
              className="checkbox-input"
              name="includeGlobalCharts"
              type="checkbox"
              onClick={playClickSound}
            />
            <label className="checkbox-label">Include Global Charts</label>
          </div>
          <ErrorMessage
            name="includeGlobalCharts"
            component="div"
            className="error-message"
          />

          <div className="label">
            <Field
              className="checkbox-input"
              name="includeCountryCharts"
              type="checkbox"
              onClick={playClickSound}
            />
            <label className="checkbox-label">Include Country Charts</label>
          </div>
          <ErrorMessage
            name="includeCountryCharts"
            component="div"
            className="error-message"
          />

          <div className="label">
            <Field
              className="checkbox-input"
              name="includeGenreCharts"
              type="checkbox"
              onClick={playClickSound}
            />
            <label className="checkbox-label">Include Genre Charts</label>
          </div>
          <ErrorMessage
            name="includeGenreCharts"
            component="div"
            className="error-message"
          />

          {(values.includeGlobalCharts ||
            values.includeCountryCharts ||
            values.includeGenreCharts) && (
            <button type="submit" className="submit-button">
              Continue
            </button>
          )}
          <ToastContainer position="top-center" autoClose={3000} />
        </Form>
      )}
    </Formik>
  );
};

export default MyStyledForm;
