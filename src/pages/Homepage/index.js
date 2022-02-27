import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSpaces } from "../../store/space/actions";
import { selectAllSpaces } from "../../store/space/selectors";
import { Link } from "react-router-dom";
// WHEN BUILDING LINK YOU ALSO HAVE TO BUILT
// THE PAGE YOU WNAT TO DIRECT TO (/spaces/${space.id}) -> DETAILS PAGE
// -> Link only works with <Link> ... </Link>

const Homepage = () => {
  const dispatch = useDispatch();

  const spaces = useSelector(selectAllSpaces);
  //   console.log("spaces", spaces);

  useEffect(() => {
    dispatch(fetchSpaces);
    // console.log("fetch spaces", fetchSpaces);
  }, [dispatch]);

  return spaces ? (
    <div>
      <h1>This is Homepage My Friend</h1>
      {spaces.map((space) => {
        return (
          <div
            key={space.id}
            style={{
              backgroundColor: space.backgroundColor,
              color: space.color,
            }}
          >
            <h1>{space.title}</h1>
            <p>{space.description}</p>
            <button>
              <Link
                style={{ textDecoration: "none" }}
                to={`/spaces/${space.id}`}
              >
                VISIT ME
              </Link>
            </button>
          </div>
        );
      })}
    </div>
  ) : (
    "Loading..."
  );
};

export default Homepage;
