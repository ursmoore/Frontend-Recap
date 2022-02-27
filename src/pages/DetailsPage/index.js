import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSpaceById } from "../../store/space/actions";
import { useParams } from "react-router-dom";
import { selectSpaceDetails } from "../../store/space/selectors";

// CONSOLE.LOG ALLES!

const DetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  //   console.log("id", id);
  const spaceDetails = useSelector(selectSpaceDetails);
  //   console.log("whats selectSpaceDetails?", selectSpaceDetails);

  useEffect(() => {
    dispatch(fetchSpaceById(id));
  }, [dispatch, id]);

  if (!spaceDetails) return <h1>Loading...</h1>;
  return (
    <div
      key={spaceDetails.id}
      style={{
        backgroundColor: spaceDetails.backgroundColor,
        color: spaceDetails.color,
      }}
    >
      <div>This is the DETAILSPAGE! HERE YOU SEE THE SPACE</div>
      {spaceDetails.stories
        .sort((a, b) => a.createdAt - b.createdAt)
        .map((story) => {
          return (
            <div key={story.id}>
              <h2>{story.name}</h2>
              <p>{story.content}</p>
              <img src={story.imageUrl} alt={story.name} width="500" />
            </div>
          );
        })}
    </div>
  );
};

export default DetailsPage;
