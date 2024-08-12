import { FC } from "react";
import ResultBox from "./ResultBox";
import { MixResultsProps } from "../types";

const MixResults: FC<MixResultsProps> = ({ result, ...props }) => {

  return (
    <>
      <section id="results" className="mx-4 mb-4 rounded-md">
        <div className="flex flex-col lg:flex-row content-center justify-around gap-4 mx-4">
          {Object.entries(result).map(([key, value]) => (
            <ResultBox key={key} name={key} property={value} />
          ))}
        </div>
      </section>
    </>
  );
}

export default MixResults