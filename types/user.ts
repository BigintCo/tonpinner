import { use } from 'react';
export type ISocialLink = {
  name: string;
  url: string;
}

export type IUser = {
  _id: string,
  username: string,
  password: string,
  level: number,
  points: number,
  energy: number,
  maxEnergy: number,
  hourlyIncome: number,
  calculatedIncome: number,
  businesses: [],
  referrals: [],
  dailyRewardStep: number,
  lastEnergyRefill: string,
  hasClaimedDailyLoginBonus: boolean,
  hasClaimedDailyReward: boolean,
  pointsPerClick: number,
}

export type IFriends = {
  referrals: {
    username: string,
    pointsEarned: number,
  }[],
  totalPointsEarned: number,
}

export type IClickDog = {
  points: number,
  energy: number,
}

export type IDailyReward = {
  points: number,
  dailyRewardStep: number,
}
export type IDailyLogin = {
  points: number,
  message: string,
}
export type IReferral = {
  _id: string,
  username: string,
  points: number,
}
export type IBusiness = {
  _id: string,
  name: string,
  cost: number,
  incomePerHour: number
}
type IBoosterLevels = {
  _id: string,
  level: number,
  effect: string,
  value: number,
  cost: number,
}
export type IBooster = {
  _id: string,
  name: string,
  cost: number,
  maxLevel: number,
  levels: IBoosterLevels[]
  userHasBooster: boolean,
  userLevel: number,
  nextLevelCost: number,
}
export type IMissions = {
  _id: string,
  title: string,
  description: string,
  type: string,
  action: string,
  actionData: any,
  reward: {
    type: number,
    amount: number
  },
  isActive: boolean,
}



