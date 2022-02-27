// LINK FOR MYSPACE IN NAVBAR I IN INDEX OF NAVIGATION COMPONENT AT COMPONENTS
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectUser } from "../../store/user/selectors";
import { selectToken } from "../../store/user/selectors";
import { deleteStory, addStoryToDataBase } from "../../store/user/actions";
import { editSpace } from "../../store/user/actions";
import { showMessageWithTimeout } from "../../store/appState/actions";

const MySpace = () => {
  const dispatch = useDispatch();
  const spaceDetails = useSelector(selectUser).space;
  // console.log("space details", spaceDetails);

  ////////////////////////////////////////
  // NAVIGATES LOGOUT BACK TO "/" -> HOMEPAGE
  const token = useSelector(selectToken);
  // console.log("token", token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  /////////////////////////////////////////
  /// FEATURE 5 -> ADD STORY TO SPACE AND DATABASE WITH HANDLESUBMIT

  const [story, setStory] = useState(false);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    // console.log("name,content,image", name, content, image);
    dispatch(addStoryToDataBase(name, content, imageUrl, spaceDetails.id));
    // dispatch(editSpace(title, description, newBackground, newColor));

    ///////// here i empty strings so form is refreshed and colapses!!!!!!!!!!!!!!!!
    setName("");
    setContent("");
    setImageUrl("");
    setStory(false);
  }

  ////////////////////////////////////////
  /// FEATURE 6 EDIT SPACE
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newBackground, setNewBackground] = useState("");
  const [newColor, setNewColor] = useState("");

  // HERE I MAKE A USE EFFECT FOR UPDATING COLOR AND BACKGROUND FEATURE 6
  useEffect(() => {
    if (spaceDetails) {
      setNewBackground(spaceDetails.backgroundColor);
      setNewColor(spaceDetails.color);
    }
  }, [spaceDetails]);

  if (!spaceDetails) return <h2>Loading...</h2>;
  return (
    <div>
      <div>MY SPACEY SPACE</div>
      <div
        key={spaceDetails.id}
        style={{
          backgroundColor: spaceDetails.backgroundColor,
          color: spaceDetails.color,
        }}
      >
        <div>This is the DETAILSPAGE! HERE YOU SEE THE SPACE</div>
        <div>
          <button value={story} onClick={() => setStory(!story)}>
            ADD STORY
          </button>
          {story ? (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                margin: "20px",
                flexDirection: "column",
              }}
            >
              <label>NAME</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                placeholder="make a new story"
              ></input>
              <label>CONTENT </label>
              <input
                value={content}
                onChange={(event) => setContent(event.target.value)}
                type="text"
                placeholder="new content!"
              ></input>
              <label>IMAGE URL</label>
              <input
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                type="text"
                placeholder="here should be your image URL!"
              ></input>
              {/* HERE I MAKE PREVIEW FOR PHOTO */}
              <img src={imageUrl} alt={""} width={300} />
              <button
                onClick={(event) =>
                  dispatch(
                    // HERE I MAKE MESSAGE WHEN SUBMIT WAS SUCCESFULL//
                    showMessageWithTimeout(
                      "success",
                      false,
                      "Super! You added a story!"
                    )
                  )
                }
                type="submit"
              >
                ADD STORY BRO!
              </button>
            </form>
          ) : (
            ""
          )}
        </div>
        <div>
          <button value={edit} onClick={() => setEdit(!edit)}>
            EDIT SPACE
          </button>
          {edit ? (
            <form
              style={{
                display: "flex",
                margin: "20px",
                flexDirection: "column",
              }}
            >
              <label>Title </label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                type="text"
                placeholder="change your title!"
              ></input>
              <label>Description </label>
              <input
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                type="text"
                placeholder="new description!"
              ></input>
              <label>Background Color </label>
              <input
                value={newBackground}
                onChange={(event) => setNewBackground(event.target.value)}
                type="color"
                placeholder="give me a background color!"
              ></input>
              <label>Color </label>
              <input
                value={newColor}
                onChange={(event) => setNewColor(event.target.value)}
                type="color"
                placeholder="give me a color!"
              ></input>
              <button
                onClick={() =>
                  dispatch(
                    editSpace(title, description, newBackground, newColor)
                  )
                }
              >
                SUBMIT EDIT
              </button>
            </form>
          ) : (
            ""
          )}
        </div>
        {spaceDetails.stories
          .sort((a, b) => a.createdAt - b.createdAt)
          .map((story) => {
            return (
              <div key={story.id}>
                <h2>{story.name}</h2>
                <div>
                  <button onClick={() => dispatch(deleteStory(story.id))}>
                    DELETE STORY
                  </button>
                </div>
                <img src={story.imageUrl} alt={story.name} width="500" />
                <p>{story.content}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MySpace;
