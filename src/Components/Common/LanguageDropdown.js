import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { get } from "lodash";

//i18n
import i18n from "../../i18n";
import languages from "../../common/languages";
import { useLanguageStore } from "./../../stores/Language";

const LanguageDropdown = () => {
  // Declare a new state variable, which we'll call "menu"
  //   const [selectedLang, setSelectedLang] = useState("");
  const { currentLang, setCurrentLanguage } = useLanguageStore(
    (state) => state
  );
  useEffect(() => {
    const currentLanguage = localStorage.getItem("I18N_LANGUAGE");
    setCurrentLanguage(currentLanguage);

  }, []);

  const changeLanguageAction = (lang) => {
    if(currentLang===lang){
      return
    }
    //set language as i18n
    i18n.changeLanguage(lang);
    localStorage.setItem("I18N_LANGUAGE", lang);
    setCurrentLanguage(lang);
    window.location.reload()

  };

  const [isLanguageDropdown, setIsLanguageDropdown] = useState(false);
  const toggleLanguageDropdown = () => {
    setIsLanguageDropdown(!isLanguageDropdown);
  };
  return (
    <React.Fragment>
      <Dropdown
        isOpen={isLanguageDropdown}
        toggle={toggleLanguageDropdown}
        className="ms-1 topbar-head-dropdown header-item"
      >
        <DropdownToggle
          className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
          tag="button"
        >
          <img
            src={get(languages, `${currentLang}.flag`)}
            alt="Header Language"
            height="20"
            className="rounded"
          />
        </DropdownToggle>
        <DropdownMenu className="notify-item language py-2">
          {Object.keys(languages).map((key) => (
            <DropdownItem
              key={key}
              onClick={() => changeLanguageAction(key)}
              className={`notify-item ${
                currentLang === key ? "active" : "none"
              }`}
            >
              <img
                src={get(languages, `${key}.flag`)}
                alt="Skote"
                className="me-2 rounded"
                height="18"
              />
              <span className="align-middle">
                {get(languages, `${key}.label`)}
              </span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default LanguageDropdown;
