import React, { useState, useEffect } from "react"
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Header from '../Header/Header'
import LoginForm from '../LoginForm/LoginForm'
import AccountDetails from '../AccountDetails/AccountDetails'

const Account = () => {
    const {activeUser} = useTypedSelector(state => state)

    return (
        <div>
            <Header />
            {activeUser?.user
            ? (
                <AccountDetails />
            ) : (
                <LoginForm />
            )}
        </div>
    );
  }
  
  export default Account;