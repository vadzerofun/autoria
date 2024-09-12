export const CaretDownIcon = ({ color, width, height }) => {
  return (
    <>
      <svg
        width={width ?? 16}
        height={height ?? 10}
        viewBox="0 0 16 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 0L8 6L14 0L16 2L8 10L0 2L2 0Z"
          fill={color}
        />
      </svg>
    </>
  );
};
