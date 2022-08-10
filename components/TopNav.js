import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  CoffeeOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const TopNav = () => {
  const { Item, SubMenu } = Menu;

  const [current, setCurrent] = useState("");

  const { state, dispatch } = useContext(Context);

  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.clear();

    const { data } = await axios.get("/api/logout");

    toast.success(data.message);

    router.push("/");
  };
  return (
      <Menu mode="horizontal" selectedKeys={[current]}>
        <Item
          onClick={(e) => setCurrent(e.key)}
          icon={<AppstoreOutlined />}
          key="1/"
        >
          <Link href="/">
            <a>Home</a>
          </Link>
        </Item>

        {user === null && (
          <>
            <Item
              onClick={(e) => setCurrent(e.key)}
              icon={<LoginOutlined />}
              key="/login"
            >
              <Link href="/login">
                <a>Login</a>
              </Link>
            </Item>

            <Item
              onClick={(e) => setCurrent(e.key)}
              icon={<UserAddOutlined />}
              key="/register"
            >
              <Link href="/register">
                <a>Register</a>
              </Link>
            </Item>
          </>
        )}

        {user !== null && (
          <SubMenu className="float-end" icon={<CoffeeOutlined />} title={user?.name}>
            <Item onClick={logout} key="/logout">
              Signout
            </Item>
          </SubMenu>
        )}
      </Menu>
   
  );
};

export default TopNav;
