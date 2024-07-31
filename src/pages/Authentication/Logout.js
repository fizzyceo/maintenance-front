import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";
import { useAuth } from "../../stores";

const Logout = (props) => {
  const logout = useAuth((state) => state.logout);
  let navigate = useNavigate();
  useEffect(() => {
    logout();
    navigate("/login");
  }, []);
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Logout);
