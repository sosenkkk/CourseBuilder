import ModalE from "./Cards/Modal";
import { TbPencilMinus } from "react-icons/tb";
import { useState, useMemo } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { StoreList } from "./Items";
import { useSelector } from "react-redux";
import { reorderModules, updateModule } from "../store/module-slice";
import { useDispatch } from "react-redux";

function Modules() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalLabel, setModalLabel] = useState("");
  const [moduleData, setModuleData] =  useState(null);
  const stores = useSelector((state) => state.modules.modules);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEdit(false);
  };

  const handleDragAndDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedStores = Array.from(stores);

      const [removedStore] = reorderedStores.splice(source.index, 1);
      reorderedStores.splice(destination.index, 0, removedStore);
      console.log(reorderedStores)
      dispatch(reorderModules(reorderedStores));
      return;
    }

    const sourceStoreIndex = stores.findIndex(store => store.id === source.droppableId);
    const destinationStoreIndex = stores.findIndex(store => store.id === destination.droppableId);

    const newSourceItems = Array.from(stores[sourceStoreIndex].items);
    const newDestinationItems = source.droppableId !== destination.droppableId
      ? Array.from(stores[destinationStoreIndex].items)
      : newSourceItems;

    const [movedItem] = newSourceItems.splice(source.index, 1);
    newDestinationItems.splice(destination.index, 0, movedItem);

    const updatedStores = Array.from(stores);
    updatedStores[sourceStoreIndex] = { ...stores[sourceStoreIndex], items: newSourceItems };
    updatedStores[destinationStoreIndex] = { ...stores[destinationStoreIndex], items: newDestinationItems };

    dispatch(reorderModules(updatedStores));
  };

  const buttonConfig = useMemo(() => [
    {
      label: "Edit module name",
      icon: TbPencilMinus,
      onClick: (event) => {
        setIsModalOpen(true);
        setIsEdit(true);
        setModuleData(event);
        setModalLabel("Module Name");
        setModalTitle("Edit module");
      },
      onDelete:(event)=>{
        console.log(event)
      }
    },
  ], []);

  const handleSubmit = (data) => {
    if (isEdit) {
      console.log(data)
      dispatch(updateModule(data)); 
    } else {
      
    }
  };



  return (
    <div className="pb-12">
      <DragDropContext onDragEnd={handleDragAndDrop}>
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {stores.map((store, index) => (
                <Draggable
                  key={store.id}
                  draggableId={store.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <StoreList {...store} buttonConfig={buttonConfig} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <ModalE
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalTitle}
        inputTitle={modalLabel}
        isEdit={isEdit} onSubmit={handleSubmit}
        moduleData={moduleData}
      />
    </div>
  );
}

export default Modules;
