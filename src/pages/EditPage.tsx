import { Button, Input, Textarea , useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import MyContext from "../context/MyContext";
import { useNavigate, useParams } from "react-router-dom";
import { createObjectArray , createStringArray } from "../createFunctions";
import { detailsType , tagType } from "../types";
import { saveNotesToLocalStorage, saveTagsToLocalStorage } from "../localStorage/localStorage";
const EditPage = () => {
  const toast = useToast()
  const status = "error";
  const [editNoteData, setEditNoteData] = useState<detailsType>();
  const navigate = useNavigate();
  const { id } = useParams();
  const context = useContext(MyContext);
  const tags = context?.tags;
  const setTags = context?.setTags;
  const notesData = context?.notesData;
  const setNotesData = context?.setNotesData;

  useEffect(() => {
    const data = notesData?.filter((element) => {
      return element.id === id;
    });
    if (data) {
      setEditNoteData(data[0]);
    }
    saveNotesToLocalStorage(notesData as detailsType[]);
  }, [notesData]);
  
  useEffect(()=>{
    saveTagsToLocalStorage(tags as string[]);
  },[tags]);
  
  const handleNoteEdit = () => {
    if (setNotesData && notesData && editNoteData)
      setNotesData(
        notesData.map((element) => {
          if (element.id === id) {
            return {
              ...element,
              title: editNoteData?.title,
              tags: editNoteData?.tags,
              note: editNoteData.note,
            };
          } else {
            return element;
          }
        })
      );
      const value = createStringArray(editNoteData?.tags as tagType[] , tags as string[]);
      console.log(value);
      if(setTags)
      setTags([...(tags as string[]), ...(value as string[])]);
    navigate(-1);
  };

  return (
    <div className="h-dvh w-dvw">
      <div className="py-8 px-40 flex flex-col gap-2">
        <div className="p-2 flex justify-between items-center">
          <span className="font-semibold text-3xl">Edit Note</span>
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            Back
          </Button>
        </div>

        <div className="flex justify-between p-2 items-center">
          <div className="flex flex-col gap-1">
            <span className="text-lg">Title</span>
            <Input
              required
              value={editNoteData?.title}
              onChange={(e) => {
                setEditNoteData({
                  ...(editNoteData as detailsType),
                  title: e.target.value,
                });
              }}
              size={"sm"}
              width={"400px"}
              height={"35px"}
              placeholder="write a title..."
              fontWeight={500}
              fontSize={16}
              maxLength={50}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-lg">Tags</span>
            <CreatableSelect
              options={createObjectArray(tags as string[])}
              placeholder="Select Tags..."
              required
              value={editNoteData?.tags}
              isMulti
              className="w-[400px]"
              onChange={(e) => {
                if (e.length <= 5) {
                  const updatedTags = e.map((element) => {
                    return {
                      ...element,
                      label: element.label.toUpperCase(),
                      value: element.value.toUpperCase()
                    };
                  });
                  setEditNoteData({ ...editNoteData as detailsType, tags: updatedTags });
                } else {
                  toast({
                    title: `Cannot add more than 5 tags !`,
                    status: status,
                    isClosable: true,
                    position: "top"
                  })
                }
              }}
            />
          </div>
        </div>

        <div className="p-2">
          <Textarea
            value={editNoteData?.note}
            onChange={(e) => {
              setEditNoteData({
                ...(editNoteData as detailsType),
                note: e.target.value,
              });
            }}
            placeholder="Write Note..."
            size="sm"
            resize={"none"}
            height={"350px"}
            bgColor={"white"}
          />
        </div>
        <div className="p-2 flex gap-3 justify-end">
          <Button
            colorScheme="blue"
            onClick={() => {
              handleNoteEdit();
              toast({
                title: `Note saved`,
                status: "success",
                isClosable: true,
                position: "top"
              });
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
