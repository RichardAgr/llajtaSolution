import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import MyForm from '../RegistroPlatillo/registrarPlatillo';
import { HomeOutlined, UnorderedListOutlined } from '@ant-design/icons'; // Importa los íconos necesarios
const { Header, Footer } = Layout;
const { SubMenu } = Menu;

const App2 = () => {
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items1 = ['Home', 'Platillos Tradicionales'];

  return (
    <Layout className="layout">
      <Header
        style={{
          display: 'flow',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['Platillos Tradicionales']}
        >
          {items1.map((item) => (
            <Menu.Item key={item}>
              {item === 'Home' && <HomeOutlined />} {/* Agrega ícono para Home */}
              {item === 'Platillos Tradicionales'  && <UnorderedListOutlined />}
              {item === 'Platillos Tradicionales'  && <UnorderedListOutlined />?(
                <SubMenu 
                title={item}
                key={item}
                className={openSubMenu ? 'ant-menu-submenu-open' : ''}
              >
                <Menu.Item key="1">Registrar Platillo</Menu.Item>
                <Menu.Item key="2" defaultSelectedKeys={['Registrar Platillo']}>Mostrar Platillo</Menu.Item>
    
              </SubMenu>
              ):(
                item
              )}
            </Menu.Item>
          ))}
        </Menu>
      </Header>
     {/*} <MyForm/> aqui se carga la parte de registrar platillo*/}
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        {/*Copyright @ 2023 Llajta Solutions Todos los derechos reservados*/}
      </Footer>
    </Layout>
  );
};

export default App2;
