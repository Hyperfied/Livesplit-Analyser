function TimeWithLabel({
  timeString,
  label,
}: {
  timeString: string;
  label: string;
}) {
  return (
    <div className="split-stats-time">
      <h1>{timeString}</h1>
      <h3>{label}</h3>
    </div>
  );
}

export default TimeWithLabel;
