import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function AddFile({
  titleModule,
  idModule,
  idItem,
  isEditItem,
  triggerButton,
  buttons,
  isEdit,
  onDelete,
  isEditLink,
  url
}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleDropdownOpenChange = (open) => {
    setIsOpen(open);
  };
  
  return (
    <Dropdown
      isOpen={isOpen}
      onOpenChange={handleDropdownOpenChange}
      classNames={{
        content: "min-w-[200px]",
      }}
      className="shadow-xl"
      placement="bottom-end"
    >
      {!isEdit && (
        <DropdownTrigger>
          <Button
            radius="sm"
            startContent={
              <triggerButton.startIcon className="text-xl text-white pointer-events-none flex-shrink-0" />
            }
            endContent={isOpen ? <FaCaretUp /> : <FaCaretDown />}
            className={triggerButton.className}
          >
            {triggerButton.label}
          </Button>
        </DropdownTrigger>
      )}
      {isEdit && (
        <DropdownTrigger>
          <button className="p-2 focus:outline-none hover:bg-[#F2F2F2] dark:hover:bg-[#181818] rounded-md">
            <HiOutlineDotsVertical />
          </button>
        </DropdownTrigger>
      )}

      <DropdownMenu variant="faded">
        {buttons.map((button, index) => (
          <DropdownItem
            key={index}
            description={button?.description}
            startContent={
              <button.icon className="text-xl text-default-500 pointer-events-none flex-shrink-0" />
            }
            onClick={(event) => {
              const titleModule =
                event.currentTarget.getAttribute("data-title-module");
              const id = event.currentTarget.id;
              let module;
              if (isEditItem) {
                const idItem = event.currentTarget.getAttribute("data-id-item");
                module = {
                  title: titleModule,
                  idModule: id,
                  idItem: idItem,
                };
              }   else {
                module = {
                  title: titleModule,
                  id: id,
                };
              }

              if(isEditLink){
                const url = event.currentTarget.getAttribute("data-id-url");
                module = {
                  ...module,
                  url : url
                }
              }

              button.onClick(module);
            }}
            data-title-module={titleModule ? titleModule : ""}
            data-id-item={idItem ? idItem : ""}
            data-id-url={url ? url : ""}
            id={idModule}
          >
            {button.label}
          </DropdownItem>
        ))}
        {isEdit && (
          <DropdownItem
            key="delete"
            className="text-[#D33852]"
            color="danger"
            startContent={
              <RiDeleteBin6Line className="text-xl  text-[#D33852] pointer-events-none flex-shrink-0" />
            }
            onClick={(event) => {
              const id = event.currentTarget.id;
              const idItem = event.currentTarget.getAttribute("data-id-item");
              if (idItem) {
                onDelete({ id, idItem });
              } else {
                onDelete(id);
              }
            }}
            id={idModule}
            data-id-item={idItem ? idItem : ""}
          >
            Delete
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
