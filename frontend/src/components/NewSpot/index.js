import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./NewSpotForm.css";
import { createSpot } from "../../store/spots";
const NewSpotForm = () => {
  const sessionUser = useSelector((state) => state.session.user);
  console.log(sessionUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    dispatch(createSpot());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const spot = {
      name,
      description,
      price,
      image,
      userId: sessionUser.id,
    };

    let createdSpot = await dispatch(createSpot(spot));
    if (createdSpot) {
      history.push(`/`);
    }
  };
  // dispatch

  return (
    <div className="formContainer">
      <img
        className="image"
        src="https://news.airbnb.com/wp-content/uploads/sites/4/2019/06/PJM020719Q202_Luxe_WanakaNZ_LivingRoom_0264-LightOn_R1.jpg?fit=2500%2C1666"
      ></img>
      <form className="newspotform" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Spot Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="number"
          placeholder="Price Per Night"
          min="1"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="image"
          min="1"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        ></input>
        <button type="submit">Post The Spot</button>
      </form>
    </div>
  );
};

export default NewSpotForm;
