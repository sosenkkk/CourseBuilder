import Modules from "./ModulesPage";
import { useSelector } from "react-redux";

const CourseBuilder = () => {
  const data = useSelector((state) => state.modules);
  return (
    <div>
      {(data.modules.length > 1 || data.modules[0].items.length > 0) && (
        <Modules />
      )}
      {(!data ||
        (data.modules.length === 1 && data.modules[0].items.length == 0)) && (
        <>
          <div className="flex flex-col items-center justify-center h-[calc(100vh-theme(space.32))]">
            <img
              className="max-w-[280px] w-full"
              src="/images/nothing-here.png"
              alt="Nothing Here"
            />
            <h2 className="font-bold pb-1 text-lg">Nothing added here yet</h2>
            <p className="font-semibold text-md text-center">
              Click on the [+] Add button to add items to this course
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseBuilder;
