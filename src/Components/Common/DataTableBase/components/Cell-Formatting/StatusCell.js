import { t } from "i18next";
import { Badge } from "reactstrap";

const StatusCell = ({ text }) => {
  return (
    // <span className={`badge badge-soft-${getStatusColor(text)}`}>
    //   {text || ""}
    // </span>
    <Badge
      color={getStatusColor(text)}
      style={{ lineHeight: "1rem" }}
      className="w-100"
    >
      {t(text?.charAt(0)?.toUpperCase() + text?.slice(1) || "")}
    </Badge>
  );
};

const getStatusColor = (text) => {
  switch (text) {
    case "Pending":
    case "Submitted":
      return "warning";
    case "Active":
    case "active":
    case "Attended":
      return "success";
    case "Suspended":
    case "inactive":
    case "Cancelled":
      return "danger";

    default:
      return "primary";
  }
};

export { StatusCell };

// <span className="badge rounded-pill badge-soft-primary">Primary</span>

// <span className="badge rounded-pill badge-soft-secondary">Secondary</span>

// <span className="badge rounded-pill badge-soft-success">Success</span>

// <span className="badge rounded-pill badge-soft-info">Info</span>

// <span className="badge rounded-pill badge-soft-warning">Warning</span>

// <span className="badge rounded-pill badge-soft-danger">Danger</span>

// <span className="badge rounded-pill badge-soft-dark">Dark</span>

// <span className="badge rounded-pill badge-soft-light">Light</span>
