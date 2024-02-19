import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactSlider from "react-slider";
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
    yearRange: Yup.array()
      .of(Yup.number())
      .min(2, "Please select a range")
      .required("Please select a range"),
  });

  return (
    <Formik
      initialValues={{
        includeGlobalCharts: false,
        includeCountryCharts: false,
        includeGenreCharts: false,
        yearRange: [2003, 2023],
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const startYear = values.yearRange[0];
        const endYear = values.yearRange[1];
        const years = [];
        for (let year = startYear; year <= endYear; year++) {
          years.push(year);
        }
        values.years = years;
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
        setTimeout(() => {
          setSubmitting(false);
          navigate("/make-playlist2", { state: { formValues: values } });
        }, 400);
      }}
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

          <div className="styled-box">
            <label className="label">
              Choose a Year Range:
              <ReactSlider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                renderThumb={(props, state) => (
                  <div {...props} className={`slider-thumb example-thumb`}>
                    {state.valueNow}
                  </div>
                )}
                defaultValue={[2003, 2023]}
                ariaLabel={["Lower thumb", "Upper thumb"]}
                ariaValuetext={(state) =>
                  `Year range value now: ${state.valueNow}`
                }
                min={2003}
                max={2023}
                step={1}
                onChange={(value) => {
                  setFieldValue("yearRange", value);
                  playClickSound();
                }}
              />
              <ErrorMessage
                name="yearRange"
                component="div"
                className="error-message"
              />
            </label>
            <p className="year-range-text">
              {values.yearRange[0] !== values.yearRange[1] ? (
                <>
                  Years chosen are:{" "}
                  <span className="bold-text">
                    {values.yearRange[0]} to {values.yearRange[1]}
                  </span>
                </>
              ) : (
                <>
                  Year chosen is:
                  <span className="bold-text"> {values.yearRange[0]}</span>
                </>
              )}
            </p>
          </div>

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
