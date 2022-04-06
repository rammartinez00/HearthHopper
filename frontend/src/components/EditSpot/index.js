import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createSpot, updateSpot } from "../../store/spots";
import S3FileUpload from "react-s3";

const config = {
  bucketName: "hearthhopper",
  albumName: "hearthhopper",
  region: "us-west-1",
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretKey,
};
const EditSpotForm = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const spots = useSelector((state) => state.spots);
  const spotsArr = Object.values(spots);
  const spot = spotsArr.filter((spot) => spot.id === +id)[0];
  const [name, setName] = useState(spot?.name);
  const [description, setDescription] = useState(spot?.description);
  const [price, setPrice] = useState(spot?.price);
  const [image, setImage] = useState(spot?.Pictures[0].image);
  const [location, setLocation] = useState(spot?.location);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = [];
    if (name.length < 1) {
      errors.push("Name is required");
    }
    if (description.length < 1) {
      errors.push("Description is required");
    }
    if (price.length < 1) {
      errors.push("Price is required");
    }
    if (location.length < 1) {
      errors.push("Location is required");
    }
    setValidationErrors(errors);
  }, [name, description, price, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const changedSpot = {
      id: spot.id,
      name,
      description,
      price,
      image,
      location,
      userId: sessionUser.id,
    };

    let createdSpot = await dispatch(updateSpot(changedSpot));
    setName("");
    setDescription("");
    setPrice("");
    setImage("");
    setLocation("");
    setHasSubmitted(false);
    setValidationErrors([]);
    if (createdSpot) {
      history.push(`/spots`);
    }
  };
  // dispatch
  const upload = (e) => {
    setImage(e.target.value);
    //     S3FileUpload.uploadFile(e.target.files[0], config)
    //       .then((data) => {
    //         setImage(data.location);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   };
  };
  return (
    <div className="formContainer">
      <img
        className="image"
        src="https://news.airbnb.com/wp-content/uploads/sites/4/2019/06/PJM020719Q202_Luxe_WanakaNZ_LivingRoom_0264-LightOn_R1.jpg?fit=2500%2C1666"
      ></img>
      <form className="newspotform" onSubmit={handleSubmit}>
        <h2>Post Your Spot!</h2>
        <ul className="errors">
          {validationErrors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
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
          multiple
          placeholder="image"
          value={image}
          onChange={upload}
        ></input>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        ></input>
        <button type="submit" disabled={validationErrors.length > 0}>
          Post The Spot
        </button>
      </form>
    </div>
  );
};

export default EditSpotForm;
