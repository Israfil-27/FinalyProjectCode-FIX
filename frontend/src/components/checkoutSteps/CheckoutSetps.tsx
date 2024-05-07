import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import './checout.scss';

interface CheckoutStepsProps {
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ step1, step2, step3, step4 }) => {
  return (
    <Menu mode="horizontal" className="navbar-Checkout-Steps" inlineCollapsed={false}>
      <Menu.Item className='Checkout-Steps-Link'  key="1" disabled={!step1}>
        <Link to="/">{step1 ? 'Daxil ol' : 'Daxil olunmalıdır'}</Link>
      </Menu.Item>
      <Menu.Item className='Checkout-Steps-Link' key="2" disabled={!step2}>
        <Link  to="/shipping">{step2 ? 'Alış-veriş' : 'alış-veriş tələb olunur'}</Link>
      </Menu.Item>
      <Menu.Item className='Checkout-Steps-Link' key="3" disabled={!step3}>
        <Link  to="/payment">{step3 ? 'Ödəniş' : 'Ödəniş'}</Link>
      </Menu.Item>
      <Menu.Item className='Checkout-Steps-Link'  key="4" disabled={!step4}>
        <Link to="/placeorder">{step4 ? 'Sifarişi tamamla' : 'Sifariş verilə bilinmir'}</Link>
      </Menu.Item>
    </Menu>
  );
};

export default CheckoutSteps;
