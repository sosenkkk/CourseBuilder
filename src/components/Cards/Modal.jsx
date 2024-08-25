import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

export default function ModalE({
  isOpen,
  onClose,
  title,
  inputTitle,
  isLink,
  isEdit,
  isCourseEdit,
  moduleData,
  onSubmit,
  isFile,
}) {
  const [inputValue, setInputValue] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (moduleData) {
      setInputValue(moduleData.title || "");
      setUrl(moduleData.url || "");
    }
  }, [moduleData]);

  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleUrlChange = (e) => setUrl(e.target.value);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    if (onSubmit) {
      if (isEdit && !isFile & !isLink) {
        console.log("module upload");
        onSubmit({ id: moduleData.id, title: inputValue, url });
      } else if (!isEdit && isFile & !isLink) {
        console.log("file upload");
        onSubmit({ title: inputValue, file: selectedFile });
      } else if (isCourseEdit & !isLink) {
        console.log("edit course");
        onSubmit({
          idModule: moduleData.idModule,
          title: inputValue,
          idItem: moduleData.idItem,
          url,
        });
      } else if (!isEdit && isLink) {
        console.log("link upload");
        onSubmit({ title: inputValue, url });
      } else if (isEdit && isLink) {
        console.log("link edit");
        onSubmit({
          title: inputValue,
          url,
          idItem: moduleData.idItem,
          idModule: moduleData.idModule,
        });
      } else {
        onSubmit({ title: inputValue });
      }
    }
    setInputValue("");
    setUrl("");
    setSelectedFile(null);
    onClose();
  };

  return (
    <Modal
      className="p-3"
      isOpen={isOpen}
      onClose={() => {
        setInputValue("");
        setUrl("");
        onClose();
      }}
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1 font-bold">
            {title}
          </ModalHeader>
          <ModalBody>
            {isLink && (
              <div className="flex flex-col">
                <label className="font-semibold text-md mb-1">URL</label>
                <input
                  type="text"
                  className="transition-colors focus:outline-none border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-[#272727] dark:border-[#3b3b3b] dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                  value={url}
                  onChange={handleUrlChange}
                />
              </div>
            )}
            {isFile == true && (
              <div className="flex flex-col">
                <label className="font-semibold text-md mb-1">
                  Upload File
                </label>
                <input
                  type="file"
                  className="transition-colors focus:outline-none border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-[#272727] dark:border-[#3b3b3b] dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                  onChange={handleFileChange}
                />
              </div>
            )}
            <div className="flex flex-col">
              <label className="font-semibold text-md mb-1">{inputTitle}</label>
              <input
                type="text"
                className="transition-colors focus:outline-none border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-[#272727] dark:border-[#3b3b3b] dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="bordered"
              radius="sm"
              onPress={() => {
                setInputValue("");
                setUrl("");
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#008392] text-white"
              radius="sm"
              onPress={handleSubmit}
            >
              {isLink && !isEdit && "Add"}
              {(isEdit || isCourseEdit || (isLink && isEdit)) && "Save Changes"}
              {!isLink && !isEdit && isFile && "Upload"}
              {!isLink && !isEdit && !isFile && !isCourseEdit && "Create"}
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
