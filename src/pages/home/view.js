import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { view as Header } from '../../components/header';
import { view as Sidebar } from '../../components/sidebar';
import { view as Overview } from '../overview';
import { view as Topo } from '../topo';
import { view as Pkg } from '../pkg';
import { view as User } from '../user';
import styles from './home.module.css';

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 80 : 256;
  const sidebarStyle = {
    gridTemplateColumns: sidebarWidth + 'px 1fr'
  };

  return (
    <div style={sidebarStyle} className={styles.container}>
      <div className={styles.header}>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      <div className={styles.sidebar}>
        <Sidebar collapsed={collapsed} />
      </div>
      <div className={styles.content}>
        <Route path="/home/overview" component={Overview} />
        <Route path="/home/topo" component={Topo} />
        <Route path="/home/users" component={User} />
        <Route path="/home/pkgs" component={Pkg} />
      </div>
    </div>
  );
};

export default HomePage;