function TimeWithLabel({
  timeString,
  label,
}: {
  timeString: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center w-1/3">
      <h1 className="text-4xl font-bold">{timeString}</h1>
      <h3 className="text-xl">{label}</h3>
    </div>
  );
}

export default TimeWithLabel;
