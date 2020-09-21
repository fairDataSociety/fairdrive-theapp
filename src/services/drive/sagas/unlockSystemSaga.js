import { call, put, select, fork } from "redux-saga/effects"
import EthCrypto from "eth-crypto"
import { getAccount } from "../../account/selectors"

function delay(duration) {
    const promise = new Promise(resolve => {
        setTimeout(() => resolve(true), duration)
    })
    return promise
}

export default function* unlockSystemSaga(action) {
    console.log('unlocksystem saga started')
    try {
        console.log('unlock system with password ', action.data)
        const account = yield select(getAccount)
        console.log(account)
        const decryptedPrivateKey = yield window.myWeb3.eth.accounts.decrypt(account.privateKey, action.data.passWord)
        console.log(decryptedPrivateKey)
        const decryptedMnemonic = yield EthCrypto.decryptWithPrivateKey(decryptedPrivateKey.privateKey, account.mnemonic)
        console.log(typeof decryptedMnemonic, decryptedMnemonic)
        yield put({ type: 'SET_SYSTEM', data: { mnemonic: decryptedMnemonic } })
        yield put({ type: 'SET_SYSTEM', data: { privatekey: decryptedPrivateKey.privateKey } })
        yield put({ type: 'SET_SYSTEM', data: { unlocked: true } })
        const fairdrive = yield window.fairdrive.getFairdrive(decryptedMnemonic.toString())
        console.log(fairdrive)
        //yield put({ type: 'SET_DRIVE', data: { fairdrive: fairdrive } })
    } catch (e) {
        console.log('error on timeout', e)
    }
}