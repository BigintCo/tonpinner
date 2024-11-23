import { IReturn } from "../loading";
import { IViewport } from "../window";
import { IBooster, IBusiness, IClickDog, IDailyLogin, IFriends, IMissions, IUser } from "../user";


export interface IAppState {
    loading: { [key: string]: IReturn };
    handleLoading: (value: IReturn | null) => void
    pagination: { [key: string]: number };
    handlePagination: (key: string | null) => void;
    userToken: string | null;
    handleUserToken: (val: string) => void;
    user: IUser;
    handleUser: (val: IUser) => void;
    referrals: IFriends;
    handleReferrals: (val: IFriends) => void;
   
   
}