export function timeAgo(date1, date2) {
    if(
      !date1 || !date2){
        return "NO RECORDED DATE"
      }
    // Convert date strings to Date objects
    const date1p = new Date(date1.replace(/-/g, "/"));
    const date2p = new Date(date2.replace(/-/g, "/"));
    // Check if the Date objects are valid

    // Both Date objects are valid, proceed to find the maximum date
    const maxDateTimestamp = Math.max(date1p.getTime(), date2p.getTime());
    const date = new Date(maxDateTimestamp);

    const currentDate = new Date();
    const timestamp = date instanceof Date ? date : new Date(date);
    const timeDifference = currentDate - timestamp;
    const seconds = Math.floor(timeDifference / 1000);
    if(seconds <0){
      return "Future Date"
    }
    if (seconds < 60) {
      return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
      return `${minutes} min ${seconds - minutes * 60} s ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours} hr${hours === 1 ? "" : "s"}${minutes - hours * 60} min ago`;
    }

    const days = Math.floor(hours / 24);

    if (days < 7) {
      return `${days} d ${hours - days * 24} hr${hours === 1 ? "" : "s"} ago`;
    }

    const weeks = Math.floor(days / 7);

    if (weeks < 4) {
      return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
    }
    const months = Math.floor(weeks / 4);
    // You can add more granularity as needed, e.g., months, years
    if (months < 12) {
      return `${months} month${months === 1 ? "" : "s"} ago`;
    }
    return "A long time ago";
  }