import Flatpickr from "react-flatpickr";
import { useEffect, useState } from "react";
import { useDatePickerStore } from "../../stores/datePickerStore";
import moment from "moment";

function DatePicker() {
  const { selectedDates, setSelectedDates } = useDatePickerStore(
    (state) => state
  );

  const [range, setRange] = useState([]);

  const { init } = useDatePickerStore((state) => state);

  useEffect(() => {
    // Call the init method when the component is loaded
    init();
  }, []);

  const handleDateChange = (PickedDates) => {
    console.log(PickedDates);
    if (PickedDates.length === 2) {
      // console.log(PickedDates);
      // const formattedDates = PickedDates.map((date) => {
      //   const year = date.getFullYear();
      //   const month = String(date.getMonth() + 1).padStart(2, "0");
      //   const day = String(date.getDate()).padStart(2, "0");
      //   return `${year}-${month}-${day}`;
      // });

      setSelectedDates(PickedDates);
    }
  };

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate());
  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 7);

  return (
    <Flatpickr
      className="form-control border-0 dash-filter-picker shadow"
      // value={[selectedDates[0], selectedDates[1]]}
      options={{
        mode: "range",
        dateFormat: "d M, Y",

        minDate: minDate,
        maxDate: maxDate,
      }}
      onChange={(e) => {
        setSelectedDates(e);
      }}
    />
  );
}

export default DatePicker;
