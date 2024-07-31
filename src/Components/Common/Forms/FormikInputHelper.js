/* eslint-disable no-debugger */
import React from "react";
import Chips from "react-chips/lib/Chips";
import ReactSelect from "react-select";
import { Input, Label } from "reactstrap";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";
import AsyncSelect from "react-select/async";
import { t } from "i18next";
import { options } from "@fullcalendar/core/preact";

/**
 * Render Ready Formik Input .
 * @param {useFormik} formik - useFormik Hook Return
 * @param {{fieldName,type,label,options?:{value,label},loadOptions?:()=>{},defaultOptions?:[{}]}} field -  options for radio group
 *  */
export const RenderFormikInput = (formik, field) => {
  if (!field.type) field.type = "text";
  const animatedComponents = makeAnimated();
  const initialFieldValue = formik.values[field.fieldName];
  let translatedOptions = field.options;
  if (field.options) {
    translatedOptions =
      field.options &&
      field.options.map((option) => {
        const newOption = { ...option };
        newOption.label = t(newOption.label);
        return newOption;
      });
  }

  switch (field.type) {
    case "text":
    case "number":
    case "textarea":
    case "checkbox":
    case "date":
    default:
      return (
        <>
          <Label htmlFor={field.fieldName} className="form-label ">
            {t(field.label)}
          </Label>
          <Input
            type={field.type}
            className="form-control "
            placeholder={t(field.label)}
            id={field.fieldName}
            {...formik.getFieldProps(field.fieldName)}
            {...field.inputProps}
          />
          {formikError(formik, field)}
        </>
      );

    case "radio":
      return (
        <>
          <div className="d-flex gap-2 align-content-center">
            <Label className="form-label m-2">{t(field.label)}</Label>
            <div className="d-flex align-items-center gap-2 ">
              {field.options &&
                field.options.map((option, index) => (
                  <div
                    className="d-flex align-content-center gap-2"
                    key={index}
                  >
                    <Input
                      type="radio"
                      // className="form-radio"
                      placeholder={t(field.label)}
                      id={`${field.fieldName}-${index}`}
                      {...formik.getFieldProps(field.fieldName)}
                      value={option.value}
                    />
                    <Label
                      htmlFor={`${field.fieldName}-${index}`}
                      className="form-label m-0"
                    >
                      {t(option.label)}
                    </Label>
                  </div>
                ))}
            </div>
          </div>
          {formikError(formik, field)}
        </>
      );
    case "select":
      return (
        <>
          <Label htmlFor={field.fieldName} className="form-label">
            {t(field.label)}
          </Label>
          {field.loadOptions ? (
            <AsyncSelect
              cacheOptions
              loadOptions={field.loadOptions}
              defaultOptions
              {...reactSelectStyling}
              name={field.fieldName}
              placeholder={field.placeholder ?? t("Search")}
              // defaultValue={ field.options
              //   ? field.options.find((option) => option.value === field.value)
              //   : ""}
              // value={
              //   field.options
              //     ? field.options.find((option) => option.value === field.value)
              //     : ""
              // }
              defaultValue={field.defaultValue}
              value={field.value}
              // defaultInputValue={field.defaultValue.label}
              // inputValue={field.inputValue}
              onChange={(option) => {
                formik.setFieldValue(field.fieldName, option.value);
                field.onChange && field.onChange(option);
              }}
              onBlur={() => {
                formik.setFieldTouched(field.fieldName, true);
              }}
            />
          ) : (
            <ReactSelect
              {...reactSelectStyling}
              options={translatedOptions || []}
              name={field.fieldName}
              defaultValue={field.defaultValue}
              value={
                field.preSelectedValue
                  ? translatedOptions.find(
                      (option) => option.value === field.preSelectedValue
                    )
                  : field.value
              }
              placeholder={field.placeholder ?? t("Search")}
              onChange={(option) => {
                // console.log(option);
                formik.setFieldValue(field.fieldName, option.value);
                field.onChange && field.onChange(option);
              }}
              onBlur={() => {
                formik.setFieldTouched(field.fieldName, true);
              }}
            />
          )}
          {formikError(formik, field)}
        </>
      );
    case "chips":
      return (
        <>
          <Label htmlFor={field.fieldName} className="form-label mt-1">
            {t(field.label)}
          </Label>
          {field.loadOptions ? (
            <AsyncSelect
              placeholder={t("Search")}
              cacheOptions
              loadOptions={field.loadOptions}
              defaultOptions
              {...reactSelectStyling}
              name={field.fieldName}
              isClearable
              isMulti={true}
              components={animatedComponents}
              //set default value
              defaultValue={field.defaultValue}
              //set value
              onChange={(options) => {
                const optionsValues = options.map((el) => el.value);
                formik.setFieldValue(field.fieldName, optionsValues);
              }}
              onBlur={() => {
                formik.setFieldTouched(field.fieldName, true);
              }}
            />
          ) : (
            <CreatableSelect
              {...reactSelectStyling}
              options={translatedOptions || []}
              name={field.fieldName}
              isClearable
              isMulti={true}
              components={animatedComponents}
              // defaultInputValue={formik.values[field.fieldName]}
              defaultValue={formik.values[field.fieldName].map((el) => ({
                value: el,
                label: el,
              }))}
              placeholder={t("Search")}
              // value={formik.values[field.fieldName]}
              // onInputChange={(option) => {
              //   console.log(option)
              //   formik.setFieldValue(field.fieldName, option.value);
              // }}
              onChange={(options) => {
                const optionsValues = options.map((el) => el.value);
                formik.setFieldValue(field.fieldName, optionsValues);
              }}
              onBlur={() => {
                formik.setFieldTouched(field.fieldName, true);
              }}
            />
          )}
          {formikError(formik, field)}
        </>
      );
  }
};

const formikError = (formik, field) => {
  return formik.touched[field.fieldName] && formik.errors[field.fieldName] ? (
    <div className="text-danger mt-1">{formik.errors[field.fieldName]}</div>
  ) : null;
};

export const reactSelectStyling = {
  styles: {
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "var(--vz-input-bg)",
      borderColor: "var(--vz-input-border)",
    }),
    menu: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "var(--vz-input-bg)",
      borderColor: "var(--vz-input-border)",
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      color: "var(--vz-body-color)",
    }),
  },
  theme: (theme) => ({
    ...theme,
    borderRadius: "0.25rem",
    colors: {
      ...theme.colors,
      primary: "var(--vz-border-color)",
      primary25: "var(--vz-gray-100)",
    },
  }),
};
