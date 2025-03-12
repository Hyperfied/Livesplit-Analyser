import SubsplitItem from "../SubsplitItem";

function SubsplitsPanel() {
    return (<div className="flex h-3/4 w-4/5 border-2 rounded-lg bg-white">
        <div className="h-full w-1/4 border-r-2 overflow-auto">
          <SubsplitItem name="First Steps" time="2:01"/>
        </div>
      </div>);
}

export default SubsplitsPanel;