import TimeWithLabel from "./TimeWithLabel";

function SubsplitsStats() {
  return (
    <div className="flex flex-col items-center justify-evenly w-full">
      <div className="h-3/5 w-9/10 bg-[#f3f3f3] border-2"></div>
      <div className="h-1/5 w-9/10 bg-[#f3f3f3] border-2 flex flex-row">
        <TimeWithLabel label="Best Split" timeString="2:01" />
        <TimeWithLabel label="Possible Time Save" timeString="2:01" />
        <TimeWithLabel label="Average Split" timeString="2:01" />
      </div>
    </div>
  );
}

export default SubsplitsStats;
