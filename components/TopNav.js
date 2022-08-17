import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  CoffeeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  CarryOutOutlined,
  TeamOutlined
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const TopNav = () => {
  const { Item, SubMenu, ItemGroup } = Menu;

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
        key="/"
      >
        <Link href="/">
          <a>Home</a>
        </Link>
      </Item>

      {user && user.role && user.role.includes("Instructor") ? (
        <Item
          onClick={(e) => setCurrent(e.key)}
          icon={<CarryOutOutlined />}
          key="/instructor/course/create"
        >
          <Link href="/instructor/course/create">
            <a>Create Course</a>
          </Link>
        </Item>
      ) : (
        <Item
          onClick={(e) => setCurrent(e.key)}
          icon={<TeamOutlined />}
          key="/user/become-an-instructor"
        >
          <Link href="/user/become-an-instructor">
            <a>Become an Instructor</a>
          </Link>
        </Item>
      )}

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
        <SubMenu
          className="float-end"
          icon={<CoffeeOutlined />}
          title={user?.name}
          key="/logout"
        >
          <ItemGroup>
            <Item key="/user">
              <Link href="/user">
                <a>Dashboard</a>
              </Link>
            </Item>
            <Item icon={<LogoutOutlined />} onClick={logout} key="/logout">
              Signout
            </Item>
          </ItemGroup>
        </SubMenu>
      )}
    </Menu>
  );
};

export default TopNav;
