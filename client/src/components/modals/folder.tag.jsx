import React, { useEffect, useState } from "react";
import CircleButton from "../common/buttons/reusable/circle.button";
import { IoClose } from "react-icons/io5";
import CopyLinkButton from "../common/buttons/copylink";
import OvalButton from "../common/buttons/reusable/oval.button";
import DropdownButton from "../common/buttons/reusable/dropdown.button";
import common from "@/configs/common.config";

const FolderTagModal = ({ onClose }) => {
  const [people, setPeople] = useState([]);
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("Role");

  const onSelectRole = (roleId) => {
    const selectedOption = roleOptions.find((option) => option.id === roleId);
    setSelectedRole(selectedOption.label);
  };

  const folder = { name: "Folder" };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const addPerson = () => {
    if (email.trim() !== "") {
      const newPerson = { name: "John Doe", email: email }; // Mock data
      setPeople([...people, newPerson]);
      setEmail("");
    }
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-75 transition-opacity duration-300 ease-in-out">
        <div className="bg-white rounded-md shadow-lg max-w-sm lg:max-w-xl w-full overflow-hidden">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 rounded-t">
            <h3 className="text-lg font-semibold text-gray-800">
              Tag to "{folder.name}"
            </h3>
            <CircleButton
              title={"Close modal"}
              icon={<IoClose />}
              onClick={handleCloseModal}
            />
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <div className="flex gap-1">
              <div className="w-full">
                <div className="relative w-full min-w-[200px] h-10">
                  <input
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-gray-400 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-400 focus:border-gray-900"
                    placeholder=" "
                    value={email}
                    onChange={handleInputChange}
                    required
                  />
                  <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-400 peer-focus:before:!border-gray-900 after:border-gray-400 peer-focus:after:!border-gray-900">
                    Add people
                  </label>
                </div>
              </div>
              <DropdownButton
                buttonText={selectedRole}
                options={common.roleOptions}
                onSelect={onSelectRole}
              />
            </div>
            {/* Render added people */}
            <div>
              {people.map((person, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 border-gray-200 p-2 rounded-full"
                >
                  <span className="text-gray-800 mx-2">{person.name}</span>
                  <span className="text-gray-500 mx-2 text-xs">
                    {person.email}
                  </span>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs text-blue-400">
                      {selectedRole}
                    </span>
                    <CircleButton
                      title={"Remove user"}
                      icon={<IoClose />}
                      onClick={() =>
                        setPeople(people.filter((_, i) => i !== index))
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full">
              <div className="relative w-full min-w-[200px] min-h-10">
                <textarea
                  rows={4}
                  className="resize-none peer w-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-gray-400 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-gray-400 focus:border-gray-900"
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-400 peer-focus:before:!border-gray-900 after:border-gray-400 peer-focus:after:!border-gray-900">
                  Message
                </label>
              </div>
            </div>
          </div>
          {/* Modal footer */}
          <div className="flex items-center justify-between p-4 md:p-5 border-gray-200 rounded-b dark:border-gray-600">
            <CopyLinkButton />
            <OvalButton text={"Done"} onClick={addPerson} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FolderTagModal;