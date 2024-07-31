import { Input , Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import Card from "../components/Card/Card";
import { useContext, useEffect, useState } from "react";
import MyContext from "../context/MyContext";
import Modal from "../components/Modal/Modal";
import { searchType, detailsType } from "../types";
import _ from "lodash";
import noNoteAvailable from "../assets/9169232.jpg";
import { createObjectArray } from "../createFunctions";
import {
  saveTagsToLocalStorage,
  saveNotesToLocalStorage,
} from "../localStorage/localStorage";

const Home = () => {
  const context = useContext(MyContext);
  const notesData = context?.notesData;
  const tags = context?.tags;
  const setNotesData = context?.setNotesData;
  const setTags = context?.setTags;
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchDetails, setSearchDetails] = useState<searchType>({
    title: "",
    tags: [],
  });
  const [filterNotes, setFilterNotes] = useState<detailsType[]>(
    notesData as detailsType[]
  );
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    createObjectArray(tags as string[]);
    saveTagsToLocalStorage(tags as string[]);
  }, [tags]);


  useEffect(() => {
    saveNotesToLocalStorage(notesData as detailsType[]);
    setFilterNotes(notesData as detailsType[]);
  }, [notesData]);

  const filterFunc = () => {
    const checked = notesData?.filter((element) => {
      const commonTags = _.intersectionBy(
        element.tags,
        searchDetails.tags,
        "label"
      );

      if (searchDetails.tags.length > 0 && searchDetails.title) {
        return (
          commonTags.length > 0 &&
          element.title
            .toLowerCase()
            .includes(searchDetails.title.toLowerCase())
        );
      } else if (searchDetails.tags.length > 0) {
        return commonTags.length > 0;
      } else {
        return element.title
          .toLowerCase()
          .includes(searchDetails.title.toLowerCase());
      }
    });
    setFilterNotes(checked as detailsType[]);
  };

  const deleteTag = (removeTag: string) => {
    if (setTags && tags && setNotesData) {
      setTags(
        tags?.filter((tag) => {
          return tag !== removeTag;
        })
      );

      const filteredData = notesData?.map((note) => {
        return {
          ...note,
          tags: note.tags?.filter(
            (tagItem) => tagItem.label !== removeTag.toUpperCase()
          ),
        };
      });
      console.log(filteredData);
      setNotesData(filteredData as detailsType[]);
    }
  };

  return (
    <div className="py-8 px-40 flex flex-col gap-2">
      <div className="p-2 flex justify-between items-center">
        <span className="font-semibold text-3xl">Notes App.</span>
        <div className="flex gap-3">
          <Link to={"/new"}>
            <Button colorScheme="blue">Create</Button>
          </Link>
          <Button colorScheme="red" onClick={openModal}>
            Delete Tags
          </Button>
        </div>
      </div>

      <div className="flex justify-between p-2 items-center">
        <div className="flex flex-col gap-1">
          <span className="text-lg">Title</span>
          <Input
            value={searchDetails.title}
            onChange={(e) => {
              setSearchDetails({ ...searchDetails, title: e.target.value });
            }}
            size={"sm"}
            width={"400px"}
            height={"35px"}
            placeholder="write a title..."
            fontWeight={500}
            className="font-medium"
            fontSize={16}
            maxLength={50}
          />
        </div>

        <div className="flex gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-lg">Tags</span>
            <CreatableSelect
              value={searchDetails.tags}
              onChange={(e) => {
                const updatedTags = e.map((element) => {
                  return {
                    ...element,
                    label: element.label.toUpperCase(),
                    value: element.value.toUpperCase(),
                  };
                });
                setSearchDetails({ ...searchDetails, tags: updatedTags });
              }}
              isMulti
              className="w-[400px]"
              placeholder="Select Tags..."
              options={createObjectArray(tags as string[])}
            />
          </div>
          <Button
            colorScheme="blue"
            className="self-end"
            onClick={() => {
              filterFunc();
              setSearchDetails({ tags: [], title: "" });
            }}
          >
            Search
          </Button>
          <Button
            className="self-end"
            onClick={() => {
              setFilterNotes(notesData as detailsType[]);
              setSearchDetails({ tags: [], title: "" });
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
      <div className="p-2 flex gap-4 flex-wrap justify-center gap-y-4">
        {filterNotes?.length > 0 ? (
          filterNotes.map((element) => {
            return (
              <Link to={/notepage/ + element.id}>
                <Card data={element} />
              </Link>
            );
          })
        ) : (
            <div>
              <img src={noNoteAvailable} className="h-[490px] w-[510px]" />
            </div>
        )}
      </div>
      <Modal title="Edit tags" isOpen={isModalOpen} onClose={closeModal}>
        {tags?.map((element) => {
          return (
            <div className="flex justify-between">
              <span>{element.toUpperCase()}</span>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteTag(element);
                }}
              >
                Delete
              </Button>
            </div>
          );
        })}
      </Modal>
    </div>
  );
};

export default Home;
