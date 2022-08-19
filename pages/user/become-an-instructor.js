import { useContext, useState } from "react";
import { Context } from "../../context";
import axios from "axios";
import { Button } from "antd";
import {
  SettingOutlined,
  UserSwitchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import UserRoute from "../../components/routes/UserRoute";
import { toast } from "react-toastify";

const BecomeAnInstructor = () => {
  const {
    state: { user }
  } = useContext(Context);

  const [loading, setLoading] = useState(false);

  const becomeInstructor = () =>{
    setLoading(true)
    axios.post("/api/make-instructor",{userId: user._id}).then(res=>{
      window.location.href = res.data
    }).catch(err=>{
      console.log(err)
      setLoading(false)
    })
  }
  return (
    <UserRoute>
      <h1 className="jumbotron text-center square">Become Instructor</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <div className="pt-4">
              <UserSwitchOutlined className="display-1 pb-3" />
              <br />
              <h2>Set up Pay out Account on KnowledgeTek Hub</h2>
              <p className="lead text-warning">
                We Partner with stripe to ensure prompt remmitance of payment
                into your account
              </p>

              <Button
                className="mb-3"
                type="primary"
                block
                shape="round"
                icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
                size="large"
                onClick={becomeInstructor}
                disabled={user && user.role.includes("Instructor") || loading}
              >
                {loading ? "Processing" : "Start Onboarding"}
              </Button>
              <p className="lead">
                You will be be redirected to stripe for your onboarding process
              </p>
            </div>
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default BecomeAnInstructor;
