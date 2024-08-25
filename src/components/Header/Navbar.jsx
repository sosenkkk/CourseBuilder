import DarkModeToggle from "./DarkModeToggle";
import AddFile from "../Buttons/AddFile";
import { PiLink } from "react-icons/pi";
import { TfiUpload } from "react-icons/tfi";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineTableRows } from "react-icons/md";
import { useState } from "react";
import ModalE from "../Cards/Modal";
import { useDispatch } from "react-redux";
import { addItemIndividual, addModule } from "../../store/module-slice";

export default function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isFile, setIsFile] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalLabel, setModalLabel] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (data) => {
    if (isFile && !isLink) {
      const file = data.file;
      let fileType = "unknown";
      let fileName = "";
      let fileSize = 0;

      if (file) {
        const fileExtension = file.name.split(".").pop().toLowerCase();
        fileName = file.name;
        fileSize = file.size;

        switch (fileExtension) {
          case "pdf":
            fileType = "pdf";
            break;
          case "jpg":
          case "jpeg":
          case "png":
          case "gif":
            fileType = "image";
            break;
          default:
            fileType = "url";
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Data = reader.result;
          localStorage.setItem(fileName, base64Data);

          dispatch(
            addItemIndividual({
              id: Date.now().toString(),
              title: data.title,
              fileName: fileName,
              fileType: fileType,
              fileSize: fileSize,
            })
          );
        };
        reader.readAsDataURL(file);
      }
    } else if (isLink) {
      console.log("link upload");
      dispatch(
        addItemIndividual({
          id: Date.now().toString(),
          title: data.title,
          fileName: data.url,
          fileType: "url",
        })
      );
    } else {
      console.log("module upload");
      dispatch(
        addModule({
          id: Date.now().toString(),
          title: data.title,
        })
      );
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsLink(false);
    setIsFile(false);
  };
  const triggerButtonConfig = {
    label: "Add",
    startIcon: IoMdAdd,
    className: "bg-[#D33852] text-white",
  };

  const buttonConfig = [
    {
      label: "Create Module",
      description: "Creates a module to add files.",
      icon: MdOutlineTableRows,
      onClick: () => {
        setIsModalOpen(true);
        setModalLabel("Module Name");
        setModalTitle("Create new module");
      },
    },
    {
      label: "Add a link",
      description: "Add your desired link.",
      icon: PiLink,
      onClick: () => {
        setIsModalOpen(true);
        setModalLabel("Display Name");
        setModalTitle("Add new link");
        setIsLink(true);
      },
    },
    {
      label: "Upload",
      description: "Allows you to upload a file.",
      icon: TfiUpload,
      onClick: () => {
        setIsModalOpen(true);
        setModalLabel("File Name");
        setModalTitle("Upload new File");
        setIsFile(true);
      },
    },
  ];

  return (
    <div className="flex w-100 bg-[#f9f9f9] sticky top-0 z-50 dark:bg-[#222222] items-center justify-between py-6 pb-12">
      <div>
        <h2 className="text-lg font-bold ">Course builder</h2>
      </div>

      <div className="flex gap-4">
        <AddFile triggerButton={triggerButtonConfig} buttons={buttonConfig} />

        <ModalE
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={modalTitle}
          inputTitle={modalLabel}
          isLink={isLink}
          isFile={isFile}
          onSubmit={handleSubmit}
        />

        <DarkModeToggle />
      </div>
    </div>
  );
}
