import { Button, Input, Textarea , useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import MyContext from "../context/MyContext";
import { detailsType, tagType } from "../types";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { createObjectArray , createStringArray } from "../createFunctions";
import { saveNotesToLocalStorage, saveTagsToLocalStorage } from "../localStorage/localStorage";

const NewNote = () => {
  const toast = useToast()
  const status = "error";
  const navigate = useNavigate();
  const context = useContext(MyContext);
  const tags = context?.tags;
  const setTags = context?.setTags;
  const notesData = context?.notesData;
  const setNotesData = context?.setNotesData;
  const [details, setDetails] = useState<detailsType>({
    id: "",
    title: "",
    tags: [],
    note: "",
  });

  useEffect(()=>{
    saveNotesToLocalStorage(notesData as detailsType[]);
  },[notesData])

  useEffect(()=>{
    saveTagsToLocalStorage(tags as string[]);
  },[tags])
  
  createObjectArray(tags as string[]);

  const addNotes = ():number => {
    if (
      setNotesData &&
      setTags &&
      details.id &&
      details.title &&
      details.tags
    ) {
      setNotesData([...(notesData as detailsType[]), details]);
      const value = createStringArray(details.tags as tagType[] , tags as string[]);
      setTags([...(tags as string[]), ...(value as string[])]);
      navigate("/");
      return 1;
    }else{
      toast({
        title: `Please add a title`,
        status: "warning",
        isClosable: true,
        position: "bottom-right"
      });
    }
    return 0;
  };

  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);

  return (
    <div className="h-dvh w-dvw">
      <div className="py-8 px-40 flex flex-col gap-2">
        <div className="p-2 flex justify-between items-center">
          <span className="font-semibold text-3xl">Create New Note</span>
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
              value={details.title}
              onChange={(e) => {
                setDetails({ ...details, title: e.target.value, id: small_id });
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
              value={details.tags}
              isMulti
              className="w-[400px]"
              onChange={(e) => {
                if (e.length <= 5) {
                  const updatedTags = e.map((element) => {
                    return {
                      ...element,
                      label: element.label.toUpperCase(),
                      value: element.value.toUpperCase(),
                    };
                  });
                  setDetails({ ...details, tags: updatedTags });
                } else {
                  toast({
                    title: `Cannot add more than 5 tags !`,
                    status: status,
                    isClosable: true,
                    position: "bottom-right"
                  })
                }
              }}
            />
          </div>
        </div>

        <div className="p-2">
          <Textarea
            value={details.note}
            onChange={(e) => {
              setDetails({ ...details, note: e.target.value });
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
              const done = addNotes();
              if(done === 1){
                toast({
                  title: `Note created`,
                  status: "success",
                  isClosable: true,
                  position: "bottom-right"
                });
              }
              
            }}
          >
            Save
          </Button>
          <Button
            colorScheme="gray"
            onClick={() => {
              setDetails({ note: "", tags: [], title: "", id: "" });
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewNote;
