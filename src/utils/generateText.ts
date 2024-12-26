
import { RowInfoPhysicalResponse } from "@interfaces/customer/CustomerResponses.interface";
import Globals from "@utils/Globals";
import dayjs from "dayjs";
import "dayjs/locale/fr";

dayjs.locale("fr");

// Text Generation
const getCivility = (civility?: number): string => {
  return (
    Globals.civilities.find((item) => item.value === civility)?.short || ""
  );
};

const getName = (
  civility?: number,
  firstname?: string,
  lastname?: string,
  birthName?: string
): string => {
  if (birthName) {
    return `${getCivility(civility)} ${firstname || ""} ${birthName}, épouse ${
      lastname || ""
    }, `;
  }
  if (civility && firstname && lastname)
    return `${getCivility(civility)} ${firstname || ""} ${lastname || ""}, `;
  else return "";
};

const getAddress = (info: RowInfoPhysicalResponse): string => {
  if (info.address1) {
    return `demeurant ${info.address1 || ""} ${info.zip1 || ""} ${
      info.city1 || ""
    }`;
  }
  return "";
};

const getBirthDate = (info: RowInfoPhysicalResponse): string => {
  if (info.birthday) {
    const prefix = info.civilities && info.civilities > 1 ? ", née " : ", né ";
    return `${prefix}le ${dayjs(info.birthday).format("DD MMMM YYYY")}${
      info.birthLocation ? ` à ${info.birthLocation}` : ""
    }`;
  }
  return "";
};

const getCivilStat = (info: RowInfoPhysicalResponse): string => {
  let status = "";
  if (info.civilStats !== undefined) {
    const civilStat = Globals.civilStats.find(
      (stat) => stat.value === info.civilStats
    );
    if (civilStat) {
      status = `, ${civilStat.text.toLowerCase()}`;
      if (info.civilStats === 3 || info.civilStats === 4) {
        if (info.unionDate) {
          status += ` le ${dayjs(info.unionDate).format("DD MMMM YYYY")} à ${
            info.unionPlace || ""
          }`;
        }
      }
    }
  }
  return status;
};

const getNationality = (info: RowInfoPhysicalResponse): string => {
  return info.nationality
    ? `, de nationalité ${info.nationality.toLowerCase()}`
    : "";
};

export const generateText = (
  lastname: string,
  row_infos: RowInfoPhysicalResponse
) => {
  if (!row_infos) return "";

  const name = getName(
    row_infos.civilities,
    row_infos.firstname,
    lastname,
    row_infos.birthName
  );
  const address = getAddress(row_infos);
  const birthDate = getBirthDate(row_infos);
  const civilStat = getCivilStat(row_infos);
  const nationality = getNationality(row_infos);

  if (name || address || birthDate || civilStat || nationality)
    return `${name}${address}${birthDate}${civilStat}${nationality}.`;
  else return "";
};
