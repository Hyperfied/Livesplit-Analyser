import SubsplitItem from "../SubsplitItem";
import SubsplitsStats from "../SubsplitsStats";

function SubsplitsPanel() {
    return (
    <div className="flex h-3/4 w-9/10 border-2 rounded-lg bg-white">
        <div className="h-full w-1/3 border-r-2 overflow-auto">
          <SubsplitItem name="First Steps" time="2:01"/>
        </div>
        <SubsplitsStats/>
      </div>
      );
}

export default SubsplitsPanel;