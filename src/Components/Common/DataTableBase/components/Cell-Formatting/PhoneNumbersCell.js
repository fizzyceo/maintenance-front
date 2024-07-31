const PhoneNumbersCell = ({ first, second }) => {
  return (
    <div className="d-flex flex-column gap-1 py-2">
      <span>- {first}</span>
      {second && <span>- {second}</span>}
    </div>
  );
};

export { PhoneNumbersCell };
