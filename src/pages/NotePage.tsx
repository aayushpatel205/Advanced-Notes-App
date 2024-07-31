import { Button } from "@chakra-ui/react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import MyContext from "../context/MyContext";
import { detailsType } from "../types";
import ReactMarkdown from "react-markdown";
import noNoteAvailable from "../assets/9169232.jpg";

const NotePage = () => {
  const { id } = useParams();
  const [noteDisplay, setNoteDisplay] = useState<detailsType>();
  const context = useContext(MyContext);
  const notesData = context?.notesData;
  const setNotesData = context?.setNotesData;
  const navigate = useNavigate();

  const setNote = () => {
    notesData?.map((element) => {
      if (element.id === id) {
        setNoteDisplay(element);
      }
    });
  };

  const filterNote = () => {
    const filterData = notesData?.filter((element) => {
      return element.id !== id;
    });
    if (setNotesData) {
      setNotesData(filterData as detailsType[]);
      navigate("/");
    }
  };

  useEffect(() => {
    setNote();
  }, []);
  return (
    <div className="h-dvh w-dvw py-10 px-20 flex flex-col gap-3 items-center">
      <div className="flex justify-between py-2 px-4 w-9/12">
        <div className="flex flex-col gap-2">
          <span className="text-3xl font-semibold">{noteDisplay?.title}</span>

          <div className="flex gap-2">
            {noteDisplay?.tags?.map((element) => {
              return (
                <div className="h-5 w-auto flex items-center p-2 text-white text-sm bg-blue-500 rounded-lg">
                  {element.label}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3">
          <Link to={"/editnote/" + id}>
            <Button colorScheme="blue">Edit</Button>
          </Link>
          <Button
            colorScheme="red"
            onClick={() => {
              filterNote();
            }}
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
        </div>
      </div>
      <div className="py-4 px-4 flex justify-center w-2/3">
        {noteDisplay?.note ? (
          <ReactMarkdown className="prose w-full">
            {noteDisplay?.note}
          </ReactMarkdown>
        ) : (
          <div>
            <img src={noNoteAvailable} className="h-[490px] w-[510px]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NotePage;
