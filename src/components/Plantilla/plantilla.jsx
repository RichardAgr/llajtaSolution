import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { HomeOutlined, UnorderedListOutlined } from '@ant-design/icons'; // Importa los íconos necesarios
import { Link } from 'react-router-dom';

import Routes from './Routes';

const { Header, Footer } = Layout;
const { SubMenu } = Menu;


import './plantilla.css'
import { Content } from 'antd/es/layout/layout';

const App2 = () => {
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items1 = ['Home', 'Platillos Tradicionales'];

  return (
    <Layout className="layout">
      <Header div className="header" >

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['Home']}
          className='menu'
        >
  <Menu.Item key="Home">
    <Link to="/">Home</Link> {/* Utiliza Link */}
  </Menu.Item>
  <SubMenu
    title={
      <span>
        <UnorderedListOutlined /> Platillos Tradicionales
      </span>
    }
    key="Platillos Tradicionales"
    className={openSubMenu ? 'ant-menu-submenu-open' : ''}
  >
    <Menu.Item key="Registrar Platillo">
      <Link to="/registrar-platillo">Registrar Platillo</Link> {/* Utiliza Link */}
    </Menu.Item>
    <Menu.Item key="Mostrar Platillo">
      <Link to="/mostrar-platillo/page/1">Mostrar Platillo</Link> {/* Utiliza Link */}
    </Menu.Item>
  </SubMenu>
        </Menu>
      </Header>
      <Content className='content'>
        <Routes/>
      </Content>
      <Footer className='footer'>
        Copyright @ 2023 Llajta Solutions Todos los derechos reservados
      </Footer>
    </Layout>
  );
};

export default App2;
