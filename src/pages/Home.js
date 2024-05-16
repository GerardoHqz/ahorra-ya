import { Layout } from "antd";
import SideMenu from "../components/Menu";

const Home = () => {
  return (
    <Layout className="min-h-screen text-bg-dark-blue dark:text-white">
      <SideMenu />
      <Layout>
        <div className="bg-white dark:bg-dark-blue p-6">
            <p className="text-xl">Últimas ofertas</p>
        </div>
      </Layout>
    </Layout>
  );
};
export default Home;
