import {BigInt, log} from "@graphprotocol/graph-ts"
import {
    CarbonOffsetted,
    Debug,
    Minted,
    OwnershipTransferred,
    Withdrawal
} from "../generated/CO2ken/CO2ken"
import {UserBalance} from "../generated/schema"

export function handleCarbonOffsetted(event: CarbonOffsetted): void {
    let id = event.params.from.toHex()
    let userBalance = UserBalance.load(id)
    if (userBalance == null) {
        userBalance = new UserBalance(id)
        // TODO: check if the capacity is ok
        userBalance.balance = new BigInt(1024)
        log.info("Creating new UserBalance entity for address {}", [id])
    }
    userBalance.balance = userBalance.balance.plus(event.params.value)
    userBalance.save()
    log.info("User balance was increased by {} tokens. Resulting user balance: {}",
        [event.params.value.toString(), userBalance.balance.toString()])
}

export function handleDebug(event: Debug): void {
}

export function handleMinted(event: Minted): void {
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
}

export function handleWithdrawal(event: Withdrawal): void {
}
