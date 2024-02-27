const FormatNumber = (number) => {
    if (number >= 1000) {
        return (number / 1000).toFixed(2) + "k";
      } else {
        return number.toString();
      }
}

export default FormatNumber