export const EnvelopeIcon = ({ color, width, height }) => {
  return (
    <>
      <svg
        width={width ?? 26}
        height={height ?? 26}
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.80485 6.71669C5.55118 6.71669 4.53488 7.74494 4.53488 9.01335V16.9867C4.53488 18.2551 5.55118 19.2834 6.80485 19.2834H18.1118C19.3655 19.2834 20.3818 18.2551 20.3818 16.9867V9.01335C20.3818 7.74494 19.3655 6.71669 18.1118 6.71669H6.80485ZM3.25 9.01335C3.25 7.02697 4.84156 5.41669 6.80485 5.41669H18.1118C20.0751 5.41669 21.6667 7.02697 21.6667 9.01335V16.9867C21.6667 18.9731 20.0751 20.5834 18.1118 20.5834H6.80485C4.84156 20.5834 3.25 18.9731 3.25 16.9867V9.01335Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.78135 10.0439C6.97576 9.74363 7.37396 9.65963 7.67078 9.85632L11.8167 12.6037C11.8236 12.6083 11.8305 12.613 11.8373 12.6179C12.0186 12.7485 12.2357 12.8187 12.4583 12.8187C12.6809 12.8187 12.898 12.7485 13.0793 12.6179C13.0861 12.613 13.093 12.6083 13.1 12.6037L17.2459 9.85632C17.5427 9.65963 17.9409 9.74363 18.1353 10.0439C18.3297 10.3442 18.2467 10.7471 17.9498 10.9438L13.8136 13.6848C13.4169 13.9671 12.9436 14.1187 12.4583 14.1187C11.9731 14.1187 11.4998 13.9671 11.1031 13.6848L6.96679 10.9438C6.66998 10.7471 6.58695 10.3442 6.78135 10.0439Z"
          fill={color}
        />
      </svg>
    </>
  );
};