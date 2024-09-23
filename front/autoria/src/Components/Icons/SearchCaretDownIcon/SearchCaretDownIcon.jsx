export const SearchCaretDownIcon = ({ color, width, height }) => {
  return (
    <>
      <svg
      className="searchCaretDownIcon"
        width={width ?? 24}
        height={height ?? 24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.24603 8.25105C5.57407 7.91632 6.10593 7.91632 6.43397 8.25105L12 13.9307L17.566 8.25105C17.8941 7.91632 18.4259 7.91632 18.754 8.25105C19.082 8.58579 19.082 9.1285 18.754 9.46323L12.594 15.7489C12.2659 16.0837 11.7341 16.0837 11.406 15.7489L5.24603 9.46323C4.91799 9.1285 4.91799 8.58579 5.24603 8.25105Z"
          fill={color}
        />
      </svg>
    </>
  );
};
