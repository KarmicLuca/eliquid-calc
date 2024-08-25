import React from 'react';
import { scaleLinear } from 'd3-scale';
import ReactSVG from 'react-svg';

const ColorBandSvg = ({ svgFile, band1Height, band2Height, band3Height }) => {
  // Create a linear scale to map the heights of the bands to colors
  const colorScale = scaleLinear()
    .domain([0, 100]) // The domain is from 0 to 100%
    .range(['red', 'yellow', 'green']); // Color bands

  return (
    <ReactSVG src={svgFile} onLoad={(e) => {
      // Get the SVG element and its height
      const svg = e.target.querySelector('svg');
      const svgHeight = svg.getBoundingClientRect().height;

      // Set the fill color of each band based on props
      const bands = svg.querySelectorAll('.band-fill');
      bands[0].style.fill = colorScale(band1Height);
      bands[1].style.fill = colorScale(band2Height);
      bands[2].style.fill = colorScale(band3Height);

      // Adjust the height of each band to match the SVG's height
      const bandHeights = [band1Height, band2Height, band3Height];
      for (let i = 0; i < bands.length; i++) {
        bands[i].setAttribute('height', `${svgHeight * bandHeights[i] / 100}px`);
      }
    }} />
  );
};

export default ColorBandSvg;