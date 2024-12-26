export default class ConfigUtil {
  getEnum = (Enum:any) => {
    const Enumtype = Object.keys(Enum)
      .filter((v) => isNaN(Number(v)))
      .map((name) => {
        return {
          value: Enum[name as keyof typeof Enum],
          name,
        };
      });
    return Enumtype;
  };
}
