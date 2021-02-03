import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import TodolistIcon from "images/todolist.png"

// Sub-pages
import ConnectHome from './pages/ConnectHome';

// Ids
const connectHomeId = 'connectHomeId';

function getAccount(state) {
    return state.account
}

export function ConnectRoot() {

    const params = useParams()
    const id = params.id
    const account = useSelector(state => getAccount(state))

    useEffect(() => {
        console.log('account:', account.privateKey)
        handleResolveConnect(params.id, account.privateKey, '1234', account.mnemonic)
    }, [account.privateKey])

    const [stage, setStage] = useState(connectHomeId)
    const [appname, setAppname] = useState()
    const [appicon, setAppicon] = useState()

    const handleResolveConnect = async (id, privateKey, password, mnemonic) => {
        let time = new Date().toISOString()
        // const res = await resolveConnect(time, id, privateKey, '1234', mnemonic)
        // setAppname(res.appname)
        // setAppicon(res.appicon)
        // console.log(res)
    }

    const dispatch = useDispatch()
    const history = useHistory()

    // Router
    switch (stage) {
        case connectHomeId:
            return (
                <ConnectHome
                    id={id}
                    appname={appname}
                    appicon={appicon}
                    account={account}
                    nextStage={() => setStage()}
                    exitStage={() => setStage()}>
                </ConnectHome>
            );
        default:
            return <h1>Oops...</h1>;
    }
}

export default ConnectRoot;
