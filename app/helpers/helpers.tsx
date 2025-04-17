// thousand seperator
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// truncate string
export const truncateString = (inputString, maxLength = 15) => {
  if (inputString.length <= maxLength) {
    return inputString;
  } else {
    return inputString.substring(0, maxLength - 6) + "..";
  }
};

export const getTableData = (data, tdStyle, index) => {
  const tdElements = [];

  for (const key in data) {
    if (index <= 8) {
      tdElements.push(
        <td className={`${tdStyle}`} key={key}>
          {`0${data[key]}`}
        </td>
      );
    } else {
      tdElements.push(
        <td className={`${tdStyle}`} key={key}>
          {data[key]}
        </td>
      );
    }
  }

  return tdElements;
};

export const getSvg = () => {
  return {
    auctions: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#6B788E"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1636_689)">
          <path d="M14.7657 22.5896H13.9914C13.6647 20.9869 12.2445 19.7771 10.5469 19.7771H4.92193C3.2243 19.7771 1.80414 20.9869 1.47746 22.5896H0.703185C0.314545 22.5896 6.10352e-05 22.9041 6.10352e-05 23.2927C6.10352e-05 23.6814 0.314545 23.9958 0.703185 23.9958C5.39982 23.9958 10.0735 23.9958 14.7657 23.9958C15.1543 23.9958 15.4688 23.6814 15.4688 23.2927C15.4688 22.9041 15.1543 22.5896 14.7657 22.5896Z" />
          <path d="M18.3105 6.38222L12.3443 0.416075C11.7951 -0.133158 10.9047 -0.133158 10.3556 0.416075C9.80644 0.965215 9.80644 1.8556 10.3556 2.40479L16.3218 8.37098C16.871 8.92012 17.7613 8.92012 18.3105 8.37098C18.8597 7.82175 18.8597 6.93145 18.3105 6.38222Z" />
          <path d="M8.36688 16.3261L2.40064 10.3599C1.8515 9.81071 0.961111 9.81071 0.411925 10.3599C-0.137308 10.909 -0.137308 11.7994 0.411925 12.3486L6.37812 18.3148C6.92735 18.8639 7.81765 18.8639 8.36688 18.3148C8.91602 17.7657 8.91602 16.8753 8.36688 16.3261Z" />
          <path d="M9.36079 3.3994L3.39471 9.36548L9.36079 15.3316L15.3269 9.36548L9.36079 3.3994Z" />
          <path d="M23.3823 20.3948L22.3818 19.3091L19.3987 22.2922L20.3991 23.378C21.2229 24.2017 22.5585 24.2017 23.3823 23.378C24.206 22.5542 24.206 21.2186 23.3823 20.3948Z" />
          <path d="M16.6666 13.6876C16.7851 13.2225 16.6859 12.7125 16.3218 12.3484C15.7726 11.7992 14.8822 11.7992 14.3331 12.3484L12.3444 14.3372C11.7951 14.8863 11.7951 15.7767 12.3444 16.3259C12.7084 16.69 13.2184 16.7892 13.6835 16.6707L18.4043 21.2977L21.3874 18.3146L16.6666 13.6876Z" />
        </g>
        <defs>
          <clipPath id="clip0_1636_689">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    dashboard: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#6B788E"
      >
        <path d="M22.0604 0H14.9509C13.8797 0 13.0112 0.868428 13.0112 1.93969V9.04922C13.0112 10.1205 13.8797 10.9889 14.9509 10.9889H22.0604C23.1317 10.9889 24.0001 10.1205 24.0001 9.04922V1.93969C24.0001 0.868428 23.1317 0 22.0604 0Z" />
        <path d="M9.04922 0H1.93969C0.868428 0 0 0.868428 0 1.93969V9.04922C0 10.1205 0.868428 10.9889 1.93969 10.9889H9.04922C10.1205 10.9889 10.9889 10.1205 10.9889 9.04922V1.93969C10.9889 0.868428 10.1205 0 9.04922 0Z" />
        <path d="M22.0604 13.011H14.9509C13.8797 13.011 13.0112 13.8794 13.0112 14.9507V22.0602C13.0112 23.1315 13.8797 23.9999 14.9509 23.9999H22.0604C23.1317 23.9999 24.0001 23.1315 24.0001 22.0602V14.9507C24.0001 13.8794 23.1317 13.011 22.0604 13.011Z" />
        <path d="M9.04922 13.011H1.93969C0.868428 13.011 0 13.8794 0 14.9507V22.0602C0 23.1315 0.868428 23.9999 1.93969 23.9999H9.04922C10.1205 23.9999 10.9889 23.1315 10.9889 22.0602V14.9507C10.9889 13.8794 10.1205 13.011 9.04922 13.011Z" />
      </svg>
    ),
  };
};

// get video id for youtube
export function extractVideoIdFromUrl(videoUrl) {
  // Extract the video ID using a regular expression
  const match = videoUrl.match(
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );

  // If there is a match, return the video ID, otherwise return null
  return match ? match[1] : null;
}

// get image path for dynamic value
export function extractBaseUrlUntilImages(url) {
  // Create a URL object using the provided URL
  const urlObject = new URL(url);

  // Extract the pathname
  const pathSegments = urlObject.pathname.split("/");

  // Find the index of "images/" in the path segments
  const imagesIndex = pathSegments.indexOf("images");

  // If "images/" is found, construct the base URL up to that point
  if (imagesIndex !== -1) {
    const baseUrlSegments = pathSegments.slice(0, imagesIndex + 1);
    return `${urlObject.origin}${baseUrlSegments.join("/")}`;
  }

  // If "images/" is not found, return the original URL
  return url;
}

// get extractyoutube video
export function extractYouTubeId(url) {
  // Regular expression to match YouTube video ID
  var regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
  var match = url?.match(regExp);
  if (match && match[1].length === 11) {
    return match[1]; // Return the YouTube video ID
  } else {
    return null; // Return null if no match is found
  }
}

// check menu route
export const checkMenuRoute = (route) => {
  const static_page = [, "/", "/blogs", "/contact", "/about", "/product"];
  if (static_page.includes(route)) {
    return `${route}`;
  } else {
    return `pg/${route}`;
  }
};

// show  image
export const showFeatureImg = (imgUrl) => {
  const isFeatureImgFile = imgUrl instanceof File;
  if (isFeatureImgFile) {
    return URL.createObjectURL(imgUrl);
  } else {
    return imgUrl;
  }
};
