type IViewportNameList = 'ViewportTour' | 'ViewPortMissionPanel' | 'ViewPortMissions' | 'ViewPortDailyReward'
| 'ViewPortCollectIncome'
export type IViewportName = IViewportNameList | IViewportNameList[]

export type IViewport = {
    name: IViewportNameList | null;
    data?: any;
}
