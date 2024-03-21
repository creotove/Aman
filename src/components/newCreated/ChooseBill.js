import React from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import useSteps from "../../hooks/useSteps";
import useStitchBill from "../../hooks/useStitchBill";

const ChooseBill = ({ modalState, setModalState }) => {
  const navigate = useNavigate();
  const { setCurrentStep } = useSteps();
  const {
    setCustomerId,
    setName,
    setPhoneNumber,
    setTakeMeasurementsOf,
    setMeasurements,
    setInitializeMeasurements,
  } = useStitchBill();

  return (
    <section>
      <Modal
        title={"Choose bill type"}
        modalState={modalState}
        setModalState={setModalState}
      >
        <div className="flex justify-center items-center gap-8">
          <button
            onClick={() => {
              setCurrentStep(1);
              navigate("stitch-bill", { state: { id: 2 } });
              setCustomerId("");
              setName("");
              setPhoneNumber("");
              setTakeMeasurementsOf([]);
              setMeasurements("");
              setInitializeMeasurements("");
            }}
            className="myBtn"
          >
            Stitch Bill
          </button>
          <button
            onClick={() => navigate("sold-bill", { state: { id: 2 } })}
            className="myBtn"
          >
            Sold Bill
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default ChooseBill;
