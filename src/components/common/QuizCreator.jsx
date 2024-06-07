import { Grid } from "@mui/material";
import { Field, FieldArray, Form, Formik } from "formik";
import DynamicField from "./DynamicField";
import Button from "./Button";

const QuizCreator = ({ fields = [], initialValues, schema, addNewQuiz }) => {
  const handleSubmit = (values) => {
    console.log(values);
    addNewQuiz(values);
  };

  return (
    <div className="p-8  min-h-screen">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, setFieldValue }) => (
          <Form>
            <Grid className="pb-8" container spacing={4}>
              {fields?.map((field, key) => (
                <Grid item xs={12} sm={field.column} key={key}>
                  <DynamicField
                    field={field}
                    error={errors[field.name]}
                    touched={touched[field.name]}
                    value={values[field.name]}
                    disabled={field.isDisabled}
                    onChange={(value) => {
                      const event = {
                        target: {
                          name: field.name,
                          value: value,
                        },
                      };
                      handleChange(event);
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            <FieldArray name="questions">
              {({ push, remove }) => (
                <div>
                  {values.questions.map((question, qIndex) => (
                    <div
                      key={qIndex}
                      className="mb-6 p-4 bg-white rounded-lg shadow-lg border"
                    >
                      <label className="block text-3xl py-4 font-bold text-gray-700">
                        Question {qIndex + 1}
                      </label>
                      <Field
                        type="text"
                        placeholder="Enter Question"
                        name={`questions[${qIndex}].title`}
                        className={`bg-[#f4f4f4] text-[#7A7A7A] text-2xl p-3 rounded-xl w-full focus:outline-none font-semibold placeholder-[#7A7A7A] placeholder:text-xl`}
                      />
                      {errors.questions &&
                      errors.questions[qIndex] &&
                      errors.questions[qIndex].title &&
                      touched.questions &&
                      touched.questions[qIndex] &&
                      touched.questions[qIndex].title ? (
                        <div className="text-red-500 py-3">
                          {errors.questions[qIndex].title}
                        </div>
                      ) : null}

                      <>
                        {question.options.map((option, oIndex) => (
                          <div key={oIndex} className="flex flex-col mb-2">
                            <label className="block text-2xl py-4 text-start font-semibold text-gray-700">
                              {`Option ${oIndex + 1}`}
                            </label>
                            <div className="flex w-full flex-col">
                              <div className="flex w-full">
                                <div className="radio-container pr-4">
                                  <Field
                                    type="radio"
                                    name={`questions[${qIndex}].correctOption`}
                                    value={oIndex}
                                    checked={
                                      values.questions[qIndex].correctOption ===
                                      oIndex
                                    }
                                    onChange={() =>
                                      setFieldValue(
                                        `questions[${qIndex}].correctOption`,
                                        oIndex
                                      )
                                    }
                                    className="mr-2"
                                  />
                                  <div className="radio-custom"></div>
                                </div>
                                <Field
                                  type="text"
                                  placeholder="Enter Option"
                                  name={`questions[${qIndex}].options[${oIndex}]`}
                                  className={`bg-[#f4f4f4] text-[#7A7A7A] text-2xl p-3 rounded-xl w-full focus:outline-none font-semibold placeholder-[#7A7A7A] placeholder:text-xl`}
                                />
                              </div>
                              {errors.questions &&
                              errors.questions[qIndex] &&
                              errors.questions[qIndex].options &&
                              errors.questions[qIndex].options[oIndex] &&
                              touched.questions &&
                              touched.questions[qIndex] &&
                              touched.questions[qIndex].options &&
                              touched.questions[qIndex].options[oIndex] ? (
                                <div className="text-red-500 py-3">
                                  {errors.questions[qIndex].options[oIndex]}
                                </div>
                              ) : null}
                            </div>

                            {errors.questions &&
                            errors.questions[qIndex] &&
                            errors.questions[qIndex].correctOption &&
                            touched.questions &&
                            touched.questions[qIndex] &&
                            touched.questions[qIndex].correctOption ? (
                              <div className="text-red-500 py-3">
                                {errors.questions[qIndex].correctOption}
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </>

                      <button
                        type="button"
                        onClick={() => remove(qIndex)}
                        className="mt-2 text-xl font-semibold border border-red-500 text-red-500 px-5 py-3 rounded-xl"
                      >
                        Remove Question
                      </button>
                    </div>
                  ))}

                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() =>
                      push({
                        title: "",
                        options: ["", "", "", ""],
                        correctOption: null,
                      })
                    }
                  >
                    Add Question
                  </Button>
                </div>
              )}
            </FieldArray>

            <div className="py-10">
              <Button
                size="large"
                type="submit"
                variant="primary"
                //   onClick={() => handleModal("uploadModalIsOpen")}
              >
                Submit Quiz
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default QuizCreator;
