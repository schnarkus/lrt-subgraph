import { BigInt, Bytes } from '@graphprotocol/graph-ts'
import { BeefyCLStrategy, BeefyCLVault, BeefyCLVaultSnapshot } from '../../generated/schema'
import { ADDRESS_ZERO, ADDRESS_ZERO_STRING } from '../utils/address'
import { ZERO_BD } from '../utils/decimal'
import { PROTOCOL_BEEFY_CL } from './protocol'
import { getIntervalFromTimestamp } from '../utils/time'

export const BEEFY_CL_VAULT_LIFECYCLE_INITIALIZING = 'INITIALIZING'
export const BEEFY_CL_VAULT_LIFECYCLE_RUNNING = 'RUNNING'
export const BEEFY_CL_VAULT_LIFECYCLE_PAUSED = 'PAUSED'

export function isVaultRunning(vault: BeefyCLVault): boolean {
  return vault.lifecycle == BEEFY_CL_VAULT_LIFECYCLE_RUNNING
}

export function getBeefyCLVault(vaultAddress: string): BeefyCLVault {
  let vault = BeefyCLVault.load(vaultAddress)
  if (!vault) {
    vault = new BeefyCLVault(vaultAddress)
    vault.protocol = PROTOCOL_BEEFY_CL.toString()
    vault.createdWith = ADDRESS_ZERO_STRING
    vault.owner = ADDRESS_ZERO
    vault.sharesToken = ADDRESS_ZERO_STRING
    vault.strategy = ADDRESS_ZERO_STRING
    vault.isInitialized = false
    vault.lifecycle = BEEFY_CL_VAULT_LIFECYCLE_INITIALIZING
    vault.underlyingToken0 = ADDRESS_ZERO_STRING
    vault.underlyingToken1 = ADDRESS_ZERO_STRING
    vault.currentPriceOfToken0InToken1 = ZERO_BD
    vault.priceRangeMin1 = ZERO_BD
    vault.priceRangeMax1 = ZERO_BD
    vault.priceRangeMin1USD = ZERO_BD
    vault.priceRangeMax1USD = ZERO_BD
    vault.underlyingAmount0 = ZERO_BD
    vault.underlyingAmount1 = ZERO_BD
    vault.underlyingAmount0USD = ZERO_BD
    vault.underlyingAmount1USD = ZERO_BD
    vault.totalValueLockedUSD = ZERO_BD
    vault.totalHarvestCount = 0
    vault.totalDepositCount = 0
    vault.totalWithdrawCount = 0
    vault.totalTransferCount = 0
    vault.totalHarvestedAmount0 = ZERO_BD
    vault.totalHarvestedAmount1 = ZERO_BD
    vault.totalHarvestedAmount0USD = ZERO_BD
    vault.totalHarvestedAmount1USD = ZERO_BD
    vault.totalHarvestValueUSD = ZERO_BD
    vault.totalHarvesterFeeCollectedNative = ZERO_BD
    vault.totalProtocolFeeCollectedNative = ZERO_BD
    vault.totalStrategistFeeCollectedNative = ZERO_BD
    vault.totalHarvesterFeeCollectedUSD = ZERO_BD
    vault.totalProtocolFeeCollectedUSD = ZERO_BD
    vault.totalStrategistFeeCollectedUSD = ZERO_BD
  }
  return vault
}

export function getBeefyCLStrategy(strategyAddress: string): BeefyCLStrategy {
  let strategy = BeefyCLStrategy.load(strategyAddress)
  if (!strategy) {
    strategy = new BeefyCLStrategy(strategyAddress)
    strategy.vault = ADDRESS_ZERO_STRING
    strategy.owner = ADDRESS_ZERO
    strategy.isInitialized = false
  }
  return strategy
}

export function getBeefyCLVaultSnapshot(vault: BeefyCLVault, timestamp: BigInt, period: BigInt): BeefyCLVaultSnapshot {
  const interval = getIntervalFromTimestamp(timestamp, period)
  const snapshotId = vault.id + '-' + period.toString() + '-' + interval.toString()
  let snapshot = BeefyCLVaultSnapshot.load(snapshotId)
  if (!snapshot) {
    snapshot = new BeefyCLVaultSnapshot(snapshotId)
    snapshot.vault = vault.id
    snapshot.timestamp = timestamp
    snapshot.roundedTimestamp = interval
    snapshot.period = period
    snapshot.currentPriceOfToken0InToken1 = ZERO_BD
    snapshot.priceRangeMin1 = ZERO_BD
    snapshot.priceRangeMax1 = ZERO_BD
    snapshot.priceRangeMin1USD = ZERO_BD
    snapshot.priceRangeMax1USD = ZERO_BD
    snapshot.underlyingAmount0 = ZERO_BD
    snapshot.underlyingAmount1 = ZERO_BD
    snapshot.underlyingAmount0USD = ZERO_BD
    snapshot.underlyingAmount1USD = ZERO_BD
    snapshot.totalValueLockedUSD = ZERO_BD
    snapshot.harvestCount = 0
    snapshot.depositCount = 0
    snapshot.withdrawCount = 0
    snapshot.transferCount = 0
    snapshot.harvestedAmount0 = ZERO_BD
    snapshot.harvestedAmount1 = ZERO_BD
    snapshot.harvestedAmount0USD = ZERO_BD
    snapshot.harvestedAmount1USD = ZERO_BD
    snapshot.harvestValueUSD = ZERO_BD
    snapshot.harvesterFeeCollectedNative = ZERO_BD
    snapshot.protocolFeeCollectedNative = ZERO_BD
    snapshot.strategistFeeCollectedNative = ZERO_BD
    snapshot.harvesterFeeCollectedUSD = ZERO_BD
    snapshot.protocolFeeCollectedUSD = ZERO_BD
    snapshot.strategistFeeCollectedUSD = ZERO_BD
  }
  return snapshot
}
