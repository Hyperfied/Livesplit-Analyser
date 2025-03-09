function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex items-center justify-between w-4/5">
      <h2 className="text-2xl font-bold">{title}</h2>
      <h3 className="text-xl">{value}</h3>
    </div>
  );
}

export default Stat;
