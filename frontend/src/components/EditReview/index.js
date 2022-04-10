import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ChangeReview from "./EditReview";

function EditReviewModal({ review }) {
  const [showModal, setShowModal] = useState(false);

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
          <ChangeReview review={review} />
        </Modal>
      )}
    </div>
  );
}

export default EditReviewModal;
