import React from 'react';
import { Route } from 'react-router-dom';
import { view as Header } from '../components/header';
import { view as Sidebar } from '../components/sidebar';
import { view as Overview } from './overview';
import { view as Topo } from './topo';
import styles from './home.module.css';

const HomePage = () => {
  return (
      <div className={styles['home-wrapper']}>
        <div className={styles['home-wrapper-header']}>
          <Header />
        </div>
        <div className={styles['home-wrapper-container']}>
          <div className={styles['home-wrapper-sidebar']}>
            <Sidebar />
          </div>
          <div className={styles['home-wrapper-content']}>
            <Route path="/home/overview" component={Overview} />
            <Route path="/home/topo" component={Topo} />
          </div>
        </div>
      </div>
  );
};

export default HomePage;