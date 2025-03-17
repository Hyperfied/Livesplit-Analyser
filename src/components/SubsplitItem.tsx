import Segment from "../classes/Segment";

interface SubsplitItemProps {
  name: string;
  time: string;
  setCurrentSegment: React.Dispatch<
    React.SetStateAction<Segment | null | undefined>
  >;
  segment: Segment;
}

function SubsplitItem({
  name,
  time,
  setCurrentSegment,
  segment,
}: SubsplitItemProps) {
  function onClick() {
    setCurrentSegment(segment);
  }
  return (
    <div
      className="flex flex-row justify-between items-center border-b-2 h-30 cursor-pointer p-4 hover:bg-stone-300"
      onClick={onClick}
    >
      <h2 className="text-3xl font-bold">{name}</h2>
      <h3 className="text-3xl">{time}</h3>
    </div>
  );
}

export default SubsplitItem;
