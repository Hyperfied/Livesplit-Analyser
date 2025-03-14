interface SubsplitItemProps {
    name: string,
    time: string
}

function SubsplitItem({name, time}: SubsplitItemProps) {
    return (
        <div className="flex flex-row justify-around items-center border-b-2 h-30 cursor-pointer p-4">
            <h2 className="text-3xl font-bold">{name}</h2>
            <h3 className="text-3xl">{time}</h3>
        </div>
    )
}

export default SubsplitItem;