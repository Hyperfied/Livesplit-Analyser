import SubsplitsPanel from "../Panels/SubsplitsPanel";

interface SubsplitsStatsPageProps {
  useGameTime: boolean
}

function SubsplitsStatsPage({useGameTime}: SubsplitsStatsPageProps) {
  return (
    <div className="flex w-full h-full justify-center items-center pt-[5%]">
      <SubsplitsPanel useGameTime={useGameTime}/>
    </div>
  );
}

export default SubsplitsStatsPage;
