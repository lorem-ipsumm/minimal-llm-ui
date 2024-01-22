
type Props = {
  activeModel: string;
  availableModels: any[];
  setIsModelsDropdownOpen: Function;
  setCurrentModel: Function;
  //   setActiveModel: Function;
  //   setOllama: Function;
};

const ModelsDropdown = ({
  availableModels,
  setIsModelsDropdownOpen,
  setCurrentModel 
}: Props) => {

  const renderOptions = () => {
    return (
      availableModels.map((modelOption: any) => {
        // cut the name off at the colon
        const name = modelOption.name.substring(0, modelOption.name.indexOf(":"));
        return (
          <div 
            className="flex items-center hover:bg-zinc-800 transition all h-[40px] text-nowrap px-2"
            onClick={() => setCurrentModel(modelOption)}
          >
            {name}
          </div>
        )
      })
    )
  }

  return (
    <div
      className="absolute w-full h-auto bg-zinc-900 flex flex-col gap-1 left-0 top-[110%] rounded-md overflow-hidden"
      onClick={() => setIsModelsDropdownOpen(false)}
    >
      {renderOptions()}
    </div>
  );
}

export default ModelsDropdown;