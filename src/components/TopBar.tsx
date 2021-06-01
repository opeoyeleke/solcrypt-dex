import {
  // InfoCircleOutlined,
  // PlusCircleOutlined,
  // SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import {
  // Button,
  Col,
  // Popover,
  Row,
  //  Select
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';
import styled from 'styled-components';
// import { useWallet } from '../utils/wallet';
import { ENDPOINTS, useConnectionConfig } from '../utils/connection';
// import Settings from './Settings';
import CustomClusterEndpointDialog from './CustomClusterEndpointDialog';
import { EndpointInfo } from '../utils/types';
import { notify } from '../utils/notifications';
import { Connection } from '@solana/web3.js';
import WalletConnect from './WalletConnect';
import { getTradePageUrl } from '../utils/markets';

const Wrapper = styled.div`
  background-color: #2c2e3f;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 20px;
  flex-wrap: wrap;
`;
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
  img {
    height: 30px;
    margin-right: 8px;
  }
`;

const ToggleMenuLarge = styled.div`
  cursor: pointer;
  margin-right: 27px;
  margin-left: 12px;
  padding-top: 3px;
`;

const ToggleMenuSmall = styled.div`
  cursor: pointer;
  margin-left: 27px;
  padding-top: 3px;
`;

export default function TopBar({ menuCollapsed, setMenuCollapsed }) {
  // const { connected, wallet } = useWallet();
  const {
    // endpoint,
    endpointInfo,
    setEndpoint,
    availableEndpoints,
    setCustomEndpoints,
  } = useConnectionConfig();
  const [addEndpointVisible, setAddEndpointVisible] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const location = useLocation();
  const history = useHistory();
  // const [searchFocussed, setSearchFocussed] = useState(false);

  const onAddCustomEndpoint = (info: EndpointInfo) => {
    const existingEndpoint = availableEndpoints.some(
      (e) => e.endpoint === info.endpoint,
    );
    if (existingEndpoint) {
      notify({
        message: `An endpoint with the given url already exists`,
        type: 'error',
      });
      return;
    }

    const handleError = (e) => {
      console.log(`Connection to ${info.endpoint} failed: ${e}`);
      notify({
        message: `Failed to connect to ${info.endpoint}`,
        type: 'error',
      });
    };

    try {
      const connection = new Connection(info.endpoint, 'recent');
      connection
        .getEpochInfo()
        .then((result) => {
          setTestingConnection(true);
          console.log(`testing connection to ${info.endpoint}`);
          const newCustomEndpoints = [
            ...availableEndpoints.filter((e) => e.custom),
            info,
          ];
          setEndpoint(info.endpoint);
          setCustomEndpoints(newCustomEndpoints);
        })
        .catch(handleError);
    } catch (e) {
      handleError(e);
    } finally {
      setTestingConnection(false);
    }
  };

  const endpointInfoCustom = endpointInfo && endpointInfo.custom;
  useEffect(() => {
    const handler = () => {
      if (endpointInfoCustom) {
        setEndpoint(ENDPOINTS[0].endpoint);
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [endpointInfoCustom, setEndpoint]);

  const tradePageUrl = location.pathname.startsWith('/trade/')
    ? location.pathname
    : getTradePageUrl();

  return (
    <>
      <CustomClusterEndpointDialog
        visible={addEndpointVisible}
        testingConnection={testingConnection}
        onAddCustomEndpoint={onAddCustomEndpoint}
        onClose={() => setAddEndpointVisible(false)}
      />
      <Wrapper>
        <div style={{ display: 'flex' }}>
          <div className="menu-button-large">
            <ToggleMenuLarge
              onClick={() => {
                setMenuCollapsed(!menuCollapsed);
              }}
            >
              {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </ToggleMenuLarge>
          </div>

          <LogoWrapper onClick={() => history.push(tradePageUrl)}>
            <img src={logo} alt="" />
            {'SOLCRYPT'}
          </LogoWrapper>
          <div className="menu-button-small">
            <ToggleMenuSmall
              onClick={() => {
                setMenuCollapsed(!menuCollapsed);
              }}
            >
              {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </ToggleMenuSmall>
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingRight: 5,
            }}
          ></div>
          <div>
            <Row
              align="middle"
              style={{ paddingLeft: 5, paddingRight: 5 }}
              gutter={16}
            >
              <Col>
                {/* <Select
                  onSelect={setEndpoint}
                  value={endpoint}
                  style={{ marginRight: 8, width: '150px' }}
                >
                  {availableEndpoints.map(({ name, endpoint }) => (
                    <Select.Option value={endpoint} key={endpoint}>
                      {name}
                    </Select.Option>
                  ))}
                </Select> */}
              </Col>
            </Row>
          </div>
          {/* {connected && (
            <div>
              <Popover
                content={<Settings autoApprove={wallet?.autoApprove} />}
                placement="bottomRight"
                title="Settings"
                trigger="click"
              >
                <Button style={{ marginRight: 8 }}>
                  <SettingOutlined />
                  Settings
                </Button>
              </Popover>
            </div>
          )} */}
          <div>
            <WalletConnect />
          </div>
        </div>
      </Wrapper>
    </>
  );
}
