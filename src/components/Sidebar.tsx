import React, { useState, useEffect } from 'react';
import { Layout, Menu, Drawer } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { getTradePageUrl } from '../utils/markets';
import { useWallet } from '../utils/wallet';

import {
  SwapOutlined,
  LineChartOutlined,
  PlusOutlined,
  DatabaseOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const EXTERNAL_LINKS = {
  '/docs': 'https://serum-academy.com/en/serum-dex/',
  '/add-market': 'https://serum-academy.com/en/add-market/',
  '/wallet-support': 'https://serum-academy.com/en/wallet-support',
  '/dex-list': 'https://serum-academy.com/en/dex-list/',
  '/developer-resources': 'https://serum-academy.com/en/developer-resources/',
  '/explorer': 'https://explorer.solana.com',
  '/srm-faq': 'https://projectserum.com/srm-faq',
  '/swap': 'https://swap.projectserum.com',
};

export default function Sidebar({
  menuCollapsed,
  setMenuCollapsed,
  setActivePage,
}) {
  const history = useHistory();
  const location = useLocation();
  const { connected } = useWallet();
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tradePageUrl = location.pathname.startsWith('/market/')
    ? location.pathname
    : getTradePageUrl();

  return (
    <div>
      <div className="mobile-menu">
        <Drawer
          placement="left"
          closable={true}
          onClose={() => {
            setMenuCollapsed(true);
          }}
          visible={!menuCollapsed && dimensions?.width < 1000}
        >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['/trade']}>
            <Menu.Item
              key="/trade"
              icon={<SwapOutlined />}
              onClick={() => {
                history.push(tradePageUrl);
                setActivePage('trade');
                setMenuCollapsed(true);
              }}
            >
              Trade
            </Menu.Item>

            <Menu.Item
              key="/history"
              icon={<LineChartOutlined />}
              onClick={() => {
                history.push(tradePageUrl);
                setActivePage('market-info');
                setMenuCollapsed(true);
              }}
            >
              Market Info
            </Menu.Item>
            {connected && (
              <Menu.Item
                key="/activity"
                icon={<UserOutlined />}
                onClick={() => {
                  history.push(tradePageUrl);
                  setActivePage('activity');
                  setMenuCollapsed(true);
                }}
              >
                Your Activity
              </Menu.Item>
            )}
            <Menu.Item
              key="/list-new-market"
              icon={<PlusOutlined />}
              onClick={() => {
                history.push('/list-new-market');
                setMenuCollapsed(true);
              }}
            >
              Add Market
            </Menu.Item>
            <Menu.SubMenu title="Resources" icon={<DatabaseOutlined />}>
              <Menu.Item
                key="/docs"
                onClick={() => {
                  setMenuCollapsed(true);
                }}
              >
                <a
                  href={EXTERNAL_LINKS['/docs']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Docs
                </a>
              </Menu.Item>
              <Menu.Item
                key="/add-market"
                onClick={() => {
                  setMenuCollapsed(true);
                }}
              >
                <a
                  href={EXTERNAL_LINKS['/add-market']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Adding a market
                </a>
              </Menu.Item>
              <Menu.Item
                key="/wallet-support"
                onClick={() => {
                  setMenuCollapsed(true);
                }}
              >
                <a
                  href={EXTERNAL_LINKS['/wallet-support']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Supported wallets
                </a>
              </Menu.Item>
              <Menu.Item
                key="/dex-list"
                onClick={() => {
                  setMenuCollapsed(true);
                }}
              >
                <a
                  href={EXTERNAL_LINKS['/dex-list']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DEX list
                </a>
              </Menu.Item>
              <Menu.Item
                key="/developer-resources"
                onClick={() => {
                  setMenuCollapsed(true);
                }}
              >
                <a
                  href={EXTERNAL_LINKS['/developer-resources']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Developer resources
                </a>
              </Menu.Item>
              <Menu.Item
                key="/explorer"
                onClick={() => {
                  setMenuCollapsed(true);
                }}
              >
                <a
                  href={EXTERNAL_LINKS['/explorer']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Solana block explorer
                </a>
              </Menu.Item>
              <Menu.Item
                key="/srm-faq"
                onClick={() => {
                  setMenuCollapsed(true);
                }}
              >
                <a
                  href={EXTERNAL_LINKS['/srm-faq']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SRM FAQ
                </a>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>{' '}
        </Drawer>
      </div>
      <Sider
        trigger={null}
        collapsible
        collapsed={menuCollapsed}
        className={menuCollapsed ? 'collapsed' : ''}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['/trade']}>
          <Menu.Item
            key="/trade"
            icon={<SwapOutlined />}
            onClick={() => {
              history.push(tradePageUrl);
              setActivePage('trade');
            }}
          >
            Trade
          </Menu.Item>

          <Menu.Item
            key="/history"
            icon={<LineChartOutlined />}
            onClick={() => {
              history.push(tradePageUrl);
              setActivePage('market-info');
            }}
          >
            Market Info
          </Menu.Item>

          {connected && (
            <Menu.Item
              key="/activities"
              icon={<UserOutlined />}
              onClick={() => {
                history.push(tradePageUrl);
                setActivePage('activity');
              }}
            >
              Your Activity
            </Menu.Item>
          )}

          <Menu.Item
            key="/list-new-market"
            icon={<PlusOutlined />}
            onClick={() => {
              history.push('/list-new-market');
            }}
          >
            Add Market
          </Menu.Item>
          <Menu.SubMenu title="Resources" icon={<DatabaseOutlined />}>
            <Menu.Item key="/docs">
              <a
                href={EXTERNAL_LINKS['/docs']}
                target="_blank"
                rel="noopener noreferrer"
              >
                Docs
              </a>
            </Menu.Item>
            <Menu.Item key="/add-market">
              <a
                href={EXTERNAL_LINKS['/add-market']}
                target="_blank"
                rel="noopener noreferrer"
              >
                Adding a market
              </a>
            </Menu.Item>
            <Menu.Item key="/wallet-support">
              <a
                href={EXTERNAL_LINKS['/wallet-support']}
                target="_blank"
                rel="noopener noreferrer"
              >
                Supported wallets
              </a>
            </Menu.Item>
            <Menu.Item key="/dex-list">
              <a
                href={EXTERNAL_LINKS['/dex-list']}
                target="_blank"
                rel="noopener noreferrer"
              >
                DEX list
              </a>
            </Menu.Item>
            <Menu.Item key="/developer-resources">
              <a
                href={EXTERNAL_LINKS['/developer-resources']}
                target="_blank"
                rel="noopener noreferrer"
              >
                Developer resources
              </a>
            </Menu.Item>
            <Menu.Item key="/explorer">
              <a
                href={EXTERNAL_LINKS['/explorer']}
                target="_blank"
                rel="noopener noreferrer"
              >
                Solana block explorer
              </a>
            </Menu.Item>
            <Menu.Item key="/srm-faq">
              <a
                href={EXTERNAL_LINKS['/srm-faq']}
                target="_blank"
                rel="noopener noreferrer"
              >
                SRM FAQ
              </a>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
    </div>
  );
}
