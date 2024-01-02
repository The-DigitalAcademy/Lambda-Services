/**
 * Generates the current date and time.
 *
 * @param {boolean} withTime - A flag indicating whether to include the time.
 * @returns {string} The current date and time in the specified format.
 */
const currentDate = (withTime) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const time = withTime
      ? `${String(currentDate.getHours()).padStart(2, "0")}:${String(currentDate.getMinutes()).padStart(2, "0")}`
      : "";
  
    return `${year}-${month}-${day} ${time}`;
};

module.exports = currentDate