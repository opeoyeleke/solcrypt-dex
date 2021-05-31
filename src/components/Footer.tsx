import React from 'react';
import { Layout, Row, Col } from 'antd';
import Link from './Link';
import Discord from './../../src/assets/icons8-discord.svg';
import Medium from './../../src/assets/icons8-medium-new.svg';
import Twitter from './../../src/assets/icons8-twitter.svg';

const { Footer } = Layout;

export const CustomFooter = () => {
  return (
    <Footer
      style={{
        height: '45px',
        paddingBottom: 10,
        paddingTop: 10,
      }}
    >
      <Row className="footer-items" align="middle" gutter={[16, 4]}>
        <div style={{ display: 'flex', margin: '0px auto' }}>
          <Col>
            <Link external to="https://discord.gg">
              <img src={Discord} alt="" />
            </Link>
          </Col>

          <Col>
            <Link external to="https://twitter.com">
              <img src={Twitter} alt="" />
            </Link>
          </Col>

          <Col>
            <Link external to="https://medium.com">
              <img src={Medium} alt="" />
            </Link>
          </Col>
        </div>
      </Row>
    </Footer>
  );
};
