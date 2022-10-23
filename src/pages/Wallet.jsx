import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <div
        className="bg-bg-login h-screen w-full bg-emerald-500
        bg-blend-normal bg-cover"
      >
        <div className="w-4/5 mx-auto bg-white h-[300px] rounded-b-xl relative z-50">
          <Header />
          <WalletForm />
        </div>
        <Table />
      </div>
    );
  }
}

export default Wallet;
