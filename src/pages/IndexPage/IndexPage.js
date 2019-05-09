import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Head from "../../components/Head/Head";

export default () => {
  return (
    <Layout>
      <Head title="Index" />
      <nav>
        <ul>
          <li>
            <Link to="/sign-in/">Sign In</Link>
          </li>
          <li>
            <Link to="/roles">Manage Roles</Link>
          </li>
        </ul>
      </nav>
    </Layout>
  );
};
