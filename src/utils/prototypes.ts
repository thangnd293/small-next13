import dayjs from "dayjs";
import "dayjs/locale/vi";

String.prototype.toPrettyDate = function () {
  return dayjs(String(this)).locale("vi").format("MMMM D, YYYY");
};
