import {USER_ROUTE,  GROUP_ROUTE,} from "./utils/consts";
import ConversionContainer from "./Pages/UserContainer"
import HistoricalContainer from "./Pages/GroupContainer";


export const publicRoutes = [
    {path: USER_ROUTE,
        Component: ConversionContainer
    },
    {path: GROUP_ROUTE,
        Component: HistoricalContainer
    }
]
