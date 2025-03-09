function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="split-stats-stat">
      <h2>{title}</h2>
      <h3>{value}</h3>
    </div>
  );
}

export default Stat;
