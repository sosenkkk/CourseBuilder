import { useState, useMemo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import AddFile from "./Buttons/AddFile";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { TbPencilMinus } from "react-icons/tb";
import {
  deleteModule,
  updateModuleItem,
  deleteModuleItem,
  downloadSingleFile,
} from "../store/module-slice";
import { FcImageFile } from "react-icons/fc";
import { TfiDownload } from "react-icons/tfi";
import ModalE from "./Cards/Modal";

export function StoreList({ title, items, id, buttonConfig }) {
  const [isModuleOpen, setIsModuleOpen] = useState(true);
  const dispatch = useDispatch();
  const hideModuleHandler = () => {
    setIsModuleOpen(!isModuleOpen);
  };

  const deleteModuleHandler = (data) => {
    dispatch(deleteModule(id));
  };
  const deleteItemHandler = ({ id, idItem }) => {
    const moduleId = id;

    dispatch(deleteModuleItem({ moduleId, idItem }));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isCoureEdit, setIsCourseEdit] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalLabel, setModalLabel] = useState("");
  const [moduleData, setModuleData] = useState(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEdit(false);
    setIsCourseEdit(false);
    setIsLink(false);
  };
  const subButtonConfig = useMemo(
    () => [
      {
        label: "Rename",
        icon: TbPencilMinus,
        onClick: (event) => {
          setIsModalOpen(true);
          setIsCourseEdit(true);
          setModuleData(event);
          setModalLabel("Course Name");
          setModalTitle("Edit Course Item");
        },
      },
      {
        label: "Download",
        icon: TfiDownload,
        onClick: (event) => {
          dispatch(downloadSingleFile(event));
        },
      },
    ],
    []
  );

  const urlButtonConfig = useMemo(
    () => [
      {
        label: "Edit",
        icon: TbPencilMinus,
        onClick: (event) => {
          setIsModalOpen(true);
          setIsEdit(true);
          setIsLink(true);
          setModuleData(event);
          setModalLabel("Display Name");
          setModalTitle("Edit link");
        },
      },
    ],
    []
  );

  const handleSubmit = (data) => {
    if (isEdit && !isLink) {
      dispatch(updateModule(data));
    } else if (isEdit && isLink) {
      dispatch(updateModuleItem(data));
    } else if (isCoureEdit) {
      dispatch(updateModuleItem(data));
    }
  };

  return (
    <>
      {id != "1" && (
        <>
          <div className="mb-4">
            <div className="bg-white flex pl-3 gap-3 items-center dark:bg-[#2c2c2c] shadow-sm border dark:border-gray-800 rounded-md p-2">
              <button
                className="h-fit rounded-full border-1 p-1"
                onClick={hideModuleHandler}
              >
                {isModuleOpen ? (
                  <FaCaretUp className="text-[#717171] dark:text-gray-300 text-xs" />
                ) : (
                  <FaCaretDown className="text-[#717171] dark:text-gray-300 text-xs" />
                )}
              </button>
              <div className="w-full flex flex-col justify-between">
                <h5 className="text-sm text-[#222222] dark:text-gray-300 font-semibold">
                  {title}
                </h5>
                <p className="text-xs text-[#717171] dark:text-gray-300">
                  {items.length == 0 && "Add items to this module"}
                  {items.length != 0 && items.length + " item"}
                </p>
              </div>

              <div>
                <AddFile
                  isEdit={true}
                  onDelete={deleteModuleHandler}
                  buttons={buttonConfig}
                  titleModule={title}
                  idModule={id}
                />
              </div>
              <div className="absolute left-[0px] hidden group-hover:block">
                <RxDragHandleDots2 className="text-gray-500 dark:text-gray-300" />
              </div>
            </div>

            <Droppable droppableId={id} type="items">
              {(provided) => (
                <div
                  id={`${id}-box`}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={isModuleOpen ? "" : "h-0"}
                  style={{ overflow: "hidden", transition: "height 0.3s ease" }}
                >
                  {isModuleOpen &&
                    items.map((item, index) => (
                      <Draggable
                        draggableId={item.id}
                        index={index}
                        key={item.id}
                      >
                        {(provided) => (
                          <div
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            className="relative group"
                          >
                            <div className="bg-white border border-b-1 dark:border-[#2b2b2b] flex pl-8 gap-3 items-center dark:bg-[#2c2c2c]  p-2.5">
                              <div>
                                {item.fileType == "pdf" && (
                                  <img src="/pdf.svg" alt="pdf" />
                                )}
                                {item.fileType == "image" && (
                                  <FcImageFile size={28} />
                                )}
                                {item.fileType == "url" && (
                                  <img src="/link.svg" alt="url" />
                                )}
                              </div>
                              <div className="w-full flex flex-col justify-between">
                                <h5 className="text-sm text-[#222222] dark:text-gray-300 font-semibold">
                                  {item.title}
                                </h5>
                                <p className="text-xs text-[#717171] dark:text-gray-300">
                                  {item.fileType.toUpperCase()}
                                </p>
                              </div>
                              <div className="absolute  left-[10px] hidden group-hover:block">
                                <RxDragHandleDots2 className="text-gray-500 dark:text-gray-300" />
                              </div>
                              <div>
                                <AddFile
                                  isEdit={true}
                                  buttons={
                                    item.fileType === "url"
                                      ? urlButtonConfig
                                      : subButtonConfig
                                  }
                                  idModule={id}
                                  idItem={item.id}
                                  titleModule={item.title}
                                  isEditLink={true}
                                  url={
                                    item.fileType === "url" ? item.fileName : ""
                                  }
                                  isEditItem={true}
                                  onSubmit={handleSubmit}
                                  onDelete={deleteItemHandler}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </>
      )}
      {id == "1" && (
        <>
          <div className="mb-4">
            <div className=" flex pl-3  gap-3 items-center   p-2"></div>

            <Droppable droppableId={id} type="items">
              {(provided) => (
                <div
                  id={`${id}-box`}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{ overflow: "hidden", transition: "height 0.3s ease" }}
                >
                  {isModuleOpen &&
                    items.map((item, index) => (
                      <Draggable
                        draggableId={item.id}
                        index={index}
                        key={item.id}
                        
                      >
                        {(provided) => (
                          <div
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            className="relative group"
                          >
                            <div className="bg-white border border-b-1 dark:border-[#2b2b2b] flex pl-4 mb-3 gap-3 items-center rounded-md dark:bg-[#2c2c2c] p-2.5">
                              <div>
                                {item.fileType == "pdf" && (
                                  <img src="/pdf.svg" alt="pdf" />
                                )}
                                {item.fileType == "image" && (
                                  <FcImageFile size={28} />
                                )}
                                {item.fileType == "url" && (
                                  <img src="/link.svg" alt="url" />
                                )}
                              </div>
                              <div className="w-full flex flex-col justify-between">
                                <h5 className="text-sm text-[#222222] dark:text-gray-300 font-semibold">
                                  {item.title}
                                </h5>
                                <p className="text-xs text-[#717171] dark:text-gray-300">
                                  {item.fileType.toUpperCase()}
                                </p>
                              </div>
                              <div className="absolute left-[0px] hidden group-hover:block">
                                <RxDragHandleDots2 className="text-gray-500 dark:text-gray-300" />
                              </div>
                              <div>
                                <AddFile
                                  isEdit={true}
                                  buttons={
                                    item.fileType === "url"
                                      ? urlButtonConfig
                                      : subButtonConfig
                                  }
                                  idModule={id}
                                  idItem={item.id}
                                  titleModule={item.title}
                                  isEditItem={true}
                                  onSubmit={handleSubmit}
                                  onDelete={deleteItemHandler}
                                  isEditLink={true}
                                  url={
                                    item.fileType === "url" ? item.fileName : ""
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </>
      )}
      <ModalE
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalTitle}
        inputTitle={modalLabel}
        isEdit={isEdit}
        isLink={isLink}
        isCourseEdit={isCoureEdit}
        moduleData={moduleData}
        onSubmit={handleSubmit}
      />
    </>
  );
}
