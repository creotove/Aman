function Toast({ message, type, onClose }) {
  return (
    <div
      id="toastAnim"
      className={`animate-left-to-right flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 z-50 ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 absolute top-5 right-5`}
      role="alert"
    >
      {type === "success" && (
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-800 rounded-lg dark:bg-green-800 dark:text-green-200">
          {/* <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0Zm5 7.5-6.5 6.5-3.5-3.5L5 9.914l3.5 3.5L15 7.5Z"
            />
          </svg>
          <span class="sr-only">Success icon</span> */}
          <p>&#10003;</p>
        </div>
      )}
      {type === "error" && (
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-500 border border-red-400 rounded-lg dark:bg-red-800 dark:text-red-200">
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
          </svg>
          <span class="sr-only">Error icon</span>
        </div>
      )}
      <div
        className={`ms-3 text-sm ${
          type === "error" ? "text-white" : "text-black"
        } font-semibold`}
      >
        {message}
      </div>
      <button
        type="button"
        // class="ms-auto -mx-1.5 -my-1.5 bg-black text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-700 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        class="ms-auto -mx-1.5 -my-1.5 bg-black text-white p-2 radius"
        data-dismiss-target="#toast-danger"
        aria-label="Close"
        onClick={onClose}
      >
        <span class="sr-only">Close</span>
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
}

export default Toast;
