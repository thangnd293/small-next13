import Select, { Props } from "react-select";

export default (props: Props) => (
  <Select
    classNames={{
      control: () =>
        "bg-slate-900 min-w-[166px] min-h-[30px] border border-slate-700 hover:border-slate-500 focus:border-slate-500 focus:ring-slate-500 overflow-hidden rounded-md",
      indicatorSeparator: () => "bg-slate-700",
      indicatorsContainer: () => "bg-slate-900",
      input: () => "my-0",
      valueContainer: () => "py-0",
      singleValue: () => "text-slate-100",
    }}
    {...props}
  />
);
