export default function MixResults({ result, ...props }) {
  const needVG = result.needVG;
  const needPG = result.needPG;
  const needNic = result.needNic;
  const needFlavor = result.needFlavor;
  const totals = result.total;

  return (
    <>
      <section id="results" className="mx-4 mb-4 rounded-md">
        <div className="flex flex-col lg:flex-row content-center justify-around gap-4 mx-4">
          <div className="flex flex-col gap-2 w-full lg:w-3/4 pb-4 text-base font-semibold border-2 border-stone-500 rounded-lg">
            <h3 className='p-2 mb-2 text-sm font-semibold bg-stone-700 rounded-t-md'>VG</h3>
            <p>{needVG.volume.toFixed(2)} ml</p>
            <p>{needVG.grams.toFixed(2)} g</p>
          </div>

          <div className="flex flex-col gap-2 w-full lg:w-3/4 pb-4 text-base font-semibold border-2 border-stone-500 rounded-lg">
            <h3 className='p-2 mb-2 text-sm font-semibold bg-stone-700 rounded-t-md'>PG</h3>
            <p>{needPG.volume.toFixed(2)} ml</p>
            <p>{needPG.grams.toFixed(2)} g</p>
          </div>

          <div className="flex flex-col gap-2 w-full lg:w-3/4 pb-4 text-base font-semibold border-2 border-stone-500 rounded-lg">
            <h3 className='p-2 mb-2 text-sm font-semibold bg-stone-700 rounded-t-md'>Nic Base</h3>
            <p>{needNic.volume.toFixed(2)} ml</p>
            <p>{needNic.grams.toFixed(2)} g</p>
          </div>

          <div className="flex flex-col gap-2 w-full lg:w-3/4 pb-4 text-base font-semibold border-2 border-stone-500 rounded-lg">
            <h3 className='p-2 mb-2 text-sm font-semibold bg-stone-700 rounded-t-md'>Flavor</h3>
            <p>{needFlavor.volume.toFixed(2)} ml</p>
            <p>{needFlavor.grams.toFixed(2)} g</p>
          </div>

          <div className="flex flex-col gap-2 w-full lg:w-3/4 pb-4 text-base font-semibold border-2 border-stone-500 rounded-lg">
            <p className='p-2 mb-2 text-sm font-semibold bg-stone-700 rounded-t-md'>Base</p>
            <p>{totals.baseGrams.toFixed(2)} g</p>
          </div>
        </div>
      </section>
    </>
  );
}
