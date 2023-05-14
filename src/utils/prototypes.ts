import dayjs from "dayjs";
import "dayjs/locale/vi";

import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

String.prototype.toPrettyDate = function () {
  return dayjs(String(this)).locale("vi").format("MMMM D, YYYY");
};

String.prototype.toDateString = function () {
  return dayjs(String(this)).locale("vi").format("MMMM D, YYYY");
};

String.prototype.fromNow = function () {
  return dayjs(String(this)).locale("vi").fromNow();
};
