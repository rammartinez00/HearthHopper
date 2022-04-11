import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ChangeReview from "./EditReview";

function EditReviewModal({ review, updated }) {
  const [showModal, setShowModal] = useState(false);

  const prop = {
    showModal,
    setShowModal,
  };

  return (
    <div className="editButton">
      <button
        className={`button btn-gradient`}
        onClick={() => setShowModal(true)}
      >
        Edit Review
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ChangeReview review={review} prop={prop} updated={updated} />
        </Modal>
      )}
    </div>
  );
}

export default EditReviewModal;
