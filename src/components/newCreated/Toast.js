function Toast({ message, type, onClose }) {
  return (
    <div
      id="toastAnim"
      className={`animate-left-to-right flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 z-50 ${type === "success" ? "bg-green-500" : "bg-red-500"
        } rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 absolute top-5 right-5`}
      role="alert"
    >
      {type === "success" && (
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-800 rounded-lg dark:bg-green-800 dark:text-green-200">
        </div>

      )}
      {type === "error" && (
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-500 border border-red-400 rounded-lg dark:bg-red-800 dark:text-red-200">
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
          </svg>
          <span className="sr-only">Error icon</span>
        </div>

      )}
      <div
        className={`ms-3 text-sm ${type === "error" ? "text-white" : "text-black"
          } font-semibold`}
      >
        {message}
      </div>
    </div>
  );
}

export default Toast;
