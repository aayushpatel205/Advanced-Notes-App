import { detailsType } from "../../types";

interface Props {
  data: detailsType;
}
const Card: React.FC<Props> = ({ data }) => {
  return (
    <div className="h-[150px] w-[360px] border-gray-300 border rounded-lg hover:shadow-lg p-2 flex flex-col items-center justify-center gap-2 cursor-pointer">
      <span className="text-lg font-semibold w-full text-center">
        {data.title}
      </span>
      <div className="w-[300px] flex flex-wrap gap-2 justify-center">
        {
          /* <div className="h-5 w-auto flex items-center p-2 text-white text-sm bg-blue-500 rounded-lg">
          This
        </div> */
          data.tags?.map((tag) => {
            return (
              <div className="h-5 w-auto flex items-center p-2 text-white text-sm bg-blue-500 rounded-lg">
                {tag.label}
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default Card;
