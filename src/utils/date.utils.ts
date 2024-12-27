import dayjs from "dayjs";
import "dayjs/locale/fr";

dayjs.locale("fr");


export const getFrDate = (date: Date): string => {
    return dayjs(date).format("DD MMMM YYYY")
};

