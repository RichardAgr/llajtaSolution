import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { HomeOutlined, UnorderedListOutlined } from '@ant-design/icons'; // Importa los íconos necesarios
const { Header, Footer } = Layout;
const { SubMenu } = Menu;

import MyForm from '../RegistroPlatillo/registrarPlatillo';

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
          defaultSelectedKeys={['Platillos Tradicionales']}
          className='menu'
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
                <Menu.Item key="1"defaultSelectedKeys={['Registrar Platillo']}>Registrar Platillo</Menu.Item>
                <Menu.Item key="2">Mostrar Platillo</Menu.Item>
    
              </SubMenu>
              ):(
                item
              )}
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content className='content'>
        <MyForm/>
      </Content>
      <Footer className='footer'>
        Copyright @ 2023 Llajta Solutions Todos los derechos reservados
      </Footer>
    </Layout>
  );
};

export default App2;
