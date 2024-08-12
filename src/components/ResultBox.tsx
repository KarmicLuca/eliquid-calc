import { FC } from "react"
import { ResultProperty } from "../types";

const ResultBox: FC<ResultProperty> = ({ name, property, ...props }) => {
  let propertyTitle = '';

  switch (name) {
    case 'needVG':
      propertyTitle = 'VG';
      break;
    case 'needPG':
      propertyTitle = 'PG';
      break;
    case 'needNic':
      propertyTitle = 'Nic';
      break;
    case 'needFlavor':
      propertyTitle = 'Flavor';
      break;
    case 'total':
      propertyTitle = 'Total';
  }

  return <>
    <div className="flex flex-col gap-2 w-full lg:w-3/4 pb-4 text-base font-semibold border-2 border-stone-500 rounded-lg">
      <h3 className='p-2 mb-2 text-sm font-semibold bg-stone-700 rounded-t-md'>
        {propertyTitle}
      </h3>
      {property.volume && <p>{property.volume.toFixed(2)} ml</p>}
      <p>{property.grams.toFixed(2)} g</p>
    </div>
  </>
}

export default ResultBox