export const SearchCaretUpIcon = ({ color, width, height }) => {
  return (
    <>
      <svg
        className="searchCaretUpIcon"
        width={width ?? 24}
        height={height ?? 24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.9485 7.21967C11.2531 6.92678 11.7469 6.92678 12.0515 7.21967L17.7715 12.7197C18.0762 13.0126 18.0762 13.4874 17.7715 13.7803C17.4669 14.0732 16.9731 14.0732 16.6685 13.7803L11.5 8.81066L6.33154 13.7803C6.02693 14.0732 5.53307 14.0732 5.22846 13.7803C4.92385 13.4874 4.92385 13.0126 5.22846 12.7197L10.9485 7.21967Z"
          fill={color}
        />
      </svg>
    </>
  );
};
