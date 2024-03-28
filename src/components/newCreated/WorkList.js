import { useState } from "react";
import Modal from "./Modal";
import DateFormatter from "../newCreated/DateFormatter";
import axios from "../../apis/admin";
import DisplayWork from "./DisplayWork";

const WorkList = ({ id, date, earned, index }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<h1>Loading...</h1>);

  const openModal = async () => {
    setModalOpen(true);
    const res = await axios.get(`/work/${id}`);
    if (res.data.success) {
      const work = res.data.data;
      const modalContent = <DisplayWork work={work}/>
      setModalContent(modalContent);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      {modalOpen && (
        <Modal
          title={""}
          closeModal={closeModal}
          modalContent={"Modal content goes here."}
        >
          {modalContent}
        </Modal>
      )}
      <tr className="">
        <td className="px-6 py-1 text-center">{index + 1}</td>
        <td className="px-6 py-1 text-center whitespace-nowrap">{DateFormatter(date)}</td>
        <td className="px-6 py-1 text-center">{earned}</td>
        <td className="px-6 py-1 text-center">
          <button
            onClick={() => {
              openModal();
            }}
            className="myBtn"
          >
            View
          </button>
        </td>
      </tr>
    </>
  );
};

export default WorkList;
